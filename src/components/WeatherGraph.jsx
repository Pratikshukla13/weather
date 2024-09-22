// WeatherGraph.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

const WeatherGraph = ({ city }) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=05eeaed8a8852d7e2d2a545789e3bcac&units=metric`);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const temperatureData = result.list.map(item => item.main.temp);
        const timeLabels = result.list.map(item => new Date(item.dt_txt).toLocaleTimeString());

        setData(temperatureData);
        setLabels(timeLabels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: '#fff',
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Temperature: ${tooltipItem.raw}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        beginAtZero: true,
      },
    },
  };

  const containerStyle = {
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const messageStyle = {
    fontSize: '1rem',
    color: '#666',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Weather Graph for {city}</h2>
      {loading && <p style={messageStyle}>Loading...</p>}
      {error && <p style={messageStyle}>Error: {error}</p>}
      {!loading && !error && <Line data={chartData} options={chartOptions} />}
    </div>
  );
};

export default WeatherGraph;
