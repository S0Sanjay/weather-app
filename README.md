# 🌤️ Atmos Weather App

A responsive real-time weather dashboard built with React and Vite. Displays live weather data with dynamic video backgrounds, liquid glass UI, sound effects, and recent search history.

🔗 **Live Demo:** [https://weather-app.vercel.app](https://weather-app.vercel.app)

---

## Features

- 🔍 Search any city worldwide
- 🎬 Dynamic video background changes based on weather condition
- 🔊 Sound effects play automatically on search
- ❄️ Sub-zero temperatures always show Snow video
- 🕐 Live clock with date
- 🕘 Recent searches (last 5 cities, saved in localStorage)
- 📊 Weather stats — humidity, wind, pressure, visibility, cloudiness
- 📱 Fully responsive (desktop → tablet → mobile)

---

## Tech Stack

- **React** — UI
- **Vite** — Build tool
- **Axios** — API requests
- **OpenWeatherMap API** — Weather data
- **HTML5 Audio** — Sound effects
- **CSS** — Liquid Glass styling

---

## Project Structure

```
src/
├── assets/
│   ├── clear.mp4
│   ├── clouds.mp4
│   ├── rain.mp4
│   ├── snow.mp4
│   ├── clear.mp3
│   ├── clouds.mp3
│   ├── rain.mp3
│   └── snow.mp3
├── components/
│   ├── WeatherDashboard.jsx
│   ├── LiveClock.jsx
│   ├── BigWeatherIcon.jsx
│   ├── StatWidget.jsx
│   └── RecentSearches.jsx
├── WeatherApp.jsx
├── themes.js
└── index.css
```

---

## Weather Condition Mapping

All 15 possible OpenWeatherMap conditions are handled:

| API Condition | Video | Icon |
|---|---|---|
| Clear | clear.mp4 | ☀️ |
| Clouds | clouds.mp4 | ☁️ |
| Rain | rain.mp4 | 🌧️ |
| Drizzle | rain.mp4 | 🌧️ |
| Thunderstorm | rain.mp4 | 🌧️ |
| Squall / Tornado | rain.mp4 | 🌧️ |
| Snow | snow.mp4 | ❄️ |
| Mist / Fog / Smoke / Ash | clouds.mp4 | ☁️ |
| Haze / Dust / Sand | clear.mp4 | ☀️ |
| **Any + temp below 0°C** | snow.mp4 | ❄️ |

---
