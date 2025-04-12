import React from "react";

const ForecastCard = ({ forecast }) => {
  return (
    <div className="forecast">
      {forecast.map((day, i) => (
        <div key={i} className="forecast-day">
          <h4>{day.date}</h4>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.condition}
          />
          <p>{day.temperature}°C</p>
          <p>{day.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;