import React from 'react';
import './styles/AdmissionForm.css';
import { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';

const ResidentialContactDetails = ({ register, errors }) => {
  const [flag, setFlag] = useState(false);
  // const { register, watch, formState: { errors } } = useForm(); // Make sure you have useForm from react-hook-form

  const handleSelectionChange = (event) => {
    setFlag(event.target.value === "No");
  };

  return (
    <div>
      <h2>Residential Contact Details</h2>

      <div>
        <label>Residential Address same as Permanent</label>
        <select
          {...register("rAddressSameAsPermanent", { required: "This field is required." })}
          onChange={handleSelectionChange} // Add onChange handler here
        >
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.rAddressSameAsPermanent && (
          <p className="error">{errors.rAddressSameAsPermanent.message}</p>
        )}
      </div>


      {flag && <>
        <div>
          <label>Residential Address</label>
          <input
            {...register("rAddress")}
            placeholder="Enter residential address"
          />
          {errors.rAddress && <p className="error">{errors.rAddress.message}</p>}
        </div>
        <div>
          <label>Residential City</label>
          <input
            {...register("rCity")}
            placeholder="Enter residential city"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>
        <div>
          <label>Residential District</label>
          <input
            {...register("rDistrict")}
            placeholder="Enter residential District"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>
        <div>
          <label>Residential Municipality</label>
          <input
            {...register("rMunicipality")}
            placeholder="Enter residential municipality"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>

        <div>
          <label>Residential Panchayt</label>
          <input
            {...register("rPanchayt")}
            placeholder="Enter residential panchayt"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>


        <div>
          <label>Residential Post Office</label>
          <input
            {...register("rPostOffice")}
            placeholder="Enter residential post office"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>


        <div>
          <label>Residential Police Station</label>
          <input
            {...register("rPoliceStation")}
            placeholder="Enter residential police station"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>

        <div>
          <label>Residential Pin Code</label>
          <input
            {...register("rPinCode")}
            placeholder="Enter residential pin code"
          />
          {errors.rPinCode && <p className="error">{errors.rPinCode.message}</p>}
        </div>
        <div>
          <label>Residential State</label>
          <input
            {...register("rState")}
            placeholder="Enter residential state"
          />
          {errors.rState && <p className="error">{errors.rState.message}</p>}
        </div>
        <div>
          <label>Residential Country</label>
          <input
            {...register("rCountry")}
            placeholder="Enter residential country"
          />
          {errors.rCountry && <p className="error">{errors.rCountry.message}</p>}
        </div>
      </>}

    </div>
  );
};

export default ResidentialContactDetails;

