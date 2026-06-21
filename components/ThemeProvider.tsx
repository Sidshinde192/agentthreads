"use client";

import { useEffect } from "react";

function applyTheme(theme: string) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("agentthreads-theme") || "auto";
    applyTheme(savedTheme);
  }, []);

  return <>{children}</>;
}

export { applyTheme };