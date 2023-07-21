import axios from 'axios';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { HiLocationMarker } from 'react-icons/hi';
import { WiHumidity } from 'react-icons/wi';

const App = () => {
  const apiKey = '848dadbc4ca3012bad1a2ff471376a24';

  const getWeather = () => {
    const city = document.getElementById('search').value;

    const weatherBox = document.getElementById('weather-box');
    const notFound = document.getElementById('not-found');

    const image = document.getElementById('weather-img');
    const temperature = document.getElementById('weather-temp');
    const description = document.getElementById('weather-desc');
    const humidity = document.getElementById('weather-humidity');
    const windSpeed = document.getElementById('weather-wind-speed');

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        switch (response.data.weather[0].main) {
          case 'Clear':
            image.src = '/clear.png';
            break;

          case 'Rain':
            image.src = '/rain.png';
            break;

          case 'Snow':
            image.src = '/snowy.png';
            break;

          case 'Clouds':
            image.src = '/cloudy.png';
            break;

          case 'Mist':
            image.src = '/mist.png';
            break;

          case 'Haze':
            image.src = '/haze.png';
            break;

          default:
            image.src = '';
        }
        // Temperature
        temperature.innerHTML = `${parseInt(
          response.data.main.temp
        )}<span>°C</span>`;
        // Weather Description
        description.innerHTML = `${response.data.weather[0].main}`;
        // Humidity
        humidity.innerHTML = `${response.data.main.humidity}<span> %</span>`;
        // Wind Speed
        windSpeed.innerHTML = `${response.data.wind.speed} <span> km/h</span>`;

        weatherBox.classList.add('flex');
        weatherBox.classList.remove('hidden');
        notFound.classList.add('hidden');
        notFound.classList.remove('flex');
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          weatherBox.classList.add('hidden');
          weatherBox.classList.remove('flex');
          notFound.classList.add('flex');
          notFound.classList.remove('hidden');
        }
      });
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-primary">
        {/* Weather Container */}
        <div className="w-full max-w-md px-8 py-6 rounded-xl flex flex-col items-center bg-white gap-6">
          {/* Search Bar */}
          <div className="w-full relative flex items-center">
            <span className="absolute left-4 text-primary text-2xl">
              <HiLocationMarker />
            </span>
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="w-full px-12 py-3 bg-slate-200 rounded-full placeholder:text-black outline-none text-lg capitalize"
            />
            <span
              onClick={() => getWeather()}
              className="absolute right-4 p-1 rounded-full text-primary text-2xl cursor-pointer transition ease-in-out duration-300 hover:bg-primary hover:text-white"
            >
              <BiSearch />
            </span>
          </div>

          {/* Weather Box */}
          {/* Status 200 */}
          <div
            id="weather-box"
            className="w-full hidden flex-col items-center gap-6 transition-all ease-in-out duration-500"
          >
            <img id="weather-img" src="" alt="" className="w-48" />
            <div className="text-center">
              <p
                id="weather-temp"
                className="font-semibold text-4xl text-primary"
              ></p>
              <p
                id="weather-desc"
                className="font-semibold text-xl text-primary"
              ></p>
            </div>
            <div className="w-full flex items-center">
              <div className="w-full flex justify-center items-center gap-1">
                <WiHumidity size={32} />
                <div className="text-start">
                  <p id="weather-humidity" className="text-sm"></p>
                  <p className="text-xs">Humidity</p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-1">
                <FiWind size={32} />
                <div className="text-start">
                  <p id="weather-wind-speed" className="text-sm"></p>
                  <p className="text-xs">Wind speed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status 404 */}
          <div
            id="not-found"
            className="w-full hidden flex-col justify-center items-center gap-6"
          >
            <img src="/404.svg" alt="404 not found" className="w-80" />
            <div className="text-center">
              <h2 className="font-bold text-4xl text-primary">404</h2>
              <p className="font-normal text-xl text-primary">
                Please try again!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
