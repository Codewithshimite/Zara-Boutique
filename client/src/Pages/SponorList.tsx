import React from 'react';
import '../Styles/SponsorList.scss'
import princeBoutique from "../images/princeB.jpeg"
import NjcGlobal from "../images/njcGLobal.jfif"
import beadByteemah from '../images/beadByTeemah.jpg'
import niaNexus from '../images/NiaNezus.webp'

const sponsors = [
  { id: 1, name: 'Prince Boutique', logo: princeBoutique },
  { id: 2, name: 'Njc Global', logo: NjcGlobal },
  { id: 3, name: 'Bead by Thema', logo: beadByteemah},
  { id: 4, name: 'Rema Collections', logo: niaNexus },
];


const SponsorList = () => {
  return (
    <div className="sponsor-container">
      <h2 className="sponsor-title">Our Trusted Partners</h2>
      <div className="sponsor-grid">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-card">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name}`} 
              className="sponsor-logo" 
            />
            <div>{sponsor.name} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorList;



