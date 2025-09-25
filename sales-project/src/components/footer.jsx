
import logo from "../images/sales logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
function Footer(){
    return(
        <div className="footer-wrapper">
           <img src={logo} className="logo" alt="a logo"/>
           <div className="footer-items">
              <div className="footer-title">
               <a href="/" className="footer-item">About Us</a>
               <a href="/" className="footer-item">Privacy Policy</a>
               <a href="/" className="footer-item">Terms and Condition</a>
              </div>
              <div>
               <p className="footer-item">&copy; 2025 sales-dashboard</p>
              </div>
           </div>
           <div className="footer-logo">
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-solid fa-phone"></i>
           </div>
        </div>
    )
}
export default Footer;