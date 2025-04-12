import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.condition}
      />
      <p>{data.condition}</p>
      <p>{data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind Speed: {data.wind} m/s</p>
    </div>
  );
};

export default WeatherCard;