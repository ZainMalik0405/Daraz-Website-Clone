import { useState, useEffect } from "react";
import "./OtpModal.css";

const OtpModal = ({ phone, onVerify, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    onVerify(otp); // ✅ Pass OTP back to SignupModal
  };

  const handleResend = async () => {
    try {
      const res = await fetch("http://localhost:8025/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: phone }) // or user's email if you rename the prop
      });

      const result = await res.json();
      if (res.ok) {
        setSeconds(60);
        setOtp("");
        setError("");
        console.log("🔄 OTP resent:", result.otp);
      } else {
        alert("Failed to resend OTP. Try again.");
      }
    } catch (err) {
      console.error("Resend error:", err);
      alert("OTP resend failed.");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h5 className="fw-bold text-center mb-3 text-orange">Verify Your Phone</h5>
        <p className="text-center small">
          We sent a 6-digit OTP to <strong>{phone}</strong>
        </p>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            className="form-control text-center mb-2"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError("");
            }}
            required
          />
          {error && (
            <p className="text-danger small text-center">{error}</p>
          )}
          <button type="submit" className="btn btn-orange w-100 mt-2">
            Verify
          </button>
        </form>

        <p className="mt-3 text-center small">
          Didn’t get it?{" "}
          {seconds === 0 ? (
            <span
              className="text-orange fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleResend}
            >
              Resend OTP
            </span>
          ) : (
            <span className="text-muted">Resend in {seconds}s</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default OtpModal;
