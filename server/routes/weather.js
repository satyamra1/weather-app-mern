const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentUrl),
      axios.get(forecastUrl)
    ]);

    const weather = {
      temperature: currentRes.data.main.temp,
      condition: currentRes.data.weather[0].main,
      wind: currentRes.data.wind.speed,
      icon: currentRes.data.weather[0].icon,
      humidity: currentRes.data.main.humidity,
      city: currentRes.data.name,
    };

    const forecast = forecastRes.data.list.filter((_, i) => i % 8 === 0).map(f => ({
      date: f.dt_txt.split(' ')[0],
      temperature: f.main.temp,
      icon: f.weather[0].icon,
      condition: f.weather[0].main
    }));

    res.json({ current: weather, forecast });
  } catch (err) {
    res.status(500).json({ error: "City not found" });
  }
});

module.exports = router;