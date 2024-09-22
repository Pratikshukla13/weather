import React from 'react';

function HourlyCard({ hourlyData }) {
  return (
    <div className="card glass shadow-lg w-full max-w-lg mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title text-2xl">Hourly Forecast</h2>
        <div className="flex flex-col">
          {hourlyData.map((hour, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <p><strong>{hour.time}:</strong> {hour.temp}°C, {hour.description}</p>
              <img
                alt="Weather icon"
                className="w-10"
                src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              />
            </div>
          ))}
          {/* Placeholder for Graph */}
          <div className="mt-4">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourlyCard;
