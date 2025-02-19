import React, { useState } from "react";
import { useLocation} from "react-router-dom";
import axios from "axios"; 
import { FaCreditCard, FaGooglePay, FaPaypal } from "react-icons/fa";
import "./css/Payment.css"; 

function Payments() {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seatsBooked = location.state?.seatsBooked;
  const tripId = location.state?.tripId;
  const bookingTime = location.state?.bookingTime;
  const userId = localStorage.getItem("userId");
  
  console.log(seatsBooked);
  console.log(tripId);
  console.log(bookingTime);
  console.log("userId" + userId);
  
  

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {

    const rideBook = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/api/rides/book?userId=${userId}&tripId=${tripId}&seatsBooked=${seatsBooked}`
          
        // , {
          // params: { source, destination},
        //}
      );
        console.log(response.data);
      } catch (err) {
        setError("Failed!!");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    rideBook();


    event.preventDefault();
    alert("Payment successful Ride Booked!");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title text-center" style={{marginTop:"-150px"}}>Payment</h2>

      <form onSubmit={handleSubmit} className="payment-form" >
        
        {/* Payment Method Selection */}
        <div className="payment-method">
          <label className="form-label">Choose Payment Method:</label>
          <div className="input-group">
            <span className="input-group-text">
              {paymentMethod === "creditCard" && <FaCreditCard />}
              {paymentMethod === "upi" && <FaGooglePay />}
              {paymentMethod === "paypal" && <FaPaypal />}
            </span>
            <select className="form-select" value={paymentMethod} onChange={handlePaymentChange}>
              <option value="creditCard">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>

        {/* Credit Card Payment */}
        {paymentMethod === "creditCard" && (
          <div className="card-details">
            <label className="form-label">Card Number:</label>
            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" required />

            <div className="row">
              <div className="col">
                <label className="form-label">Expiry Date:</label>
                <input type="month" className="form-control" required />
              </div>
              <div className="col">
                <label className="form-label">CVV:</label>
                <input type="text" className="form-control" placeholder="123" maxLength="3" required />
              </div>
            </div>
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === "upi" && (
          <div className="upi-details">
            <label className="form-label">UPI ID:</label>
            <input type="text" className="form-control" placeholder="yourname@upi" required />
          </div>
        )}

        {/* PayPal Payment */}
        {paymentMethod === "paypal" && (
          <div className="paypal-details">
            <p>You will be redirected to PayPal for payment.</p>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 pay-button">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}

export default Payments;
