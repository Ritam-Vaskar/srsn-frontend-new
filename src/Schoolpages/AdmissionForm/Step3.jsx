import React from 'react';
import './styles/AdmissionForm.css';

const PermanentContactDetails = ({ register, errors }) => {
  return (
    <div>
      <h2>Permanent Contact Details</h2>

      <div>
        <label>Address</label>
        <input 
          {...register("address", { required: "Address is required" })} 
          placeholder="Enter Address" 
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>

      <div>
        <label>City</label>
        <input 
          {...register("city", { required: "City is required" })} 
          placeholder="Enter City" 
        />
        {errors.city && <p className="error">{errors.city.message}</p>}
      </div>

      <div>
        <label>District</label>
        <input 
          {...register("district", { required: "District is required" })} 
          placeholder="Enter District" 
        />
        {errors.district && <p className="error">{errors.district.message}</p>}
      </div>

      <div>
        <label>Municipality</label>
        <input 
          {...register("municipality", { required: "Municipality is required" })} 
          placeholder="Enter Municipality" 
        />
        {errors.municipality && <p className="error">{errors.municipality.message}</p>}
        <p>If not Applicable then write 'N/A'</p>
      </div>

      <div>
        <label>Panchayt</label>
        <input 
          {...register("panchayt", { required: "Panchayt is required" })} 
          placeholder="Enter Panchayt" 
        />
        {errors.panchayt && <p className="error">{errors.panchayt.message}</p>}
        <p>If not Applicable then write 'N/A'</p>
      </div>

      <div>
        <label>Post Office</label>
        <input 
          {...register("postOffice", { required: "Post Office is required" })} 
          placeholder="Enter Post Office" 
        />
        {errors.postOffice && <p className="error">{errors.postOffice.message}</p>}
      </div>

      <div>
        <label>Police Station</label>
        <input 
          {...register("policeStation", { required: "Police Station is required" })} 
          placeholder="Enter Police Station" 
        />
        {errors.policeStation && <p className="error">{errors.policeStation.message}</p>}
      </div>

      <div>
        <label>Pin Code</label>
        <input 
          type="number" 
          {...register("pinCode", { 
            required: "Pin Code is required", 
            pattern: { value: /^[0-9]{6}$/, message: "Enter a valid 6-digit Pin Code" }
          })} 
          placeholder="Enter Pin Code" 
        />
        {errors.pinCode && <p className="error">{errors.pinCode.message}</p>}
      </div>

      <div>
        <label>State</label>
        <input 
          {...register("state", { required: "State is required" })} 
          placeholder="Enter State" 
        />
        {errors.state && <p className="error">{errors.state.message}</p>}
      </div>

      <div>
        <label>Country</label>
        <select 
          {...register("country", { required: "Country is required" })}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>
        
        {errors.country && <p className="error">{errors.country.message}</p>}
      </div>
    </div>
  );
};

export default PermanentContactDetails;
