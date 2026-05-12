
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Footer.scss";
import ContactForm from '../Pages/ContactForm'
import footerLogo from '../images/zaradrips-logo.jpeg'
import original from '../images/Original.png'
import flag from '../images/nigFLag.jpg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
           <ContactForm/>
          </div>
          <div className="col-md-4">
            <h5>Site Map</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/ProductList" className="text-white">Shop</Link></li>
              <li><Link to="about-page" className="text-white">About Us</Link></li>
              <li><Link to="/services" className="text-white">Services</Link></li>
              <li><Link to="/blog-page" className="text-white">Blog</Link></li>
              <li><Link to="/wishlist" className="text-white">Wishlist</Link></li>
              <li><Link to="/customer/profile" className="text-white">Account</Link></li>
              <li><Link to="/cart" className="text-white">Cart</Link></li>
              
              
            </ul>
            <div className="footer-images-logo-dive">
              <img className="footer-logo"  src={footerLogo} alt="page logo" />
              <img className="footer-logo"  src={original} alt="page logo" />
              <img className="footer-logo"  src={flag} alt="page logo" />
            </div>
            
            
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div>
              <div><i className="fa-brands fa-instagram"></i></div>
              <div><i className="fa-brands fa-tiktok"></i></div>
              <div><i className="fa-brands fa-facebook"></i></div>
              <div>Give Us a call</div>
              <div><i className="fa-solid fa-phone"> &nbsp;+234-9061830593</i></div>

            </div>
          </div>
          
        </div>
        <hr className="my-3" />
        <p className="mb-0">&copy; {new Date().getFullYear()} ZaraDrips. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
