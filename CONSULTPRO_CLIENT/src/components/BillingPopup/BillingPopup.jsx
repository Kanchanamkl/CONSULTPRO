import React, { useState } from "react";
import "./BillingPopup.scss";
import crypto from "crypto-js";
import { IoMdCloseCircle } from "react-icons/io";

const BillingPopup = ({ appointmentDetails, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { date, counselor, selectedSlots } = appointmentDetails;
  const chargePerSlot = 800;
  const totalAmount = selectedSlots.length * chargePerSlot;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Billing submitted");
  };

  const md5 = (value) => crypto.MD5(value).toString();

  const generateHash = (
    merchant_id,
    order_id,
    amount,
    currency,
    merchant_secret
  ) => {
    const merchantSecretHash = md5(merchant_secret).toUpperCase();
    const hashString =
      merchant_id + order_id + amount + currency + merchantSecretHash;
    return md5(hashString).toUpperCase();
  };

  const handlePay = () => {
    const paymentDetails = {
      merchant_id: "1228323",
      order_id: "ItemNo12345",
      amount: "2400.00",
      currency: "LKR",
      merchant_secret:
        "MTU5Mzk0MjgzMDQxMzAxMzEyMDUxODAwNTE5NTEyMzM5MzY2MDM3NQ==",
    };

    const hash = generateHash(
      paymentDetails.merchant_id,
      paymentDetails.order_id,
      paymentDetails.amount,
      paymentDetails.currency,
      paymentDetails.merchant_secret
    );

    const payment = {
      sandbox: true,
      merchant_id: paymentDetails.merchant_id,
      return_url: "http://localhost:5174/appointments",
      cancel_url: undefined,
      notify_url: "http://localhost:5174/appointments",
      order_id: paymentDetails.order_id,
      items: "Door bell wireless",
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      hash: hash,
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: "No. 46, Galle road, Kalutara South",
      delivery_city: "Kalutara",
      delivery_country: "Sri Lanka",
      custom_1: "",
      custom_2: "",
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div className="billing-popup">
      <div className="appointment-summary">
        <div className="header-container">
          <h2>Appointment Summary</h2>
          <IoMdCloseCircle onClick={onClose} size="40px" style={{ cursor: 'pointer' }} />
        </div>

        <div className="summary-details">
          <p>
            <span>
              <strong>Date :</strong> {date}
            </span>
          </p>
          <p>
            <span>
              <strong>Counseller :</strong> {counselor}{" "}
            </span>
          </p>
          <p>
            <span>
              <strong>Selected Slots:</strong>
            </span>
          </p>

          <div style={{ overflowY: "scroll", maxHeight: "60px" }}>
            <ul>
              {selectedSlots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="charges">
          <p>
            <span>
              <strong>Charge per Slot:</strong> Rs. {chargePerSlot}{" "}
            </span>
          </p>
          <p>
            <span>
              <strong>Slot Count:</strong> {selectedSlots.length}
            </span>
          </p>
          <p>
            <span>
              <strong>Total Amount:</strong>Rs. {totalAmount}
            </span>
          </p>
        </div>

          <button  type="submit" onClick={handlePay}>
            Pay Now
          </button>
  
      </div>
    </div>
  );
};

export default BillingPopup;
