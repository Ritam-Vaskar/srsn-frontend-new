import React from 'react';
import './styles/AdmissionForm.css';
const PaymentDetails = ({ register, errors }) => {
  return (
    <div>
      <h2>Payment Details</h2>
      <div>
        <label>Payment ID</label>
        <input {...register("paymentId", { required: "Payment ID is required" })} />
        {errors.paymentId && <p>{errors.paymentId.message}</p>}
      </div>
    </div>
  );
};

export default PaymentDetails;
