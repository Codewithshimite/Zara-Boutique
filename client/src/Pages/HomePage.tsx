// HomePage.tsx
import sweater from '../images/sweater.jpg';
import tshirt from '../images/T-shirt-removebg-preview.png';
import balenciaga from '../images/Balenciaga.png';
import balLogo from '../images/Bal-logo.png';
import cartoonParms from "../images/cartom-parm-removebg-preview.png"
import fog from "../images/fearOFGOD.png"
import '../Styles/HomePage.scss';

function HeroSection() {
  return (
    <section className="text-center mt-5 background-image-div container-fluid">
      <h1 className="welcome-message first-message">
        Where fashion meets your finest{' '}
        <span className="text-shadow-pop-top">drip</span>
      </h1>
      <p className="welcome-message">
        Explore our latest collections of fashion items.
      </p>
    </section>
  );
}

function ProductGrid() {
  return (
    <section className="flex-container">
      {/* Left text block */}
      <div className="grid-flex-items first-demacation">
        <div className="demac-a">
          <img
          src={fog}
          className="fog slide-in-blurred-top"
          alt="fog"
        />
        </div>
        <div className="demac-b">
         <img
          src={cartoonParms}
          className="slide-parm slide-in-elliptic-right-fwd"
          alt="sweater"
        />


        </div>
      </div>

      {/* Sweater image */}
      <div className="grid-flex-items middle-flex">
        <img
          src={sweater}
          className="sweater roll-in-left-sweater"
          alt="sweater"
        />
      </div>

      {/* Shoes + T-shirt */}
      <div className="grid-flex-items sec-container">
        <div className="sec3-a">
          <div className="shoe-one">
            <img
              src={balenciaga}
              className="slide-in-blurred-top shoe-main"
              alt="balenciaga shoe"
            />
          </div>
          <div className="shoe-two">
            <img src={balLogo} className="bal-logo" alt="balenciaga logo" />
          </div>
        </div>
        <div className="sec3-b">
          <img
            className="t-shirt slide-in-elliptic-right-fwd"
            src={tshirt}
            alt="t-shirt"
          />
        </div>
      </div>
    </section>
  );
}

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ProductGrid />
    </>
  );
};

export default HomePage;
