import { Link} from "react-router-dom";
import '../Styles/AboutCompany.scss'
import zaraDripsLogo from '../images/zaradrips-logo.jpeg'

function AboutHomepage() {
  return (
    <>
    <section className="about-us-main-section">
    <div className="about-company-section-place">

    <div className="our-logo">
     <img className="sitelogo" src={zaraDripsLogo} alt="" />
    </div>




    <div className="our-about-details">


      <div className="what-we-are">What we are</div>
       <div className="main-detail">
      We are a fast growing fashion store 
      with the intention of providing you with affordable
      unique, stylish clothes without breaking your pocket.
      At zaraDrips, we believe looking good should never 
      come at the expense of your pocket.

    </div>
    </div>
   

    </div>
    </section>
    
    </>
    
  );
}


const AboutCompany = () => {
  return (
    <>
    <AboutHomepage />
    </>
  );
};

export default AboutCompany;

