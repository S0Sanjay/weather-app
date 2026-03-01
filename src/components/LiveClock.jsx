import { useState, useEffect } from "react";

export default function LiveClock({ accent }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div className="clock-widget lg">
      <div className="clock-time" style={{ color: accent }}>{time}</div>
      <div className="clock-date">{date}</div>
    </div>
  );
}