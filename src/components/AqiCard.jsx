import React from 'react';

function AqiCard({ aqiData }) {
  return (
    <div className="card glass shadow-lg w-full max-w-lg mx-auto mt-4 transition-transform duration-300 hover:scale-105">
      <div className="card-body p-4">
        <h2 className="card-title text-2xl font-bold">Air Quality Index (AQI)</h2>
        <p className="text-lg"><strong>AQI:</strong> {aqiData.aqi}</p>
        <p className="text-lg"><strong>Description:</strong> {aqiData.description}</p>
      </div>
    </div>
  );
}

export default AqiCard;
