export default function StatWidget({ emoji, label, value, accent, delay = 0 }) {
  return (
    <div className="stat-widget lg" style={{ animationDelay: `${delay}ms` }}>
      <span className="sw-emoji">{emoji}</span>
      <span className="sw-value" style={{ color: accent }}>{value}</span>
      <span className="sw-label">{label}</span>
    </div>
  );
}