import React from 'react';
import './styles/AdmissionForm.css';
import { useEffect, useState } from 'react';
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
        <label>Residential Address same as Permanent
          <span style={{ color: "red" }}>*</span>
        </label>
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
          <label>Residential Address
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rAddress", { required: "Residential Address is required" })}
            placeholder="Enter residential address"
          />
          {errors.rAddress && <p className="error">{errors.rAddress.message}</p>}
        </div>
        <div>
          <label>Residential City
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rCity", { required: "Residential City is required" })}
            placeholder="Enter residential city"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>
        <div>
          <label>Residential District
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rDistrict", { required: "Residential District is required" })}
            placeholder="Enter residential District"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>
        <div>
          <label>Residential Municipality
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rMunicipality", { required: "Residential Municipality is required" })}
            placeholder="Enter residential municipality"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
          <p>If not Applicable then write 'N/A'</p>
        </div>

        <div>
          <label>Residential Panchayt
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rPanchayt", { required: "Residential Panchayt is required" })}
            placeholder="Enter residential panchayt"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
          <p>If not Applicable then write 'N/A'</p>
        </div>


        <div>
          <label>Residential Post Office
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rPostOffice", { required: "Residential Post Office is required" })}
            placeholder="Enter residential post office"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>


        <div>
          <label>Residential Police Station
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rPoliceStation", { required: "Residential Police Station is required" })}
            placeholder="Enter residential police station"
          />
          {errors.rCity && <p className="error">{errors.rCity.message}</p>}
        </div>

        <div>
          <label>Residential Pin Code
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rPinCode", { required: "Residential Pin Code is required" })}
            placeholder="Enter residential pin code"
          />
          {errors.rPinCode && <p className="error">{errors.rPinCode.message}</p>}
        </div>
        <div>
          <label>Residential State
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rState", { required: "Residential State is required" })}
            placeholder="Enter residential state"
          />
          {errors.rState && <p className="error">{errors.rState.message}</p>}
        </div>
        <div>
          <label>Residential Country
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            {...register("rCountry", { required: "Residential Country is required" })}
            placeholder="Enter residential country"
          />
          {errors.rCountry && <p className="error">{errors.rCountry.message}</p>}
        </div>
      </>}

    </div>
  );
};

export default ResidentialContactDetails;

