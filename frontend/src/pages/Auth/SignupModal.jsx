import { useState } from "react";
import "./SignupModal.css";
import OtpModal from "./OtpModal.jsx";

const SignupModal = ({ onClose, setCurrentUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "password") evaluateStrength(value);
  };

  const evaluateStrength = (pwd) => {
    if (pwd.length < 6) return setPasswordStrength("Too Short");
    if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/.test(pwd)) {
      setPasswordStrength("Strong");
    } else if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const getStrengthColor = (level) => ({
    Strong: "success",
    Medium: "warning",
    Weak: "danger",
    "Too Short": "secondary"
  }[level] || "secondary");

  const strengthToPercent = (level) => ({
    "Too Short": "10%",
    Weak: "30%",
    Medium: "60%",
    Strong: "100%"
  }[level] || "0%");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (["Weak", "Too Short"].includes(passwordStrength)) {
      alert("Choose a stronger password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8025/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email })
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ OTP sent:", result.otp);
        setShowOtpModal(true);
      } else {
        alert(`OTP failed to send: ${result.message}`);
      }
    } catch (err) {
      console.error("❌ OTP error:", err);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpVerified = async (enteredOtp) => {
  try {
    const response = await fetch("http://localhost:8025/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...user, otp: enteredOtp }) // ✅ add OTP here
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("darazUser", JSON.stringify(result.user));
      setCurrentUser(result.user);
      setShowOtpModal(false);
      onClose();
    } else {
      alert(`Signup failed: ${result.detail}`);
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Signup failed. Please try again later.");
  }
};

  return (
    <>
      {showOtpModal && (
        <OtpModal
  email={user.email}
  onVerify={handleOtpVerified}
  onClose={() => setShowOtpModal(false)}
/>

      )}
      <div className="login-modal-overlay">
        <div className="login-modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h4 className="fw-bold mb-3 text-orange text-center">Create Your Account</h4>
          <form onSubmit={handleSignup}>
            {["name", "email", "password", "phone"].map((field, i) => (
              <div key={i} className="mb-3">
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={
                    field === "name"
                      ? "Full Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="form-control"
                  value={user[field]}
                  onChange={handleChange}
                  required
                />
                {field === "password" && passwordStrength && (
                  <>
                    <div className={`small fw-semibold mt-1 text-${getStrengthColor(passwordStrength)}`}>
                      Password Strength: {passwordStrength}
                    </div>
                    <div className="progress mt-1">
                      <div
                        className={`progress-bar bg-${getStrengthColor(passwordStrength)}`}
                        role="progressbar"
                        style={{ width: strengthToPercent(passwordStrength) }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-orange w-100">Sign Up</button>
            <p className="mt-3 text-center small">
              Already registered?{" "}
              <span className="text-orange" style={{ cursor: "pointer" }} onClick={onClose}>
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
