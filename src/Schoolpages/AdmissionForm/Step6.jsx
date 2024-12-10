// const PaymentDetails = ({ register, errors, selectedClass, fees }) => {
//   return (
//     <div>
//       <h2>Payment Details</h2>
      

//       {selectedClass && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Class: {selectedClass}</h3>
//           <p style={{ marginTop: '10px' , fontSize: '20px'}}>Fees: {fees ? `₹${fees.amount}` : 'Not available'}</p>
//           {fees?.qrCode && <img style={{ marginTop: '10px' , width: '200px', height: '200px'}} src={fees.qrCode} alt={`QR for ${selectedClass}`} />}
//         </div>
//       )}

//       <div>
//       <label>Payment ID</label>
//         <input {...register("paymentId", { required: "Payment ID is required" })} />
//         {errors.paymentId && <p>{errors.paymentId.message}</p>}
//       </div>
//     </div>

    
//   );
// };

// export default PaymentDetails;


import { a, div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const PaymentDetails = ({ register, errors, selectedClass, fees, setValue }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);

    // Set paymentId to "cash" if cash is selected, otherwise clear it
    setValue("paymentId", selectedMethod === "cash" ? "cash" : "");
  };

  useEffect(() => {
    // Initialize paymentId if payment method is cash
    if (paymentMethod === "cash") {
      setValue("paymentId", "cash");
    }
  }, [paymentMethod, setValue]);

  return (
    <div>
      <h2>Payment Details</h2>

      {selectedClass && fees && (
        <div style={{ marginTop: "20px" , display: "flex", flexDirection: "column", alignItems: "center"} }>
          <h3>Class: {selectedClass}</h3>
          <p style={{ marginTop: "10px", fontSize: "20px" }}>
            Fees: ₹{fees.amount}
          </p>
          {fees.qrCode ? (
            <img
              style={{ marginTop: "10px", width: "400px", height: "400px" }}
              src={fees.qrCode}
              alt={`QR for ${selectedClass}`}
            />
          ) : (
            <p>QR code not available</p>
          )}
          {
            fees.qrCode && (
              <a href={fees.qrCode} target="_blank" rel="noopener noreferrer">
                Download QR Code
              </a>
            )
          }
        </div>
      )}

      <div>
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          style={{ display: "block", marginBottom: "10px" }}
        >
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      {paymentMethod === "online" && (
        <div>
          <label>Payment ID</label>
          <input
            {...register("paymentId", {
              required: "Payment ID is required",
            })}
          />
          {errors.paymentId && <p>{errors.paymentId.message}</p>}
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
