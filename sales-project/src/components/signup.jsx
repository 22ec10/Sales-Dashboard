import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email , name, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful, please login");
      navigate("/signin");
    } else {
      alert(data.message);
    }
  };
  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h1 className="signup-title">Create Account 🚀</h1>
        <p className="signup-subtitle">Sign up to start using your Sales Dashboard</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
