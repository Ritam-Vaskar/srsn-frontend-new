import React from 'react';

const ResidentialContactDetails = ({ register, errors }) => {
  return (
    <div>
      <h2>Residential Contact Details</h2>
      <div>
        <label>Residential Address</label>
        <input
          {...register("rAddress", { required: "Residential Address is required" })}
          placeholder="Enter residential address"
        />
        {errors.rAddress && <p className="error">{errors.rAddress.message}</p>}
      </div>
      <div>
        <label>Residential City</label>
        <input
          {...register("rCity", { required: "Residential City is required" })}
          placeholder="Enter residential city"
        />
        {errors.rCity && <p className="error">{errors.rCity.message}</p>}
      </div>
      <div>
        <label>Residential Pin Code</label>
        <input
          {...register("rPinCode", { required: "Residential Pin Code is required" })}
          placeholder="Enter residential pin code"
        />
        {errors.rPinCode && <p className="error">{errors.rPinCode.message}</p>}
      </div>
      <div>
        <label>Residential State</label>
        <input
          {...register("rState", { required: "Residential State is required" })}
          placeholder="Enter residential state"
        />
        {errors.rState && <p className="error">{errors.rState.message}</p>}
      </div>
      <div>
        <label>Residential Country</label>
        <input
          {...register("rCountry", { required: "Residential Country is required" })}
          placeholder="Enter residential country"
        />
        {errors.rCountry && <p className="error">{errors.rCountry.message}</p>}
      </div>
    </div>
  );
};

export default ResidentialContactDetails;
