import React, { useState } from 'react';

const api_key = {
  key:"f948198259439d77c576cd1d9dca6820",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [city, setCity] = useState('Toronto');
  const [weather, setWeather] = useState({});

  const search = inc => {
    if (inc.key === "Enter") {
      fetch(`${api_key.base}weather?q=${city}&units=metric&APPID=${api_key.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('Toronto');
          console.log(result);
        });
    }
  }


  const getDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{getDate(new Date())}</div>
          </div> 
           
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c

            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
