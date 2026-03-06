import React from 'react';
import './TShirtCard.css';

const TShirtCard = ({ shirt, index }) => {
  return (
    <article 
      className="card" 
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="image-wrapper">
        <img src={shirt.image} alt={shirt.collection_name} loading="lazy" />
        <div className="overlay"></div>
      </div>

      <div className="details">
        <div className="info-row">
          <span className="badge">{shirt.size}</span>
          <span className={`stock ${shirt.instock === 0 ? 'out' : ''}`}>
            {shirt.instock > 0 ? `// ${shirt.instock} LEFT` : "SOLD OUT"}
          </span>
        </div>

        <h3 className="title">{shirt.collection_name}</h3>
        <div className="price-row">
          <p className="price">${shirt.price}</p>
          <button className="btn-add">Add +</button>
        </div>
      </div>
    </article>
  );
};

export default TShirtCard;
