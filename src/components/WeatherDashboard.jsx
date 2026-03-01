import LiveClock      from "./LiveClock";
import BigWeatherIcon from "./BigWeatherIcon";
import StatWidget     from "./StatWidget";
import RecentSearches from "./RecentSearches";
import { getResolvedCondition } from "../themes";

export default function WeatherDashboard({ weather, theme, recent, onSelect, onClear }) {
  const w = weather;
  const { accent, accent2 } = theme;

  const resolvedCondition = getResolvedCondition(
    w.weather[0].main,
    w.main.temp
  );

  return (
    <div className="grid">

      <LiveClock accent={accent} />

      <BigWeatherIcon resolvedCondition={resolvedCondition} accent={accent} />

      <div className="hero-widget lg">
        <div className="hero-city">
          {w.name}
          <span className="hero-country">, {w.sys.country}</span>
        </div>
        <div className="hero-temp" style={{ color: accent }}>
          {Math.round(w.main.temp)}°<span className="hero-unit">C</span>
        </div>
        <div className="hero-desc">{w.weather[0].description}</div>
        <div className="hero-feels">Feels like {Math.round(w.main.feels_like)}°C</div>
        <div className="hero-range">
          <span style={{ color: accent2 }}>↓ {Math.round(w.main.temp_min)}°</span>
          &nbsp;/&nbsp;
          <span style={{ color: accent }}>↑ {Math.round(w.main.temp_max)}°</span>
        </div>
      </div>

      <StatWidget emoji="💧" label="Humidity"   value={`${w.main.humidity}%`}                    accent={accent} delay={0}   />
      <StatWidget emoji="💨" label="Wind Speed" value={`${w.wind.speed} m/s`}                    accent={accent} delay={60}  />
      <StatWidget emoji="📊" label="Pressure"   value={`${w.main.pressure} hPa`}                 accent={accent} delay={120} />
      <StatWidget emoji="👁️" label="Visibility" value={`${(w.visibility/1000).toFixed(1)} km`}   accent={accent} delay={180} />
      <StatWidget emoji="🌬️" label="Wind Dir"   value={`${w.wind.deg}°`}                         accent={accent} delay={240} />
      <StatWidget emoji="☁️" label="Cloudiness" value={`${w.clouds.all}%`}                       accent={accent} delay={300} />

      <div className="full-width">
        <RecentSearches
          searches={recent}
          onSelect={onSelect}
          onClear={onClear}
          accent={accent}
        />
      </div>

    </div>
  );
}