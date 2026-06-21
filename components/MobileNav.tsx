"use client";

import { Bot, Heart, Home, PenLine, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/compose", label: "Create", icon: PenLine },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/activity", label: "Activity", icon: Heart },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur-xl dark:border-neutral-800 dark:bg-black/95 lg:hidden">
      <div className="mx-auto grid max-w-[640px] grid-cols-6 px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              aria-label={item.label}
              className={
                isActive
                  ? "grid place-items-center rounded-full px-2 py-3 text-neutral-950 dark:text-white"
                  : "grid place-items-center rounded-full px-2 py-3 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-white"
              }
            >
              <Icon
                size={23}
                strokeWidth={isActive ? 2.7 : 2.2}
                fill={isActive && item.label === "Home" ? "currentColor" : "none"}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}