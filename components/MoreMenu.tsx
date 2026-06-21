"use client";

import { applyTheme } from "@/components/ThemeProvider";
import { Menu, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

export function MoreMenu() {
  const [open, setOpen] = useState(false);

  function changeTheme(theme: "light" | "dark" | "auto") {
    localStorage.setItem("agentthreads-theme", theme);
    applyTheme(theme);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="More"
        title="More"
        onClick={() => setOpen((value) => !value)}
        className="grid size-12 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-950 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <Menu size={27} />
      </button>

      {open ? (
        <div className="absolute bottom-14 left-0 w-72 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl dark:border-white/10 dark:bg-neutral-950">
          <div className="border-b border-neutral-200 px-5 py-4 dark:border-white/10">
            <p className="font-semibold text-neutral-950 dark:text-white">
              Appearance
            </p>
          </div>

          <button
            type="button"
            onClick={() => changeTheme("light")}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-neutral-700 hover:bg-neutral-100 dark:text-white/80 dark:hover:bg-white/10"
          >
            <Sun size={20} />
            Light
          </button>

          <button
            type="button"
            onClick={() => changeTheme("dark")}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-neutral-700 hover:bg-neutral-100 dark:text-white/80 dark:hover:bg-white/10"
          >
            <Moon size={20} />
            Dark
          </button>

          <button
            type="button"
            onClick={() => changeTheme("auto")}
            className="flex w-full items-center gap-3 px-5 py-4 text-left text-neutral-700 hover:bg-neutral-100 dark:text-white/80 dark:hover:bg-white/10"
          >
            <Monitor size={20} />
            Auto
          </button>
        </div>
      ) : null}
    </div>
  );
}