// src/components/WeatherOverviewCard.jsx
import React from 'react';

const WeatherOverviewCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/2">
      <h2 className="text-xl font-semibold mb-2">Weather Overview</h2>
      <div className="flex flex-col items-center">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} 
          alt="Weather Icon" 
          className="w-20 h-20 mb-2"
        />
        <p className="text-4xl font-bold">{weatherData.temp}°C</p>
        <p className="text-lg">{weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}</p>
        <div className="mt-4">
          <p className="text-sm">Humidity: {weatherData.humidity}%</p>
          <p className="text-sm">Sunrise: {weatherData.sunrise}</p>
          <p className="text-sm">Sunset: {weatherData.sunset}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherOverviewCard;
