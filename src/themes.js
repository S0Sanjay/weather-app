import clearVideo from "./assets/clear.mp4";
import cloudsVideo from "./assets/clouds.mp4";
import rainVideo from "./assets/rain.mp4";
import snowVideo from "./assets/snow.mp4";

import clearSound from "./assets/clear.mp3";
import cloudsSound from "./assets/clouds.mp3";
import rainSound from "./assets/rain.mp3";
import snowSound from "./assets/snow.mp3";

const THEMES = {
  Clear: {
    video: clearVideo,
    sound: clearSound,
    accent: "#f97316",
    accent2: "#fbbf24",
  },
  Clouds: {
    video: cloudsVideo,
    sound: cloudsSound,
    accent: "#94a3b8",
    accent2: "#cbd5e1",
  },
  Rain: {
    video: rainVideo,
    sound: rainSound,
    accent: "#60a5fa",
    accent2: "#93c5fd",
  },
  Snow: {
    video: snowVideo,
    sound: snowSound,
    accent: "#bfdbfe",
    accent2: "#e0f2fe",
  },
};

const FALLBACK = {
  Drizzle: "Rain",
  Thunderstorm: "Rain",
  Mist: "Clouds",
  Smoke: "Clouds",
  Haze: "Clear",
  Fog: "Clouds",
  Dust: "Clear",
  Sand: "Clear",
  Ash: "Clouds",
  Squall: "Rain",
  Tornado: "Rain",
};

export const DEFAULT_THEME = {
  video: null,
  sound: null,
  accent: "#fff",
  accent2: "#e2e8f0",
};

export const getTheme = (condition, temp = null) => {
  if (temp !== null && temp < 0) return THEMES.Snow;
  return THEMES[condition] ?? THEMES[FALLBACK[condition]] ?? DEFAULT_THEME;
};

let currentAudio = null;

export function playSound(condition, temp = null) {
  const theme = getTheme(condition, temp);
  if (!theme.sound) return;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(theme.sound);
  currentAudio.volume = 0.5;
  currentAudio.play().catch(() => {});
}

export function getResolvedCondition(condition, temp = null) {
  if (temp !== null && temp < 0) return "Snow";
  if (THEMES[condition]) return condition;
  return FALLBACK[condition] || "Clear";
}
