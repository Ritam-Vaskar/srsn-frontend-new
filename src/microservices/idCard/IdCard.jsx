import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, FileSpreadsheet, LayoutTemplate, LogOut, Palette, Plus, Save, ShieldAlert, Upload, Users } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import logo from './logo.png';
import schoolBackground from './school-bg.png';
import signature from './signature.png';
import { hasUserAccessToken } from '../../helper/tokenManager';
import './IdCard.css';

const SAMPLE_STUDENTS = [{ name: 'Aarav Sen', className: 'V', penNo: 'SRSN-24001', rollNo: '01', fatherName: 'Anirban Sen', motherName: 'Moumita Sen', dob: '12 / 08 / 2014', contact: '+91 98765 43210', address: 'Ramakrishna Pally, Bankura', photo: '' }];
const DEFAULT_TEMPLATE = { session: '2027', schoolName: 'Sri Ramakrishna Siksha Niketan', section: 'Primary School', classPrefix: 'CLASS -', footerLabel: 'INSTRUCTIONS', footerText: 'Please carry this card whenever you visit the School.', headLabel: 'Head Master', primaryColor: '#0a5c4b', secondaryColor: '#47a183', footerColor: '#0a5c4b', accentColor: '#f26b21' };
const FIELD_ALIASES = { 'student name': 'name', student: 'name', class: 'className', 'class name': 'className', pen: 'penNo', 'pen no': 'penNo', roll: 'rollNo', 'roll no': 'rollNo', father: 'fatherName', 'father name': 'fatherName', mother: 'motherName', 'mother name': 'motherName', dob: 'dob', 'date of birth': 'dob', contact: 'contact', phone: 'contact', address: 'address', photo: 'photo', 'photo url': 'photo', image: 'photo', 'image url': 'photo', 'id card image': 'photo' };

const C128 = '11011001100,11001101100,11001100110,10010011000,10010001100,10001001100,10011001000,10011000100,10001100100,11001001000,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011000,11011000110,11000110110,10100011000,10001011000,10001000110,10110001000,10001101000,10001100010,11010001000,11000101000,11000100010,10110111000,10110001110,10001101110,10111011000,10111000110,10001110110,11101110110,11010001110,11000101110,11011101000,11011100010,11011101110,11101011000,11101000110,11100010110,11101101000,11101100010,11100011010,11101111010,11001000010,11110001010,10100110000,10100001100,10010110000,10010000110,10000101100,10000100110,10110010000,10110000100,10011010000,10011000010,10000110100,10000110010,11000010010,11001010000,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111000,10100011110,10001011110,10111101000,10111100010,11110101000,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,11010010000,11010011100'.split(',');

function normaliseImageUrl(value) {
  const url = String(value || '').trim();
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i) || url.match(/[?&]id=([^&]+)/i);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}

function code128Bits(text) {
  const chars = [...String(text || '')].filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126);
  if (!chars.length) return '';
  const values = [104];
  let sum = 104;
  chars.forEach((char, index) => { const value = char.charCodeAt(0) - 32; values.push(value); sum += value * (index + 1); });
  values.push(sum % 103);
  return values.map(value => C128[value]).join('') + '1100011101011';
}

function Barcode({ value }) {
  const bits = code128Bits(value);
  if (!bits) return null;
  const bars = [];
  for (let index = 0; index < bits.length;) {
    let end = index;
    while (end < bits.length && bits[end] === bits[index]) end += 1;
    if (bits[index] === '1') bars.push(<rect key={index} x={index} width={end - index} height="1" fill="#111" />);
    index = end;
  }
  return <svg viewBox={`-8 0 ${bits.length + 16} 1`} preserveAspectRatio="none" shapeRendering="crispEdges">{bars}</svg>;
}

function normaliseStudents(rows) {
  return rows.map(row => Object.entries(row).reduce((student, [key, value]) => {
    const normalKey = String(key).trim().toLowerCase().replace(/[_-]+/g, ' ');
    const field = FIELD_ALIASES[normalKey] || key;
    student[field] = field === 'photo' ? normaliseImageUrl(value) : value == null ? '' : String(value);
    return student;
  }, {})).filter(student => Object.values(student).some(Boolean));
}

function IdCardPreview({ student, template, cardRef }) {
  useEffect(() => {
    const fitAll = () => cardRef.current?.querySelectorAll('.fit').forEach(element => {
      element.style.removeProperty('--fit');
      if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth) element.style.setProperty('--fit', Math.max(0.5, element.clientWidth / element.scrollWidth - 0.01));
    });
    fitAll();
    if (document.fonts?.ready) document.fonts.ready.then(fitAll);
  }, [cardRef, student, template]);
  const rows = [['PEN No', student.penNo], ['ROLL No', student.rollNo], ["FATHER'S NAME", student.fatherName], ["MOTHER'S NAME", student.motherName], ['DATE OF BIRTH', student.dob], ['CONTACT No', student.contact], ['ADDRESS', student.address]];
  return <div className="idcard-preview-shell"><div ref={cardRef} className="id-card-wrap"><div className="id-card" style={{ '--green-dark': template.primaryColor, '--green-mid': template.secondaryColor, '--green-light': template.secondaryColor, '--accent': template.accentColor, '--school-bg': `url(${schoolBackground})` }}>
    <div className="ic-bg-photo" /><svg className="ic-chevrons" viewBox="0 0 840 1200" preserveAspectRatio="none" aria-hidden="true"><g><polygon points="0,395 439,206 439,281 0,470" fill="var(--green-dark)" /><polygon points="0,470 439,281 439,401 0,590" fill="var(--green-light)" /></g><g transform="translate(878 0) scale(-1 1)"><polygon points="0,395 439,206 439,281 0,470" fill="var(--green-dark)" /><polygon points="0,470 439,281 439,401 0,590" fill="var(--green-light)" /></g></svg>
    <img className="ic-logo" src={logo} alt="School logo" /><div className="ic-school">{template.schoolName.replace(' Siksha ', '\nSiksha ')}</div><div className="ic-session">SESSION<br /><span>{template.session}</span></div><div className="ic-section">{template.section}</div>
    <div className="ic-photo">{student.photo ? <img src={student.photo} alt="Student" /> : null}</div><div className="ic-center ic-name"><span className="fit">{student.name || 'Student name'}</span></div><div className="ic-center ic-title">IDENTITY CARD</div><div className="ic-center ic-class-row"><div className="ic-class"><span className="fit">{template.classPrefix} {student.className || 'V'}</span></div></div>
    <div className="ic-details">{rows.map(([label, value]) => <div className={`ic-row${label === 'ADDRESS' ? ' address' : ''}`} key={label}><span className="label">{label}</span><span className="colon">:</span><span className={label === 'ADDRESS' ? 'value' : 'value fit'}>{value || ''}</span></div>)}</div>
    <div className="ic-barcode"><Barcode value={student.penNo} /></div><img className="ic-sign" src={signature} alt="Head Master signature" /><div className="ic-foot-band" /><div className="ic-instructions">{template.footerLabel}</div><div className="ic-head">{template.headLabel}</div><div className="ic-note">{template.footerText}</div>
  </div></div></div>;
}

export default function IdCard() {
  const user = useSelector(state => state?.user?.user);
  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const fileRef = useRef(null);
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [template, setTemplate] = useState(() => JSON.parse(localStorage.getItem('srsn-idcard-template') || 'null') || DEFAULT_TEMPLATE);
  const [savedTemplates, setSavedTemplates] = useState(() => JSON.parse(localStorage.getItem('srsn-idcard-saved') || '[]'));
  const [activeTab, setActiveTab] = useState('design');
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [fileName, setFileName] = useState('No spreadsheet selected');
  const [notice, setNotice] = useState('');

  const hasToken = hasUserAccessToken();
  const canGenerate = /admin/i.test(user?.role || '') || user?.idCardAccess === true;
  const currentStudent = students[selectedStudent] || SAMPLE_STUDENTS[0];
  const savedCount = useMemo(() => savedTemplates.length, [savedTemplates]);

  useEffect(() => { if (!user && !hasToken) navigate(`/school/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true }); }, [user, hasToken, navigate, location.pathname]);
  if (!user && hasToken) return <div className="idcard-loading">Checking your ID card access...</div>;
  if (!user) return null;
  if (!canGenerate) return <div className="idcard-denied"><ShieldAlert size={40} /><h1>Access not enabled</h1><p>Your account is signed in, but ID card generation has not been enabled by an administrator.</p><button onClick={() => navigate('/school/profile')}>Back to profile</button></div>;

  const updateTemplate = (key, value) => setTemplate(current => ({ ...current, [key]: value }));
  const saveTemplate = () => { localStorage.setItem('srsn-idcard-template', JSON.stringify(template)); const next = [{ ...template, id: Date.now(), name: `${template.section} · ${template.session}` }, ...savedTemplates.filter(item => item.name !== `${template.section} · ${template.session}`)].slice(0, 8); setSavedTemplates(next); localStorage.setItem('srsn-idcard-saved', JSON.stringify(next)); setNotice('Template saved locally.'); };
  const handleUpload = event => { const file = event.target.files?.[0]; if (!file) return; setFileName(file.name); const reader = new FileReader(); reader.onload = ({ target }) => { const workbook = XLSX.read(target.result, { type: 'array' }); const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: '' }); const parsed = normaliseStudents(rows); if (parsed.length) { setStudents(parsed); setSelectedStudent(0); setNotice(`${parsed.length} student records ready for preview.`); } else setNotice('No student rows found. Check the spreadsheet headers.'); }; reader.readAsArrayBuffer(file); };
  const downloadPdf = async () => { if (!cardRef.current) return; const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#fff' }); const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] }); pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height); pdf.save(`${currentStudent.name || 'id-card'}.pdf`); };

  return <div className="idcard-app"><header className="idcard-topbar"><div className="idcard-brand"><div className="brand-mark">ID</div><div><strong>Card Studio</strong><span>Sri Ramakrishna Siksha Niketan</span></div></div><div className="idcard-user"><span>{user.name || user.email || 'Admin'}</span><button title="Back to profile" onClick={() => navigate('/school/profile')}><LogOut size={16} /></button></div></header>
    <main className="idcard-layout"><aside className="idcard-sidebar"><div className="sidebar-heading"><div><span className="eyebrow">MICROSERVICE</span><h1>ID card generator</h1></div><span className="access-pill">ADMIN</span></div><p className="sidebar-intro">Prepare a reusable card format, load student records, then export a print-ready card.</p><div className="workflow"><div className="workflow-step active"><span>01</span><div><b>Design template</b><small>School-wide card fields</small></div></div><div className="workflow-step"><span>02</span><div><b>Load student data</b><small>Excel or CSV workbook</small></div></div><div className="workflow-step"><span>03</span><div><b>Review & export</b><small>Preview every record</small></div></div></div><div className="saved-summary"><div><LayoutTemplate size={18} /><span>Saved templates</span></div><b>{savedCount}</b></div></aside>
      <section className="idcard-workspace"><div className="workspace-head"><div><span className="eyebrow">WORKSPACE / TEMPLATE</span><h2>Build your next batch</h2></div><div className="workspace-actions"><button className="button secondary" onClick={() => setActiveTab('saved')}><LayoutTemplate size={16} /> Saved cards</button><button className="button primary" onClick={saveTemplate}><Save size={16} /> Save format</button></div></div><div className="workspace-tabs"><button className={activeTab === 'design' ? 'active' : ''} onClick={() => setActiveTab('design')}><Palette size={16} /> Design</button><button className={activeTab === 'data' ? 'active' : ''} onClick={() => setActiveTab('data')}><FileSpreadsheet size={16} /> Student data</button><button className={activeTab === 'saved' ? 'active' : ''} onClick={() => setActiveTab('saved')}><LayoutTemplate size={16} /> Saved formats</button></div>
        {activeTab === 'design' && <div className="design-panel"><div className="form-section"><div className="section-title"><span>01</span><div><h3>Identity & hierarchy</h3><p>These values apply to every card in this batch.</p></div></div><div className="form-grid">{[['schoolName','School name'],['session','Session'],['section','School section'],['classPrefix','Class label'],['footerLabel','Footer label'],['headLabel','Signature role'],['footerText','Footer instruction'],['signatureText','Signature text']].map(([key, label]) => <label className={key === 'footerText' ? 'wide-field' : ''} key={key}>{label}<input value={template[key]} onChange={event => updateTemplate(key, event.target.value)} /></label>)}</div></div><div className="form-section"><div className="section-title"><span>02</span><div><h3>Color system</h3><p>Match the school’s identity without changing student fields.</p></div></div><div className="color-grid">{[['primaryColor','Primary band'],['secondaryColor','Ribbon'],['footerColor','Footer'],['accentColor','Title accent']].map(([key, label]) => <label key={key}><span className="color-swatch" style={{ background: template[key] }} /><span>{label}</span><input type="color" value={template[key]} onChange={event => updateTemplate(key, event.target.value)} /></label>)}</div></div></div>}
        {activeTab === 'data' && <div className="data-panel"><div className="upload-zone" onClick={() => fileRef.current?.click()}><Upload size={26} /><h3>Upload student workbook</h3><p>Drop an `.xlsx`, `.xls`, or `.csv` file here, or browse your device.</p><span className="file-name">{fileName}</span><input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} /></div><div className="data-guidance"><Users size={18} /><div><b>{students.length} student records in preview</b><p>Expected columns include name, class, PEN No, roll no, father name, mother name, DOB, contact, address and photo.</p></div></div></div>}
        {activeTab === 'saved' && <div className="saved-panel">{savedTemplates.length ? savedTemplates.map(item => <button className="saved-template" key={item.id} onClick={() => { setTemplate(item); setActiveTab('design'); }}><LayoutTemplate size={20} /><span><b>{item.name}</b><small>Saved format</small></span><Plus size={16} /></button>) : <div className="empty-state"><LayoutTemplate size={30} /><h3>No saved formats yet</h3><p>Save your first card format from the design tab.</p></div>}</div>}
        <div className="preview-heading"><div><span className="eyebrow">LIVE PREVIEW</span><h3>{currentStudent.name || 'Student record'}</h3></div><div className="preview-tools"><select value={selectedStudent} onChange={event => setSelectedStudent(Number(event.target.value))}>{students.map((student, index) => <option key={`${student.name}-${index}`} value={index}>{student.name || `Student ${index + 1}`}</option>)}</select><button className="button export" onClick={downloadPdf}><Download size={16} /> Download PDF</button></div></div><IdCardPreview student={currentStudent} template={template} cardRef={cardRef} />{notice && <p className="idcard-notice">{notice}</p>}</section></main></div>;
}
