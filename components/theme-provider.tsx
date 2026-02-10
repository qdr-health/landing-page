"use client";

import { useEffect, useCallback } from "react";
import SunCalc from "suncalc";

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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const updateThemeFromLocation = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const daytime = isDaytime(latitude, longitude);
      applyTheme(!daytime);
    },
    []
  );

  const fallbackToSystemPreference = useCallback(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(prefersDark);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let intervalId: NodeJS.Timeout | undefined;

    if (!("geolocation" in navigator)) {
      cleanup = fallbackToSystemPreference();
      return () => cleanup?.();
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Initial theme update
        updateThemeFromLocation(position);

        // Check every minute for sunrise/sunset transitions
        intervalId = setInterval(() => {
          updateThemeFromLocation(position);
        }, 60000);
      },
      () => {
        // Geolocation denied or failed - fall back to system preference
        cleanup = fallbackToSystemPreference();
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 3600000, // Cache position for 1 hour
      }
    );

    return () => {
      cleanup?.();
      if (intervalId) clearInterval(intervalId);
    };
  }, [updateThemeFromLocation, fallbackToSystemPreference]);

  return <>{children}</>;
}
