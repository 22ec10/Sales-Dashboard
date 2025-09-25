import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            
    navigate("/signin");   
  };

  return (
  <button
  onClick={handleLogout}
  style={{
    padding: "5px 10px",
    background: "linear-gradient(135deg, #8e0e00, #1f1c18)", // 🔥 gradient
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.1s ease-in-out",
  }}
  onMouseOver={(e) => {
    e.target.style.transform = "scale(1.08)";
    e.target.style.background = "linear-gradient(135deg, #e52d27, #b31217)";
    e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
  }}
  onMouseOut={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.background = "linear-gradient(135deg, #8e0e00, #1f1c18)";
    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  }}
  onMouseDown={(e) => {
    e.target.style.transform = "scale(0.95)";
  }}
  onMouseUp={(e) => {
    e.target.style.transform = "scale(1.08)";
  }}
>
  🚪 Sign Out
</button>

  );
}

export default SignOut;
