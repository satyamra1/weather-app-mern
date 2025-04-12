import React, { useState, useEffect } from "react";
import axios from "axios";
import SBar from "./components/SearchBar";
import WCard from "./components/WeatherCard";
import FCard from "./components/ForecastCard";
import TTheme from "./components/ToggleTheme";
import "./App.css";
import "./theme.css";

function App() {
 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://weather-app-mern-pi.vercel.app/weather?city=${city}`);
      setWeather(res.data.current);
      setForecast(res.data.forecast);
      const updatedHistory = [city, ...history.filter((h) => h !== city)].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch (err) {
      setError("City not exist");
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Weather Report</h1>
      <TTheme theme={theme} setTheme={setTheme} />
      <SBar onSearch={handleSearch} />
      <br />
      <div className="history">
       <div className="headhis"> <h3>Recent Search</h3></div>
       <div className="his">
       {history.map((city, i) => (
          <button key={i} onClick={() => handleSearch(city)}>{city}</button>
        ))}
       </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    <div className="main-body">
    <WCard data={weather} />
    <FCard forecast={forecast} />
    </div>
    </div>
  );
}

export default App;
