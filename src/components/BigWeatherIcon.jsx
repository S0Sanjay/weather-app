const ICONS = {
  Clear:  "☀️",
  Clouds: "☁️",
  Rain:   "🌧️",
  Snow:   "❄️",
};

export default function BigWeatherIcon({ resolvedCondition, accent }) {
  const icon = ICONS[resolvedCondition] || "🌡️";

  return (
    <div className="icon-widget lg">
      <div className="big-icon" style={{ filter: `drop-shadow(0 0 28px ${accent}88)` }}>
        {icon}
      </div>
      <div className="icon-label">{resolvedCondition}</div>
    </div>
  );
}