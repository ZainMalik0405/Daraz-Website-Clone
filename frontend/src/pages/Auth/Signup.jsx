import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      phone,
      address
    };

    // Send userData to backend via POST
    console.log("Signing up:", userData);
  };

  return (
    <div className="auth-container d-flex flex-column align-items-center py-5">
      <h3 className="fw-bold mb-3 text-orange">Create Your Account</h3>
      <form onSubmit={handleSignup} className="w-75" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Phone Number"
          className="form-control mb-3"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="form-control mb-3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className="btn btn-orange w-100" type="submit">
          Sign Up
        </button>
        <p className="mt-3 text-center small">
          Already registered? <a href="/login" className="text-orange">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
