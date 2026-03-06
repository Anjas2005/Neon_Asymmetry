import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import TShirtCard from '../components/TShirtCard'; // Import the new component
import './home.css';

const HomePage = () => {
  const [tshirts, setTshirts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/stock/tshirts/')
      .then(res => setTshirts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="glitch-text" data-text="NEON ASYMMETRY">
            NEON <span className="highlight">ASYMMETRY</span>
          </h1>
          <p className="subtitle">CHAOS // CODE // COUTURE</p>
          
          <div className="hero-buttons">
            <button className="btn-explore" onClick={() => window.scrollTo(0, 800)}>
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT GRID */}
      <main className="container">
        <div className="section-header">
          <h2>LATEST DROP</h2>
          <div className="line"></div>
        </div>

        {tshirts.map((shirt, index) => (
          <TShirtCard 
            key={shirt.id} 
            shirt={shirt} 
            index={index} 
          />
        ))}
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2026 NEON ASYMMETRY</p>
      </footer>
    </div>
  );
};

export default HomePage;
