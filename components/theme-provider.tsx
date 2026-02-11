"use client";

import { useEffect } from "react";
import SunCalc from "suncalc";

interface IpLocation {
  lat: number;
  lon: number;
}

function isDaytime(lat: number, lng: number): boolean {
  const now = new Date();
  const times = SunCalc.getTimes(now, lat, lng);
  return now >= times.sunrise && now < times.sunset;
}

function updateFavicon(isDark: boolean) {
  const existingLink = document.querySelector(
    'link[rel="icon"]'
  ) as HTMLLinkElement | null;

  if (existingLink) {
    existingLink.href = isDark ? "/icon-dark.png" : "/icon-light.png";
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = isDark ? "/icon-dark.png" : "/icon-light.png";
    document.head.appendChild(link);
  }
}

function applyTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateFavicon(isDark);
}

async function getLocationFromIp(): Promise<IpLocation | null> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) return null;
    const data = await response.json();
    return { lat: data.latitude, lon: data.longitude };
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    async function initTheme() {
      const location = await getLocationFromIp();

      if (location) {
        // Apply theme based on sunrise/sunset
        const daytime = isDaytime(location.lat, location.lon);
        applyTheme(!daytime);

        // Check every minute for sunrise/sunset transitions
        intervalId = setInterval(() => {
          const daytime = isDaytime(location.lat, location.lon);
          applyTheme(!daytime);
        }, 60000);
      } else {
        // Fallback to system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        applyTheme(prefersDark);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
        mediaQuery.addEventListener("change", handler);

        return () => mediaQuery.removeEventListener("change", handler);
      }
    }

    initTheme();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return <>{children}</>;
}
