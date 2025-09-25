
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import logo from "../images/sales logo.png"; 
import SignOut  from "./signout";
function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <img src={logo} alt="Sales Dashboard Logo" className="logo" />
      <div className="nav-items">
        <Link to="/" className="nav-item">About</Link>
          {user ? (
          <>
            <Link to="/dashboard" className="nav-item">Dashboard</Link>
            <SignOut />
          </>
        ) : (
          <>
            <Link to="/signin" className="nav-item">Sign In</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
          </>
        )}
       
      </div>
    </div>
  );
}
export default Header;
