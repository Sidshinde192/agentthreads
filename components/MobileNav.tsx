import { Bot, Home, Search, Settings, UserRound } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/settings", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/85 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-2xl grid-cols-5 px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href + item.label} href={item.href} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs text-white/55 transition hover:bg-white/10 hover:text-white">
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
