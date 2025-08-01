import { useState } from "react";
// import "./LoginModal.css";

const LoginModal = ({ onClose, setCurrentUser }) => {
  const [mode, setMode] = useState("password");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8025/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_or_phone: emailOrPhone,
          password: password
        })
      });

      const data = await response.json();
      console.log("📦 Backend response:", data);

      if (response.ok) {
        localStorage.setItem("darazUser", JSON.stringify(data.user));
        setCurrentUser(data.user); // ✅ Update App state
        onClose();

      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="d-flex justify-content-between mb-3">
          <button
            className={`tab-button ${mode === "password" ? "active" : ""}`}
            onClick={() => setMode("password")}
          >
            LOGIN
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            className="form-control mb-3"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          {mode === "password" && (
            <>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mb-3 text-end">
                <a href="/forgot-password" className="text-orange small">
                  Forgot password?
                </a>
              </div>
            </>
          )}
          <button type="submit" className="btn btn-orange w-100">LOGIN</button>
          <p className="mt-3 text-center small">
            Don’t have an account? <a href="/signup" className="text-orange">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
