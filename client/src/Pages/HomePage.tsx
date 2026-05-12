// HomePage.tsx
// import shimiSmile from "../images/manOnWhite.png";
import '../Styles/HomePage.scss';
import { Link} from "react-router-dom";
import AboutCompany from './AboutCompany'
import OurPartners from './OurPartners';


function ProductGrid() {
  return (
    <>
    <section className="hero-background">
      
        <div className='left-homepg'>
         <div className='left-text'>
         <span className='proud'>We're Proud to</span>
           <span className='proud'>Introduce</span>
            <div className='left-big-text'>
              <span>An Exclusive Luxury Unique</span>
             <span>Designs and Styles</span>
             <span>You can Trust</span>
         </div>
          
       <Link to="/ProductList" className="shop-btnn">SHOP</Link>
           </div>
          </div> 
    </section>
    </>
    
  );
}

const HomePage = () => {
  return (
    <>
    <ProductGrid />
    <AboutCompany />
    <OurPartners />
    </>
  );
};

export default HomePage;
