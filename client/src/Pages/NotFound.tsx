import ironMan from "../images/ironman-removebg-preview.png"
import "../Styles/NotFound.scss"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {/* <h1>OPPS!</h1> */}
      <h2><img src={ironMan} alt="iron-man-image" className="iron-man" /></h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p><a href="/"><i className="fas fa-arrow-left"></i> Back to Home</a></p>
      
    </div>
  );
};

export default NotFound;


