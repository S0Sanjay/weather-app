import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { getTheme, DEFAULT_THEME, playSound } from "./themes";
import WeatherDashboard from "./components/WeatherDashboard";
import RecentSearches   from "./components/RecentSearches";

const API_KEY = "87127698fe81e3c04d5ca01a526cbc15";
const API_URL = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

const MAX_RECENT = 5;

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [query,   setQuery]   = useState("");
  const [theme,   setTheme]   = useState(DEFAULT_THEME);
  const [recent,  setRecent]  = useState(() => {
    try { return JSON.parse(localStorage.getItem("atmos_recent") || "[]"); }
    catch { return []; }
  });

  const videoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("atmos_recent", JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
  }, [theme.video]);

  const addRecent = (city) => {
    setRecent((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, MAX_RECENT);
    });
  };

  const fetchWeather = async (city) => {
    setLoading(true); setError(""); setWeather(null);
    try {
      const { data } = await axios.get(API_URL(city));
      const condition = data.weather[0].main;
      const temp = data.main.temp;
      setWeather(data);
      setTheme(getTheme(condition, temp));
      addRecent(data.name);
      playSound(condition, temp);
    } catch (err) {
      const msg = err?.response?.data?.message;
      setError(
        msg === "city not found"
          ? `City "${city}" not found. Please check the spelling.`
          : "Unable to fetch weather. Check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) { fetchWeather(query.trim()); setQuery(""); }
  };

  return (
    <>
      {theme.video && (
        <video ref={videoRef} className="bg-video" autoPlay loop muted playsInline>
          <source src={theme.video} type="video/mp4" />
        </video>
      )}
      <div className="bg-overlay" />

      <div className="app-shell">

        <header className="top-bar">
          <div className="brand">
            <span className="brand-accent" style={{ color: theme.accent }}>Atmos</span>
            <span className="brand-sub">Weather</span>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search city…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              autoComplete="off"
            />
            <button
              className="search-btn"
              type="submit"
              disabled={loading || !query.trim()}
            >
              {loading ? <span className="spin" /> : "Search"}
            </button>
          </form>
        </header>

        <main className="dashboard">

          {error && (
            <div className="error-bar" role="alert">⚠️ {error}</div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="loader" />
              <p>Fetching weather…</p>
            </div>
          )}

          {!weather && !loading && !error && (
            <div className="empty-state">
              <div className="empty-globe">🌍</div>
              <p>Search a city to see live weather</p>
              <RecentSearches
                searches={recent}
                onSelect={fetchWeather}
                onClear={() => setRecent([])}
                accent={theme.accent}
              />
            </div>
          )}

          {weather && (
            <WeatherDashboard
              weather={weather}
              theme={theme}
              recent={recent}
              onSelect={fetchWeather}
              onClear={() => setRecent([])}
            />
          )}

        </main>
      </div>
    </>
  );
}