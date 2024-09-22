import React from 'react';

function TomorrowCard({ weatherData }) {
  return (
    <div className="card glass shadow-lg w-full max-w-lg mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title text-2xl">Tomorrow's Weather</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-4xl font-bold">{weatherData.temp}°C</h3>
            <p>{weatherData.description}</p>
          </div>
          <img
            alt="Weather icon"
            className="w-16"
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          />
        </div>
      </div>
    </div>
  );
}

export default TomorrowCard;
