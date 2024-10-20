import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BasicInfo from './Step1';
import PreviousSchoolDetails from './Step2';
import PermanentContactDetails from './Step3';
import ResidentialContactDetails from './Step4';
import GuardianDetails from './Step5';
import PaymentDetails from './Step6';
import Preview from './Step7';
import './styles/AdmissionForm.css';

const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      profilePic: '',
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
      Grade: '',
      StudentCode: '',
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
      paymentId: ''
    }
  });

  // On submission of the entire form
  const onSubmit = data => {
    console.log('Final Submission Data:', data);
    alert('Form submitted successfully!');
  };

  // Handle next button with validation
  const handleNext = async () => {
    const isStepValid = await trigger(); // Validates all inputs in the current step
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Handle previous button
  const handlePrev = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <BasicInfo register={register} errors={errors} />}
        {step === 2 && <PreviousSchoolDetails register={register} errors={errors} />}
        {step === 3 && <PermanentContactDetails register={register} errors={errors} />}
        {step === 4 && <ResidentialContactDetails register={register} errors={errors} />}
        {step === 5 && <GuardianDetails register={register} errors={errors} />}
        {step === 6 && <PaymentDetails register={register} errors={errors} />}
        {step === 7 && <Preview data={watch()} />}

        <div className="form-navigation">
          {step > 1 && <button type="button" onClick={handlePrev}>Previous</button>}
          {step < 7 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 7 && (
            <div>
              <label>
                <input
                  type="checkbox"
                  {...register("terms", { required: "You must accept terms and conditions" })}
                />
                I accept the terms and conditions
              </label>
              {errors.terms && <p className="error">{errors.terms.message}</p>}
              <button type="submit">Submit</button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
