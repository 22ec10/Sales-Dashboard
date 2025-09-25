
import { useState , useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    const res = await fetch("http://localhost:4001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.token, data.email);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <h1 className="signin-title">Welcome Back 👋</h1>
        <p className="signin-subtitle">Sign in to access your Sales Dashboard</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="Email"
            placeholder="Enter your Email"
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

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="signin-footer">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
