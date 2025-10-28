
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer text-white text-center py-3 foot">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@Zaraboutique.com</p>
            <p>Phone: +123 9061 8305 93</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about-page" className="text-white">About Us</Link></li>
              <li><Link to="/services" className="text-white">Services</Link></li>
              <li><Link to="/contact" className="text-white">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div>
              <div>Instagram</div>
              <div>TikTok</div>
              <div>facebook</div>
              
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
