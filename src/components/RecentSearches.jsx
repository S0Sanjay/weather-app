export default function RecentSearches({ searches, onSelect, onClear, accent }) {
  if (!searches.length) return null;

  return (
    <div className="recent-wrap lg">
      <div className="recent-header">
        <span className="recent-title">Recent Searches</span>
        <button className="recent-clear" onClick={onClear}>Clear</button>
      </div>
      <div className="recent-list">
        {searches.map((city) => (
          <button
            key={city}
            className="recent-chip"
            style={{ "--chip-accent": accent }}
            onClick={() => onSelect(city)}
          >
            🕐 {city}
          </button>
        ))}
      </div>
    </div>
  );
}