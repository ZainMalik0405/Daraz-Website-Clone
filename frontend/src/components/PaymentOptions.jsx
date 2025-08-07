import { useState } from "react";

const PaymentOptions = () => {
  const [method, setMethod] = useState("cod");

  return (
    <div className="mb-4">
      <h5 className="fw-bold">💳 Payment Method</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          id="cod"
          checked={method === "cod"}
          onChange={() => setMethod("cod")}
        />
        <label className="form-check-label" htmlFor="cod">
          Cash on Delivery
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          id="card"
          checked={method === "card"}
          onChange={() => setMethod("card")}
        />
        <label className="form-check-label" htmlFor="card">
          Credit/Debit Card
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
