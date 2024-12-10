import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import BasicInfo from './Step1';
import PreviousSchoolDetails from './Step2';
import PermanentContactDetails from './Step3';
import ResidentialContactDetails from './Step4';
import GuardianDetails from './Step5';
import PaymentDetails from './Step6';
import Preview from './Step7';
import classFees from '../../helper/classFees';
import './styles/AdmissionForm.css';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Spinner from '../../layouts/Loader2/Loader2';
import Loader from '../../layouts/Loader/Spinner'


const LOCAL_STORAGE_KEY = 'admissionFormData';


const AdmissionForm = () => {
  const [isDownload,setisDownload]=useState(false);

  const [step, setStep] = useState(1);

  const tableRef = useRef();

  const [profilePic, setprofilePic] = useState('');

  const [selectedClass, setSelectedClass] = useState('');

  // const waitForImagesToLoad = async (element) => {
  //   const images = element.querySelectorAll('img');
  //   await Promise.all(
  //     Array.from(images).map((img) => {
  //       if (img.complete) return Promise.resolve();
  //       return new Promise((resolve) => {
  //         img.onload = resolve;
  //         img.onerror = resolve;
  //       });
  //     })
  //   );
  // };

  // Handle PDF download
  // const handleDownloadPDF = async () => {
  //   const element = tableRef.current;

  //   // Ensure all images are loaded
  //   await waitForImagesToLoad(element);

  //   // Determine scale based on device pixel ratio for better resolution
  //   const scale = window.devicePixelRatio > 1 ? 2 : 1;

  //   const canvas = await html2canvas(element, {
  //     scale,
  //     useCORS: true,
  //     windowWidth: element.scrollWidth,
  //   });

  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode and A4 size

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   // Adjusted dimensions for better scaling on mobile
  //   const imgWidth = pdfWidth -10; // Margins
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   if (imgHeight <= pdfHeight) {
  //     // Single page
  //     pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight); // Add image with margin
  //   } else {
  //     // Multi-page
  //     let y = 0;
  //     const pageHeight = (canvas.width * pdfHeight) / pdfWidth;

  //     while (y < canvas.height) {
  //       const pageCanvas = document.createElement('canvas');
  //       pageCanvas.width = canvas.width;
  //       pageCanvas.height = Math.min(canvas.height - y, pageHeight);

  //       const ctx = pageCanvas.getContext('2d');
  //       ctx.drawImage(
  //         canvas,
  //         0,
  //         y,
  //         canvas.width,
  //         pageCanvas.height,
  //         0,
  //         0,
  //         canvas.width,
  //         pageCanvas.height
  //       );

  //       const pageImgData = pageCanvas.toDataURL('image/png');
  //       pdf.addImage(pageImgData, 'PNG', 5, 5, imgWidth, (pageCanvas.height * imgWidth) / canvas.width);

  //       y += pageCanvas.height;

  //       if (y < canvas.height) {
  //         pdf.addPage(); // Add page if there is more content
  //       }
  //     }
  //   }

  //   // Save the generated PDF
  //   pdf.save('Admission_Form.pdf');
  // };


  const waitForImagesToLoad = async (element) => {
    const images = element.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };
  
  const handleDownloadPDF = async () => {
    const element = tableRef.current;
  
    // Ensure all images are loaded
    await waitForImagesToLoad(element);
  
    // Check if it's a mobile device
    if (isMobile()) {
      const viewportMetaTag = document.querySelector('meta[name="viewport"]');
      if (viewportMetaTag) {
        viewportMetaTag.setAttribute('content', ''); // Temporarily disable viewport settings
      }
  
      setTimeout(async () => {
        await generatePDF(element);
        if (viewportMetaTag) {
          setTimeout(() => {
            viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=1'); // Restore viewport
          }, 0);
        }
      }, 0);
    } else {
      await generatePDF(element);
    }
  };
  
  // Helper to check if the device is mobile
  const isMobile = () => window.innerWidth < 768;
  
  const generatePDF = async (element) => {
    // Fixed scale for consistent rendering
    const scale = 2;
  
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      windowWidth: element.scrollWidth,
    });
  
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Always A4 size
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 10; // Fixed margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    if (imgHeight <= pdfHeight) {
      // Single-page PDF
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
    } else {
      // Multi-page PDF
      let y = 0;
      const pageHeight = (canvas.width * pdfHeight) / pdfWidth;
  
      while (y < canvas.height) {
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(canvas.height - y, pageHeight);
  
        const ctx = pageCanvas.getContext('2d');
        ctx.drawImage(
          canvas,
          0,
          y,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height
        );
  
        const pageImgData = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageImgData, 'PNG', 5, 5, imgWidth, (pageCanvas.height * imgWidth) / canvas.width);
  
        y += pageCanvas.height;
  
        if (y < canvas.height) {
          pdf.addPage(); // Add a new page
        }
      }
    }
  
    // Save the generated PDF
    pdf.save('Admission_Form.pdf');
  };
  

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      dob: '',
      dobRegNo: '',
      socialCatagory: '',
      socialCatagoryRegNo: '',
      religion: '',
      motherTongue: '',
      nationality: '',
      aadharNo: '',
      bloodGroup: '',
      healthID: '',
      grade: '',
      studentCode: '',
      address: '',
      city: '',
      district: '',
      municipality: '',
      panchayt: '',
      postOffice: '',
      policeStation: '',
      pinCode: '',
      state: '',
      country: '',
      rAddress: '',
      rCity: '',
      rDistrict: '',
      rMunicipality: '',
      rPanchayt: '',
      rPostOffice: '',
      rPoliceStation: '',
      rPinCode: '',
      rState: '',
      rCountry: '',
      fatherName: '',
      motherName: '',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      guardianEmail: '',
      annualIncome: '',
      guardianQualification: '',
      paymentId: '',
      rAddressSameAsPermanent: '',
    },
  });

  const [load, setload] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);

  // Load form data from local storage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedFormData) {
      Object.keys(savedFormData).forEach((key) => {
        setValue(key, savedFormData[key]);
      });
    }
  }, [setValue]);

  // Watch form data and store it in local storage whenever it changes
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe(); // Cleanup
  }, [watch]);

  // On submission of the entire form
  const onSubmit = async (data) => {
    setload(true);
    console.log('Final Submission Data:', data);
    const formData = { ...data, profilePic };

    try {

      const response = await fetch(SummaryApi.UserAdmissionSignUp.url, {
        method: SummaryApi.UserAdmissionSignUp.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Form submitted successfully , you will get the application pdf in your registered email , please submit the hard copy of the pdf to the school office');
      //download pdf
      handleDownloadPDF();
      setisDownload(true);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear form data from local storage on successful submission
      console.log(result);
    } catch (error) {
      toast.error(error.message);
      console.error('Submission Error:', error);
    }
    finally {
      setload(false);
    }

  };

  // Handle next button with validation
  const handleNext = async () => {
    const isStepValid = await trigger(); // Validates all fields in the current step
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 0);
  };

  const [admissionOpen, setAdmissionOpen] = useState(false);

  const fetchAdmissionOpen = async () => {
    setpageLoader(true);
    try {
      const response = await fetch(SummaryApi.AdmissionFetch.url, {
        method: SummaryApi.AdmissionFetch.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const result = await response.json();
      console.log(result);
      setAdmissionOpen(result.admission.isOngoing);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    finally {
      setpageLoader(false)
    }
  }

  useEffect(() => {
    fetchAdmissionOpen();
  }, []);

  if (pageLoader) {
    return (<div><Loader /></div>)
  }

  return (
    <div className="form-container">
      {!admissionOpen ? (
        <h1>Admission is not ongoing</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <BasicInfo profilePic={profilePic} setprofilePic={setprofilePic} register={register} errors={errors} setValue={setValue} />}
          {step === 2 && <PreviousSchoolDetails register={register} errors={errors} onClassChange={setSelectedClass} />}
          {step === 3 && <PermanentContactDetails register={register} errors={errors} />}
          {step === 4 && <ResidentialContactDetails register={register} errors={errors} />}
          {step === 5 && <GuardianDetails register={register} errors={errors} />}
          {step === 6 && <PaymentDetails register={register} errors={errors} selectedClass={selectedClass} fees={classFees[selectedClass]} setValue={setValue} />}
          {step === 7 && <Preview data={watch()} profilePic={profilePic} tableRef={tableRef} />}



          <div className="form-navigation">
            {step > 1 && step < 7 && (
              <button type="button" onClick={handlePrev} className="prev-button">
                Previous
              </button>
            )}
            {step < 7 && (
              <button type="button" onClick={handleNext} className="next-button">
                Next
              </button>
            )}
            {step === 7 && (
              <div className="terms-section">
                <button type="button" onClick={handlePrev} className="prev-button">
                  Previous
                </button>
                <div className="download-pdf">
                  {isDownload&&<div className="pdf-link" onClick={handleDownloadPDF}>Download Application as PDF</div>}
                </div>

                <div className="accept-terms">
                  <label className="terms-label">
                    <input
                      type="checkbox"
                      {...register('terms', { required: 'You must accept terms and conditions' })}
                    />
                    I accept the <a href="/terms" target="_blank" rel="noopener noreferrer" className="terms-link">terms and conditions</a>
                  </label>
                  {errors.terms && <p className="error">{errors.terms.message}</p>}
                </div>

                <div className="action-buttons">
                  {load ? <Spinner /> :
                    <button type="submit" className="submit-button" disabled={!watch('terms')}>
                      Submit
                    </button>
                  }
                </div>
              </div>
            )}


          </div>
        </form>
      )}
      <div className="contact-info">
        *If you face problems logging in, please contact the administrator.
      </div>
    </div>
  );

};

export default AdmissionForm;
