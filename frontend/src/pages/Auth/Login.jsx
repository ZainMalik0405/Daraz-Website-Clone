import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // 🔐 Send login request to backend with credentials
  };

  return (
    <div className="auth-container d-flex flex-column align-items-center py-5">
      <h3 className="fw-bold mb-3 text-orange">Login to Your Account</h3>
      <form onSubmit={handleLogin} className="w-75" style={{ maxWidth: "400px" }}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-orange w-100" type="submit">
          Login
        </button>
        <p className="mt-3 text-center small">
          Don’t have an account? <a href="/signup" className="text-orange">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
