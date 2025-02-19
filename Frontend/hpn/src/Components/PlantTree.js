import React from 'react';
import PlantTreeBackground from "../Assets/plant-tree-background.png";

const PlantTree = () => {
  const handleDonateClick = () => {
    window.open("https://www.givemetrees.org/", "_blank"); // Open in a new tab
  };

  return (
    <div className="plant-tree-section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
      <div className="plant-tree-section-text-container" style={{ flex: 1, padding: '20px' }}>
        <p className="primary-subheading"></p>
        <h1 className="primary-heading">Planting Trees to Save Our Planet</h1>
        <p className="primary-text">
          Trees are vital for a healthy environment. They help reduce carbon dioxide, provide oxygen, and support biodiversity.
          By donating, you can contribute to afforestation projects that restore degraded lands, combat climate change, and protect wildlife habitats.
        </p>
        <p className="primary-text">
          Join the movement and make a difference by planting a tree today. Every tree you help plant supports a greener future for generations to come.
        </p>
        <div className="plant-tree-buttons-container">
          <button className="secondary-button" onClick={handleDonateClick}>Donate</button>
        </div>
      </div>
      <div className="plant-tree-background-image-container" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={PlantTreeBackground} alt="Plant Tree Background" className="plant-tree-image" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

export default PlantTree;
