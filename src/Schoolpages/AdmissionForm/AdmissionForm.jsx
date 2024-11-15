import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import BasicInfo from './Step1';
import PreviousSchoolDetails from './Step2';
import PermanentContactDetails from './Step3';
import ResidentialContactDetails from './Step4';
import GuardianDetails from './Step5';
import PaymentDetails from './Step6';
import Preview from './Step7';
import './styles/AdmissionForm.css';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const LOCAL_STORAGE_KEY = 'admissionFormData';


const AdmissionForm = () => {
  const [step, setStep] = useState(1);

  const tableRef = useRef();

  // const handleDownloadPDF = async () => {
  //   const element = tableRef.current;
  //   const canvas = await html2canvas(element);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  
  //   // Adjust PDF dimensions based on content
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('Admission_Form.pdf');
  // };
  const [profilePic, setprofilePic] = useState('');

  const handleDownloadPDF = async () => {
    const element = tableRef.current;
    // Wait for the image to load
    const image = new Image();
    image.src = profilePic;
    await new Promise((resolve) => {
      image.onload = resolve;
      image.onerror = resolve; 
    });
  
    const canvas = await html2canvas(element, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
  
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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

  // Load form data from local storage on component mount
  // useEffect(() => {
  //   const savedFormData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (savedFormData) {
  //     Object.keys(savedFormData).forEach((key) => {
  //       setValue(key, savedFormData[key]);
  //     });
  //   }
  // }, [setValue]);

  // // Watch form data and store it in local storage whenever it changes
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  //   });
  //   return () => subscription.unsubscribe(); // Cleanup
  // }, [watch]);

  // On submission of the entire form
  const onSubmit = async (data) => {
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

      toast.success('Form submitted successfully!');
      //download pdf
      handleDownloadPDF();
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear form data from local storage on successful submission
      console.log(result);
    } catch (error) {
      toast.error(error.message);
      console.error('Submission Error:', error);
    }
  };

  // Handle next button with validation
  const handleNext = async () => {
    const isStepValid = await trigger(); // Validates all fields in the current step
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => setStep((prevStep) => prevStep - 1);

  const [admissionOpen, setAdmissionOpen] = useState(false);

  const fetchAdmissionOpen = async () => {
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
  }

  useEffect(() => {
    fetchAdmissionOpen();
  }, []);

  return (
    <div className="form-container">
      {!admissionOpen ? (
        <h1>Admission is not ongoing</h1>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <BasicInfo profilePic={profilePic} setprofilePic={setprofilePic} register={register} errors={errors} setValue={setValue} />}
          {step === 2 && <PreviousSchoolDetails register={register} errors={errors} />}
          {step === 3 && <PermanentContactDetails register={register} errors={errors} />}
          {step === 4 && <ResidentialContactDetails register={register} errors={errors} />}
          {step === 5 && <GuardianDetails register={register} errors={errors} />}
          {step === 6 && <PaymentDetails register={register} errors={errors} />}
          {step === 7 && <Preview data={watch()} profilePic={profilePic} tableRef={tableRef}/>}

          

          <div className="form-navigation">
            {step > 1 && (
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
                <label>
                  <input
                    type="checkbox"
                    {...register('terms', { required: 'You must accept terms and conditions' })}
                  />
                  I accept the terms and conditions
                </label>
                {errors.terms && <p className="error">{errors.terms.message}</p>}
                <span onClick={handleDownloadPDF}>Download PDF</span>
                <button type="submit" className="submit-button">
                  Submit
                </button>
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
