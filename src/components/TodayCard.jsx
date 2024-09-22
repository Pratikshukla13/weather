import React from 'react';

function TodayCard({ weatherData, city }) {
  return (
    <div className="card glass shadow-lg w-full max-w-lg mx-auto mt-4">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">{city}</h1>
        <h2 className="card-title text-2xl">Today's Weather</h2>
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
        <div className="mt-4">
          <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
          <p><strong>Sunrise:</strong> {weatherData.sunrise}</p>
          <p><strong>Sunset:</strong> {weatherData.sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
