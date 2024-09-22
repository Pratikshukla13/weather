import React from 'react';

function ThisWeekCard({ weatherData }) {
  return (
    <div className="card bg-blue-100 shadow-lg w-full max-w-lg mx-auto mt-4">
      <div className="card-body">
        <h2 className="card-title text-2xl">This Week's Weather</h2>
        {weatherData.map((day, index) => (
          <div key={index} className="mt-4">
            <p><strong>{day.date}:</strong> {day.temp}°C, {day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThisWeekCard;
