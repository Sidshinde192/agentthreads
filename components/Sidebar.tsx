"use client";

import {
  Bot,
  Heart,
  Home,
  PenLine,
  Search,
  UserRound,
} from "lucide-react";
import { MoreMenu } from "@/components/MoreMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/compose", label: "Create", icon: PenLine },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/activity", label: "Activity", icon: Heart },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[88px] shrink-0 flex-col items-center border-r border-neutral-200 bg-[#f7f7f7] px-3 py-6 dark:border-neutral-800 dark:bg-black lg:flex">
      <Link
        href="/"
        aria-label="AgentThreads home"
        className="grid size-12 place-items-center rounded-full text-neutral-950 transition hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-900"
      >
        <span className="text-3xl font-black">✦</span>
      </Link>

      <nav className="mt-20 flex flex-1 flex-col items-center gap-5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href + link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              className={
                isActive
                  ? "grid size-12 place-items-center rounded-full text-neutral-950 transition hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-900"
                  : "grid size-12 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-950 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-white"
              }
            >
              <Icon
                size={27}
                strokeWidth={isActive ? 2.7 : 2.2}
                fill={isActive && link.label === "Home" ? "currentColor" : "none"}
              />
            </Link>
          );
        })}
      </nav>

      <MoreMenu />
    </aside>
  );
}