import axios from 'axios';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { WiHumidity } from 'react-icons/wi';
import Clear from './assets/clear.png';
import Clouds from './assets/cloudy.png';
import Haze from './assets/haze.png';
import Mist from './assets/mist.png';
import Rain from './assets/rain.png';
import Snow from './assets/snowy.png';

const weatherIcons = {
  Clear: './src/assets/clear.png',
  Rain: './src/assets/rain.png',
  Snow: './src/assets/snowy.png',
  Clouds: './src/assets/cloudy.png',
  Mist: './src/assets/mist.png',
  Haze: './src/assets/haze.png',
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const apiKey = '848dadbc4ca3012bad1a2ff471376a24';
  const searchInputRef = React.createRef();

  const getWeather = () => {
    const city = searchInputRef.current.value;
    setLoading(true);
    setError(false);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-primary">
      {/* Weather Container */}
      <div className="w-full max-w-md px-8 py-6 rounded-xl flex flex-col items-center bg-white gap-6">
        {/* Search Bar */}
        <div className="w-full relative flex items-center">
          <span className="absolute left-4 text-primary text-2xl">
            <HiLocationMarker />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="w-full px-12 py-3 bg-slate-200 rounded-full placeholder:text-black outline-none text-lg capitalize"
          />
          <span
            onClick={getWeather}
            className="absolute right-4 p-1 rounded-full text-primary text-2xl cursor-pointer transition ease-in-out duration-300 hover:bg-primary hover:text-white"
          >
            <BiSearch />
          </span>
        </div>

        {/* Weather Box */}
        {loading && <p>Loading...</p>}
        {weather && !error && (
          <div className="w-full flex flex-col items-center gap-6">
            <img
              id="weather-img"
              src={weatherIcons[weather.weather[0].main]}
              alt={weather.weather[0].main}
              className="w-48 inline-block"
            />
            <div className="text-center">
              <p
                id="weather-temp"
                className="font-semibold text-4xl text-primary"
              >
                {parseInt(weather.main.temp)}
                <span>°C</span>
              </p>
              <p
                id="weather-desc"
                className="font-semibold text-xl text-primary"
              >
                {weather.weather[0].main}
              </p>
            </div>
            <div className="w-full flex items-center">
              <div className="w-full flex justify-center items-center gap-1">
                <WiHumidity size={32} />
                <div className="text-start">
                  <p id="weather-humidity" className="text-sm">
                    {weather.main.humidity}
                    <span> %</span>
                  </p>
                  <p className="text-xs">Humidity</p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-1">
                <FiWind size={32} />
                <div className="text-start">
                  <p id="weather-wind-speed" className="text-sm">
                    {weather.wind.speed} <span> km/h</span>
                  </p>
                  <p className="text-xs">Wind speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="w-full flex flex-col items-center justify-center gap-6">
            <img src="/404.svg" alt="404 not found" className="w-80 inline" />
            <div className="text-center">
              <h2 className="font-bold text-4xl text-primary">404</h2>
              <p className="font-normal text-xl text-primary">
                Please try again!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
