const PaymentDetails = ({ register, errors, selectedClass, fees }) => {
  return (
    <div>
      <h2>Payment Details</h2>
      

      {selectedClass && (
        <div style={{ marginTop: '20px' }}>
          <h3>Class: {selectedClass}</h3>
          <p style={{ marginTop: '10px' , fontSize: '20px'}}>Fees: {fees ? `₹${fees.amount}` : 'Not available'}</p>
          {fees?.qrCode && <img style={{ marginTop: '10px' , width: '200px', height: '200px'}} src={fees.qrCode} alt={`QR for ${selectedClass}`} />}
        </div>
      )}

      <div>
      <label>Payment ID</label>
        <input {...register("paymentId", { required: "Payment ID is required" })} />
        {errors.paymentId && <p>{errors.paymentId.message}</p>}
      </div>
    </div>

    
  );
};

export default PaymentDetails;
