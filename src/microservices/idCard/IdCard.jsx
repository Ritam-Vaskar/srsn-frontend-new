import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock3, Download, FileSpreadsheet, History,
  LayoutTemplate, LogOut, Palette, Save, ShieldAlert, Trash2,
  Upload, Users, Zap,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import QRCode from 'qrcode';
import logo from './logo.png';
import schoolBackground from './school-bg.png';
import signature from './signature.png';
import { hasUserAccessToken, makeUserAuthenticatedRequest } from '../../helper/tokenManager';
import SummaryApi from '../../common';
import { toast } from '../../components/Core/Toast.jsx';
import './IdCard.css';

/* ─── Constants ──────────────────────────────────────────────── */
const SAMPLE_STUDENTS = [{ name: 'Aarav Sen', className: '', penNo: 'SRSN-24001', rollNo: '01', fatherName: 'Anirban Sen', motherName: 'Moumita Sen', dob: '12 / 08 / 2014', contact: '+91 98765 43210', address: 'Ramakrishna Pally, Bankura', photo: '' }];
const DEFAULT_TEMPLATE = { session: '2027', schoolName: 'Sri Ramakrishna Siksha Niketan', section: 'Primary School', templateClassName: '', classPrefix: 'CLASS -', footerLabel: 'INSTRUCTIONS', footerText: 'Please carry this card whenever you visit the School.', headLabel: 'Head Master', primaryColor: '#0a5c4b', secondaryColor: '#47a183', footerColor: '#0a5c4b', accentColor: '#f26b21' };
const FIELD_ALIASES = { 'student name': 'name', student: 'name', class: 'className', 'class name': 'className', pen: 'penNo', 'pen no': 'penNo', roll: 'rollNo', 'roll no': 'rollNo', father: 'fatherName', 'father name': 'fatherName', mother: 'motherName', 'mother name': 'motherName', dob: 'dob', 'date of birth': 'dob', contact: 'contact', phone: 'contact', address: 'address', photo: 'photo', 'photo url': 'photo', image: 'photo', 'image url': 'photo', 'id card image': 'photo' };

/* ─── Barcode (Code 128) ─────────────────────────────────────── */
const C128 = '11011001100,11001101100,11001100110,10010011000,10010001100,10001001100,10011001000,10011000100,10001100100,11001001000,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011000,11011000110,11000110110,10100011000,10001011000,10001000110,10110001000,10001101000,10001100010,11010001000,11000101000,11000100010,10110111000,10110001110,10001101110,10111011000,10111000110,10001110110,11101110110,11010001110,11000101110,11011101000,11011100010,11011101110,11101011000,11101000110,11100010110,11101101000,11101100010,11100011010,11101111010,11001000010,11110001010,10100110000,10100001100,10010110000,10010000110,10000101100,10000100110,10110010000,10110000100,10011010000,10011000010,10000110100,10000110010,11000010010,11001010000,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111000,10100011110,10001011110,10111101000,10111100010,11110101000,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,11010010000,11010011100'.split(',');

function normaliseImageUrl(value) {
  const url = String(value || '').trim();
  if (!url || url.includes('/api/idcard/image-proxy?url=')) return url;
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i) || url.match(/[?&]id=([^&]+)/i) || url.match(/drive\.usercontent\.google\.com\/download\?id=([^&]+)/i);
  const directUrl = match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
  return match ? `${SummaryApi.IdcardUpload.url.replace('/api/idcard/upload', '/api/idcard/image-proxy')}?url=${encodeURIComponent(directUrl)}` : directUrl;
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

function QrCode({ value, size = 88 }) {
  const [dataUrl, setDataUrl] = useState('');
  useEffect(() => {
    let active = true;
    QRCode.toDataURL(value, { width: size * 2, margin: 1, color: { dark: '#16252a', light: '#ffffff' } })
      .then(url => { if (active) setDataUrl(url); })
      .catch(() => setDataUrl(''));
    return () => { active = false; };
  }, [value, size]);
  return dataUrl ? <img src={dataUrl} alt="Scan to verify" style={{ width: '100%', height: '100%', display: 'block' }} /> : null;
}

function normaliseStudents(rows) {
  return rows.map(row => Object.entries(row).reduce((student, [key, value]) => {
    const normalKey = String(key).trim().toLowerCase().replace(/[_-]+/g, ' ');
    const field = FIELD_ALIASES[normalKey] || key;
    student[field] = field === 'photo' ? normaliseImageUrl(value) : value == null ? '' : String(value);
    return student;
  }, {})).filter(student => Object.values(student).some(Boolean));
}

/* ─── ID Card Preview ────────────────────────────────────────── */
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
    <img className="ic-bg-photo" src={schoolBackground} crossOrigin="anonymous" alt="" /><svg className="ic-chevrons" viewBox="0 0 840 1200" preserveAspectRatio="none" aria-hidden="true"><g><polygon points="0,395 439,206 439,281 0,470" fill="var(--green-dark)" /><polygon points="0,470 439,281 439,401 0,590" fill="var(--green-light)" /></g><g transform="translate(878 0) scale(-1 1)"><polygon points="0,395 439,206 439,281 0,470" fill="var(--green-dark)" /><polygon points="0,470 439,281 439,401 0,590" fill="var(--green-light)" /></g></svg>
    <img className="ic-logo" src={logo} alt="School logo" /><div className="ic-school">{template.schoolName.replace(' Siksha ', '\nSiksha ')}</div><div className="ic-session">SESSION<br /><span>{template.session}</span></div><div className="ic-section">{template.section}</div>
    <div className="ic-photo">{student.photo ? <img src={student.photo} crossOrigin="anonymous" alt="Student" /> : null}</div><div className="ic-center ic-name"><span className="fit">{student.name || 'Student name'}</span></div><div className="ic-center ic-title">IDENTITY CARD</div><div className="ic-center ic-class-row"><div className="ic-class"><span className="fit">{template.classPrefix} {student.className || ''}</span></div></div>
    <div className="ic-details">{rows.map(([label, value]) => <div className={`ic-row${label === 'ADDRESS' ? ' address' : ''}`} key={label}><span className="label">{label}</span><span className="colon">:</span><span className={label === 'ADDRESS' ? 'value' : 'value fit'}>{value || ''}</span></div>)}</div>
    <div className="ic-code-block" title="Scan to verify this student record">
      <div className="ic-qr-slot"><QrCode value={`${window.location.origin}/verify-id/${student._id || student.id || student.penNo || 'preview'}`} /></div>
    </div><img className="ic-sign" src={signature} alt="Head Master signature" /><div className="ic-foot-band" /><div className="ic-instructions">{template.footerLabel}</div><div className="ic-head">{template.headLabel}</div><div className="ic-note">{template.footerText}</div>
  </div></div></div>;
}

/* ─── Batch Progress Card ────────────────────────────────────── */
function BatchProgressCard({ batch }) {
  if (!batch) return null;
  const total = batch.total || 1;
  const generated = batch.generated || 0;
  const pct = Math.min(100, Math.round((generated / total) * 100));
  const isCompleted = batch.status === 'completed';
  const isFailed = batch.status === 'failed';
  const isActive = batch.status === 'queued' || batch.status === 'processing';

  return (
    <div className={`batch-progress-card ${batch.status}`}>
      <div className="bpc-header">
        <div className="bpc-icon-wrap">
          {isCompleted ? <CheckCircle2 size={20} /> : isFailed ? <ShieldAlert size={20} /> : <Zap size={20} className={isActive ? 'bpc-pulse' : ''} />}
        </div>
        <div className="bpc-info">
          <span className="bpc-label">
            {isCompleted ? 'Generation complete' : isFailed ? 'Generation failed' : batch.status === 'queued' ? 'Queued — waiting for worker…' : 'Generating ID cards…'}
          </span>
          <span className="bpc-count">{generated} of {total} cards ready</span>
        </div>
        <span className="bpc-pct">{pct}%</span>
      </div>
      <div className="bpc-track">
        <div
          className={`bpc-fill ${isCompleted ? 'bpc-fill-done' : isFailed ? 'bpc-fill-fail' : 'bpc-fill-active'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {isCompleted && batch.pdfPath && (
        <div className="bpc-actions">
          <span className="bpc-ready-msg"><CheckCircle2 size={13} /> PDF ready · opening batch details…</span>
        </div>
      )}
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */
/** Returns true if a batch is considered "stuck" — queued/processing
 *  with no progress for more than 8 minutes (worker likely crashed). */
function isBatchStuck(item) {
  if (!['queued', 'processing'].includes(item.status)) return false;
  const age = Date.now() - new Date(item.updatedAt || item.createdAt || 0).getTime();
  return age > 8 * 60 * 1000;
}

/* ─── Main Component ─────────────────────────────────────────── */
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
  const [serverTemplates, setServerTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [batch, setBatch] = useState(null);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [detailBatch, setDetailBatch] = useState(null);
  const [detailStudents, setDetailStudents] = useState([]);
  const [detailIndex, setDetailIndex] = useState(0);
  const [detailLoading, setDetailLoading] = useState(false);
  const [forceRegenerating, setForceRegenerating] = useState(null);
  // track if we've already auto-redirected for the current batch
  const autoRedirectedRef = useRef(false);


  const hasToken = hasUserAccessToken();
  const canGenerate = /admin/i.test(user?.role || '') || user?.idCardAccess === true;
  const currentStudent = students[selectedStudent] || SAMPLE_STUDENTS[0];
  const detailStudent = detailStudents[detailIndex] || SAMPLE_STUDENTS[0];
  const previewStudent = activeTab === 'batch-detail' ? detailStudent : currentStudent;
  const previewTemplate = activeTab === 'batch-detail' && detailBatch?.template ? detailBatch.template : template;
  const visibleTemplates = serverTemplates.length ? serverTemplates : savedTemplates;
  const savedCount = useMemo(() => visibleTemplates.length, [visibleTemplates]);

  /* ── Auth guard ─────────────────────────────────────────────── */
  useEffect(() => {
    if (!user && !hasToken) navigate(`/school/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
  }, [user, hasToken, navigate, location.pathname]);

  /* ── Load server templates ──────────────────────────────────── */
  useEffect(() => {
    if (!user || !canGenerate) return undefined;
    makeUserAuthenticatedRequest(SummaryApi.IdcardTemplates.url, { method: 'GET' })
      .then(r => r.json())
      .then(result => {
        if (result.success) {
          setServerTemplates(result.templates);
          setSavedTemplates(result.templates);
          const first = result.templates[0];
          setSelectedTemplateId(first?._id || '');
          if (first) setTemplate(cur => ({ ...cur, ...first }));
        }
      })
      .catch(() => toast.warning('Unable to load saved server templates.'));
    return undefined;
  }, [user, canGenerate]);

  /* ── Load generation history ────────────────────────────────── */
  const loadGenerationHistory = () =>
    makeUserAuthenticatedRequest(SummaryApi.IdcardBatchHistory.url, { method: 'GET' })
      .then(r => r.json())
      .then(result => { if (result.success) setGenerationHistory(result.batches); })
      .catch(() => toast.warning('Unable to load generation history.'));

  useEffect(() => {
    if (!user || !canGenerate) return undefined;
    loadGenerationHistory();
    return undefined;
  }, [user, canGenerate]);

  /* ── Poll active batch ──────────────────────────────────────── */
  useEffect(() => {
    if (!batch?.batchId) return undefined;
    autoRedirectedRef.current = false;

    const timer = setInterval(() =>
      makeUserAuthenticatedRequest(`${SummaryApi.IdcardBatchStatus.url}/${batch.batchId}`, { method: 'GET' })
        .then(r => r.json())
        .then(result => {
          if (!result.success) return;
          const next = { ...result.batch, batchId: result.batch._id || batch.batchId };
          setBatch(next);
          setGenerationHistory(cur => [next, ...cur.filter(i => i._id !== next._id)]);

          if ((next.status === 'completed' || next.status === 'failed') && !autoRedirectedRef.current) {
            clearInterval(timer);
            loadGenerationHistory();

            if (next.status === 'completed') {
              autoRedirectedRef.current = true;
              toast.success(`All ${next.total} ID cards generated successfully!`, { duration: 5000 });
              // Auto-open batch detail
              setTimeout(() => openBatchDetail(next), 1200);
            } else {
              toast.error('Batch generation failed. Check history for details.');
            }
          }
        })
        .catch(() => {}),
      4000,
    );
    return () => clearInterval(timer);
  }, [batch?.batchId]);

  /* ── Guards ─────────────────────────────────────────────────── */
  if (!user && hasToken) return <div className="idcard-loading">Checking your ID card access…</div>;
  if (!user) return null;
  if (!canGenerate) return (
    <div className="idcard-denied">
      <ShieldAlert size={40} />
      <h1>Access not enabled</h1>
      <p>Your account is signed in, but ID card generation has not been enabled by an administrator.</p>
      <button onClick={() => navigate('/school/profile')}>Back to profile</button>
    </div>
  );

  /* ── Handlers ───────────────────────────────────────────────── */
  const updateTemplate = (key, value) => setTemplate(cur => ({ ...cur, [key]: value }));

  const saveTemplate = async () => {
    try {
      const res = await makeUserAuthenticatedRequest(SummaryApi.IdcardTemplateCreate.url, { method: 'POST', body: JSON.stringify({ ...template }) });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setServerTemplates(cur => [result.template, ...cur]);
      setSavedTemplates(cur => [result.template, ...cur]);
      setSelectedTemplateId(result.template._id);
      toast.success('Template saved to the server.');
    } catch (err) { toast.error(err.message || 'Unable to save template.'); }
  };

  const deleteTemplate = async templateId => {
    if (!templateId || !window.confirm('Delete this saved template?')) return;
    try {
      const res = await makeUserAuthenticatedRequest(`${SummaryApi.IdcardTemplateDelete.url}/${templateId}`, { method: 'DELETE' });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setServerTemplates(cur => cur.filter(i => i._id !== templateId));
      setSavedTemplates(cur => cur.filter(i => i._id !== templateId));
      if (selectedTemplateId === templateId) setSelectedTemplateId('');
      toast.success('Template deleted.');
    } catch (err) { toast.error(err.message || 'Unable to delete template.'); }
  };

  const handleUpload = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const wb = XLSX.read(target.result, { type: 'array' });
      const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' });
      const parsed = normaliseStudents(rows);
      if (parsed.length) {
        setStudents(parsed);
        setSelectedStudent(0);
        toast.info(`${parsed.length} student records loaded for preview.`);
      } else {
        toast.warning('No student rows found. Check the spreadsheet headers.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadToServer = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.warning('Choose an Excel file first.');
    if (!selectedTemplateId) return toast.warning('Save or select a server template first.');
    const body = new FormData();
    body.append('file', file);
    body.append('templateId', selectedTemplateId);
    try {
      const res = await makeUserAuthenticatedRequest(SummaryApi.IdcardUpload.url, { method: 'POST', body });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      const next = { batchId: result.batchId, _id: result.batchId, status: result.status, total: result.total, generated: 0 };
      setBatch(next);
      setGenerationHistory(cur => [next, ...cur]);
      await loadGenerationHistory();
      toast.info(`Generation queued for ${result.total} records.`);
      setActiveTab('data'); // keep on data tab to watch progress
    } catch (err) { toast.error(err.message || 'Unable to queue generation.'); }
  };

  const downloadExcelTemplate = () => {
    const headers = ['name', 'className', 'penNo', 'rollNo', 'fatherName', 'motherName', 'dob', 'contact', 'address', 'photo'];
    const example = ['Student name', 'V', 'PEN-0001', '01', 'Father name', 'Mother name', 'DD / MM / YYYY', '+91 00000 00000', 'Full address', 'https://drive.google.com/file/d/FILE_ID/view'];
    const wb = XLSX.utils.book_new();
    const ss = XLSX.utils.aoa_to_sheet([headers, example]);
    const is = XLSX.utils.aoa_to_sheet([['ID Card Student Upload Template'], ['Fill one student per row. Keep the header names unchanged.'], ['photo', 'Optional Google Drive image link.'], ['name, className, penNo, rollNo, fatherName, motherName, dob, contact, address', 'Student details used on the card.']]);
    ss['!cols'] = headers.map(h => ({ wch: h === 'address' || h === 'photo' ? 42 : 18 }));
    is['!cols'] = [{ wch: 70 }, { wch: 90 }];
    XLSX.utils.book_append_sheet(wb, ss, 'Students');
    XLSX.utils.book_append_sheet(wb, is, 'Instructions');
    XLSX.writeFile(wb, 'id-card-student-upload-template.xlsx');
    toast.success('Excel upload template downloaded.');
  };

  const downloadPdf = () => {
    if (!batch?.pdfPath || batch.status !== 'completed') return;
    const root = SummaryApi.IdcardUpload.url.replace(/\/api\/idcard\/upload$/, '');
    window.open(`${root}${batch.pdfPath}`, '_blank', 'noopener,noreferrer');
  };

  const openBatchDetail = async item => {
    setDetailLoading(true);
    try {
      const res = await makeUserAuthenticatedRequest(`${SummaryApi.IdcardBatchDetail.url}/${item._id || item.batchId}/detail`, { method: 'GET' });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      const withProxy = (result.students || []).map(s => ({ ...s, photo: normaliseImageUrl(s.photo) }));
      setDetailBatch(result);
      setDetailStudents(withProxy);
      setDetailIndex(0);
      setActiveTab('batch-detail');
    } catch (err) { toast.error(err.message || 'Unable to load generation details.'); }
    finally { setDetailLoading(false); }
  };

  const captureCardCanvas = async () => {
    if (!cardRef.current) throw new Error('Card preview is not ready.');
    if (document.fonts?.ready) await document.fonts.ready;
    const images = [...cardRef.current.querySelectorAll('img')];
    await Promise.all(images.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
    return html2canvas(cardRef.current, { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#fff', imageTimeout: 15000 });
  };
  const captureCardImage = async () => { const c = await captureCardCanvas(); return new Promise(r => c.toBlob(r, 'image/png')); };
  const downloadCardImage = async () => { try { const blob = await captureCardImage(); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${detailStudent.name || 'student'}-${detailStudent.penNo || detailIndex + 1}.png`; a.click(); URL.revokeObjectURL(url); } catch (err) { toast.error(err.message); } };
  const downloadCardPdf = async () => { try { const c = await captureCardCanvas(); const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [c.width, c.height] }); pdf.addImage(c.toDataURL('image/png'), 'PNG', 0, 0, c.width, c.height); pdf.save(`${detailStudent.name || 'student'}-${detailStudent.penNo || detailIndex + 1}.pdf`); } catch (err) { toast.error(err.message); } };
  const downloadAllImages = async () => {
    if (!detailStudents.length) return;
    try {
      const zip = new JSZip();
      const orig = detailIndex;
      for (let i = 0; i < detailStudents.length; i++) { setDetailIndex(i); await new Promise(r => setTimeout(r, 180)); const blob = await captureCardImage(); zip.file(`${String(i + 1).padStart(3, '0')}-${detailStudents[i].name || 'student'}-${detailStudents[i].penNo || i + 1}.png`, blob); }
      setDetailIndex(orig);
      const archive = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(archive); const a = document.createElement('a'); a.href = url; a.download = `${detailBatch?.template?.name || 'id-card-batch'}-images.zip`; a.click(); URL.revokeObjectURL(url);
      toast.success(`${detailStudents.length} card images downloaded as ZIP.`);
    } catch (err) { toast.error(err.message || 'Unable to create image ZIP.'); }
  };
  const downloadAllAsPdf = async () => {
    if (!detailStudents.length) return;
    try {
      const orig = detailIndex; let pdf = null;
      for (let i = 0; i < detailStudents.length; i++) { setDetailIndex(i); await new Promise(r => setTimeout(r, 180)); const c = await captureCardCanvas(); if (!pdf) { pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [c.width / 2, c.height / 2] }); } else { pdf.addPage([c.width / 2, c.height / 2], 'portrait'); } pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, c.width / 2, c.height / 2); }
      setDetailIndex(orig);
      if (pdf) pdf.save(`${detailBatch?.template?.name || 'id-card-batch'}-all-cards.pdf`);
      toast.success(`${detailStudents.length} cards downloaded as PDF.`);
    } catch (err) { toast.error(err.message || 'Unable to create PDF.'); }
  };
  const regenerateBatch = async item => {
    try {
      const res = await makeUserAuthenticatedRequest(`${SummaryApi.IdcardBatchRegenerate.url}/${item._id}/regenerate`, { method: 'POST' });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      const next = { ...item, _id: result.batchId, batchId: result.batchId, status: 'queued', total: result.total, generated: 0, pdfPath: null };
      setBatch(next);
      setGenerationHistory(cur => [next, ...cur.filter(h => h._id !== item._id)]);
      toast.info('PDF regeneration queued.');
    } catch (err) { toast.error(err.message || 'Unable to regenerate PDF.'); }
  };
  const formatBatchDate = v => v ? new Date(v).toLocaleString() : 'Unknown date';

  /* ─── NAV CONFIG ──────────────────────────────────────────── */
  const NAV = [
    { id: 'design',  icon: <Palette size={16} />,        label: 'Design' },
    { id: 'data',    icon: <FileSpreadsheet size={16} />, label: 'Student data' },
    { id: 'saved',   icon: <LayoutTemplate size={16} />,  label: 'Saved formats' },
    { id: 'history', icon: <History size={16} />,         label: 'History' },
  ];

  /* ─── RENDER ──────────────────────────────────────────────── */
  return (
    <div className="idcard-app">
      {/* ── Top bar ── */}
      <header className="idcard-topbar">
        <div className="idcard-brand">
          <div className="brand-mark">ID</div>
          <div>
            <strong>Card Studio</strong>
            <span>Sri Ramakrishna Siksha Niketan</span>
          </div>
        </div>
        <div className="idcard-user">
          <span>{user.name || user.email || 'Admin'}</span>
          <button title="Back to profile" onClick={() => navigate('/school/profile')}><LogOut size={16} /></button>
        </div>
      </header>

      <main className="idcard-layout">
        {/* ── Sidebar ── */}
        <aside className="idcard-sidebar">
          <div className="sidebar-heading">
            <div>
              <span className="eyebrow">MICROSERVICE</span>
              <h1>ID card generator</h1>
            </div>
            <span className="access-pill">ADMIN</span>
          </div>
          <p className="sidebar-intro">Design a template, upload student data, then generate a print-ready batch.</p>

          {/* Sidebar Navigation */}
          <nav className="sidebar-nav">
            {NAV.map(item => (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sni-icon">{item.icon}</span>
                <span className="sni-label">{item.label}</span>
                {item.id === 'saved' && savedCount > 0 && (
                  <span className="sni-badge">{savedCount}</span>
                )}
                {item.id === 'data' && batch && (batch.status === 'queued' || batch.status === 'processing') && (
                  <span className="sni-badge sni-badge-pulse">●</span>
                )}
                {item.id === 'batch-detail' && <span className="sni-active-arrow">›</span>}
              </button>
            ))}
          </nav>

          <div className="sidebar-divider" />

          <div className="sidebar-save-btn-wrap">
            <button className="sidebar-save-btn" onClick={saveTemplate}>
              <Save size={15} /> Save format
            </button>
          </div>

          <div className="saved-summary">
            <div><LayoutTemplate size={18} /><span>Saved formats</span></div>
            <b>{savedCount}</b>
          </div>
        </aside>

        {/* ── Workspace ── */}
        <section className="idcard-workspace">
          <div className="workspace-head">
            <div>
              <span className="eyebrow">WORKSPACE / {NAV.find(n => n.id === activeTab)?.label?.toUpperCase() || activeTab.toUpperCase()}</span>
              <h2>Build your next batch</h2>
            </div>
            <div className="workspace-actions">
              <button className="button primary" onClick={saveTemplate}><Save size={16} /> Save format</button>
            </div>
          </div>

          {/* Tabs (top, secondary navigation) */}
          <div className="workspace-tabs">
            {NAV.map(item => (
              <button
                key={item.id}
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          {/* ─ Design tab ─ */}
          {activeTab === 'design' && (
            <div className="design-panel">
              <div className="form-section">
                <div className="section-title">
                  <span>01</span>
                  <div><h3>Identity &amp; hierarchy</h3><p>These values apply to every card in this batch.</p></div>
                </div>
                {serverTemplates.length > 0 && (
                  <label className="server-template-select">
                    Saved server format
                    <select value={selectedTemplateId} onChange={e => { const sel = serverTemplates.find(i => i._id === e.target.value); if (sel) { setSelectedTemplateId(sel._id); setTemplate(sel); } }}>
                      {serverTemplates.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
                    </select>
                  </label>
                )}
                <div className="form-grid">
                  {[['schoolName','School name'],['session','Session'],['section','School section'],['templateClassName','Template class name'],['classPrefix','Class label'],['footerLabel','Footer label'],['headLabel','Signature role'],['footerText','Footer instruction']].map(([key, label]) => (
                    <label className={key === 'footerText' ? 'wide-field' : ''} key={key}>
                      {label}
                      <input value={template[key] || ''} onChange={e => updateTemplate(key, e.target.value)} />
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-section">
                <div className="section-title">
                  <span>02</span>
                  <div><h3>Color system</h3><p>Match the school's identity without changing student fields.</p></div>
                </div>
                <div className="color-grid">
                  {[['primaryColor','Primary band'],['secondaryColor','Ribbon'],['footerColor','Footer'],['accentColor','Title accent']].map(([key, label]) => (
                    <label key={key}>
                      <span className="color-swatch" style={{ background: template[key] }} />
                      <span>{label}</span>
                      <input type="color" value={template[key]} onChange={e => updateTemplate(key, e.target.value)} />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─ Data tab ─ */}
          {activeTab === 'data' && (
            <div className="data-panel">
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                <Upload size={26} />
                <h3>Upload student workbook</h3>
                <p>Drop an <code>.xlsx</code>, <code>.xls</code>, or <code>.csv</code> file here, or browse your device.</p>
                <span className="file-name">{fileName}</span>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} />
              </div>
              <div className="data-guidance">
                <Users size={18} />
                <div>
                  <b>{students.length} student records in preview</b>
                  <p>Expected columns include name, class, PEN No, roll no, father name, mother name, DOB, contact, address and photo.</p>
                </div>
              </div>
              <div className="data-actions">
                <button className="button secondary" onClick={downloadExcelTemplate}><FileSpreadsheet size={16} /> Download Excel format</button>
                <button className="button primary queue-button" onClick={uploadToServer}><Upload size={16} /> Generate on server</button>
              </div>

              {/* ─ Progress card ─ */}
              {batch && <BatchProgressCard batch={batch} />}
            </div>
          )}

          {/* ─ Saved formats tab ─ */}
          {activeTab === 'saved' && (
            <div className="saved-panel">
              {visibleTemplates.length ? visibleTemplates.map(item => (
                <div className="saved-template" key={item._id || item.id}>
                  <button className="saved-template-open" onClick={() => { setTemplate(item); setSelectedTemplateId(item._id || ''); setActiveTab('design'); }}>
                    <LayoutTemplate size={20} />
                    <span><b>{item.name}</b><small>{item.section} {item.session}{item.templateClassName ? ` (${item.templateClassName})` : ''}</small></span>
                  </button>
                  {item._id && <button className="saved-template-delete" title="Delete template" onClick={() => deleteTemplate(item._id)}><Trash2 size={16} /></button>}
                </div>
              )) : (
                <div className="empty-state">
                  <LayoutTemplate size={30} />
                  <h3>No saved formats yet</h3>
                  <p>Save your first card format from the design tab.</p>
                </div>
              )}
            </div>
          )}

          {/* ─ History tab ─ */}
          {activeTab === 'history' && (
            <div className="history-panel">
              <div className="history-head">
                <div>
                  <span className="eyebrow">SERVER GENERATION</span>
                  <h3>Generation history</h3>
                  <p>Open a completed batch to preview and download exact card images.</p>
                </div>
                <button className="button secondary" onClick={loadGenerationHistory}><Clock3 size={16} /> Refresh</button>
              </div>
              {generationHistory.length ? (
                <div className="history-list">
                  {generationHistory.map(item => (
                    <div className="history-item" key={item._id}>
                      <div className="history-item-main">
                        <div className={`status-dot ${item.status}`} />
                        <div>
                          <b>{item.template?.name || 'Deleted template'}</b>
                          <small>{formatBatchDate(item.createdAt)} · {item.generated || 0} / {item.total || 0} cards</small>
                        </div>
                      </div>
                      <div className="history-item-actions">
                        <span className={`history-status ${item.status}`}>{item.status}</span>
                        <button className="button secondary" disabled={item.status !== 'completed' && (item.generated < item.total || item.total === 0)} onClick={() => openBatchDetail(item)}>
                          {detailLoading ? 'Loading…' : 'View'}
                        </button>
                        <button className="button secondary" onClick={() => regenerateBatch(item)}>
                          <Clock3 size={15} /> Regenerate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Clock3 size={30} />
                  <h3>No generations yet</h3>
                  <p>Upload an Excel workbook to create your first server batch.</p>
                </div>
              )}
            </div>
          )}

          {/* ─ Batch detail tab ─ */}
          {activeTab === 'batch-detail' && (
            <div className="batch-detail-panel">
              <div className="detail-toolbar">
                <button className="button secondary" onClick={() => setActiveTab('history')}><Clock3 size={16} /> Back to history</button>
                <div>
                  <span className="eyebrow">CARD IMAGES / ON DEMAND</span>
                  <h3>{detailBatch?.template?.name || 'Generated batch'}</h3>
                  <p>{detailStudents.length} images are generated in your browser only and are never saved.</p>
                </div>
                <div className="detail-toolbar-downloads">
                  <button className="button export" onClick={downloadAllImages}><Download size={16} /> Download all as ZIP</button>
                  <button className="button primary" onClick={downloadAllAsPdf}><Download size={16} /> Download all as PDF</button>
                </div>
              </div>
              <div className="detail-layout">
                <div className="student-list">
                  {detailStudents.map((student, index) => (
                    <button
                      className={index === detailIndex ? 'student-list-item active' : 'student-list-item'}
                      key={student._id || index}
                      onClick={() => setDetailIndex(index)}
                    >
                      <span>{student.name || 'Unnamed student'}</span>
                      <small>{student.penNo || 'No PEN number'}</small>
                      <Download size={15} onClick={e => { e.stopPropagation(); setDetailIndex(index); setTimeout(downloadCardImage, 200); }} />
                    </button>
                  ))}
                </div>
                <div className="detail-preview">
                  <div className="detail-preview-head">
                    <div>
                      <b>{detailStudent.name || 'Student'}</b>
                      <small>{detailStudent.penNo || 'No PEN number'}</small>
                    </div>
                    <div className="detail-download-actions">
                      <button className="button secondary" onClick={downloadCardPdf}><Download size={16} /> Download PDF</button>
                      <button className="button export" onClick={downloadCardImage}><Download size={16} /> Download image</button>
                    </div>
                  </div>
                  <div className="detail-preview-card">
                    <IdCardPreview student={detailStudent} template={detailBatch?.template || DEFAULT_TEMPLATE} cardRef={cardRef} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─ Live preview (shown on all non-detail tabs) ─ */}
          {activeTab !== 'batch-detail' && (
            <>
              <div className="preview-heading">
                <div>
                  <span className="eyebrow">LIVE PREVIEW</span>
                  <h3>{currentStudent.name || 'Student record'}</h3>
                </div>
                <div className="preview-tools">
                  <select value={selectedStudent} onChange={e => setSelectedStudent(Number(e.target.value))}>
                    {students.map((s, i) => <option key={`${s.name}-${i}`} value={i}>{s.name || `Student ${i + 1}`}</option>)}
                  </select>
                  <button className="button export" disabled={batch?.status !== 'completed' || !batch?.pdfPath} onClick={downloadPdf}>
                    <Download size={16} /> Download PDF
                  </button>
                </div>
              </div>
              <IdCardPreview student={currentStudent} template={template} cardRef={cardRef} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
