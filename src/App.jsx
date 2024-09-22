import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TodayCard from './components/TodayCard';
import TomorrowCard from './components/TommorowCard';
import ThisWeekCard from './components/ThisWeek';
import HourlyCard from './components/HourlyCard';
import AqiCard from './components/AqiCard';

function App() {
  const [selectedView, setSelectedView] = useState('today');
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [city, setCity] = useState('');
  const [bgImage, setBgImage] = useState('url(/images/default.jpg)'); // Default background image

  useEffect(() => {
    if (weatherData) {
      let image;
      switch (weatherData.description) {
        case 'clear sky':
          image = 'url(/images/clearsky.jpeg)'; // Add path to your clear sky image
          break;
        case 'few clouds':
          image = 'url(/images/fewclouds.jpeg)'; // Add path to your few clouds image
          break;
        case 'broken clouds':
          image = 'url(/images/brokenclouds.jpeg)'; // Add path to your broken clouds image
          break;
        case 'rain':
          image = 'url(/images/rainy.jpeg'; // Add path to your rain image
          break;
        case 'thunderstorm':
          image = 'url(/images/thunder.jpeg)'; // Add path to your thunderstorm image
          break;
        case 'snow':
          image = 'url(/images/snow.jpeg)'; // Add path to your snow image
          break;
        case 'mist':
          image = 'url(/images/mist.jpeg)'; // Add path to your mist image
          break;
        default:
          image = 'url(/images/default.jpeg)'; // Default background image
      }
      setBgImage(image);
    }
  }, [weatherData]);

  const fetchWeatherData = async (city) => {
    try {
      const API_KEY = '05eeaed8a8852d7e2d2a545789e3bcac';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
          city: data.name,
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
        fetchHourlyData(data.coord.lat, data.coord.lon);
        fetchWeeklyData(data.coord.lat, data.coord.lon);
        fetchAQIData(data.coord.lat, data.coord.lon);
      } else {
        console.error('Error fetching weather data:', data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchHourlyData = async (lat, lon) => {
    try {
      const API_KEY = '05eeaed8a8852d7e2d2a545789e3bcac';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        const hourly = data.list.slice(0, 8).map(item => ({
          time: new Date(item.dt * 1000).toLocaleTimeString(),
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));
        setHourlyData(hourly);
      } else {
        console.error('Error fetching hourly data:', data);
      }
    } catch (error) {
      console.error('Error fetching hourly data:', error);
    }
  };

  const fetchWeeklyData = async (lat, lon) => {
    try {
      const API_KEY = '05eeaed8a8852d7e2d2a545789e3bcac';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        const weekly = data.daily.map(day => ({
          date: new Date(day.dt * 1000).toLocaleDateString(),
          temp: day.temp.day,
          description: day.weather[0].description,
        }));
        setWeatherData(prevData => ({ ...prevData, week: weekly }));
      } else {
        console.error('Error fetching weekly data:', data);
      }
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  };

  const fetchAQIData = async (lat, lon) => {
    try {
      const API_KEY = '05eeaed8a8852d7e2d2a545789e3bcac';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const data = await response.json();
      if (response.ok) {
        const aqi = data.list[0].main.aqi;
        const description = aqi === 1 ? 'Good' :
          aqi === 2 ? 'Fair' :
          aqi === 3 ? 'Moderate' :
          aqi === 4 ? 'Poor' : 'Very Poor';
        setWeatherData(prevData => ({ ...prevData, aqi: { aqi, description } }));
      } else {
        console.error('Error fetching AQI data:', data);
      }
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    }
  };

  const handleSearch = (city) => {
    setCity(city);
    fetchWeatherData(city);
  };

  return (
    <div className="min-h-screen" style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar setSelectedView={setSelectedView} onSearch={handleSearch} />
      <div className="p-4">
        {selectedView === 'today' && weatherData && (
          <div className="flex flex-col md:flex-row gap-4">
            {/* Vertical Stack for Smaller Cards */}
            <div className="flex flex-col space-y-4 w-full md:w-1/3 lg:w-1/4">
              <TodayCard weatherData={weatherData} />
              {weatherData.aqi && <AqiCard aqiData={weatherData.aqi} />}
            </div>
            {/* Larger Card */}
            {hourlyData.length > 0 && (
              <div className="w-full md:w-2/3 lg:w-3/4">
                <HourlyCard hourlyData={hourlyData} />
              </div>
            )}
          </div>
        )}
        {selectedView === 'tomorrow' && weatherData && <TomorrowCard weatherData={weatherData} />}
        {selectedView === 'thisWeek' && weatherData?.week && <ThisWeekCard weatherData={weatherData.week} />}
      </div>
    </div>
  );
}

export default App;
