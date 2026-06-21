import { Bot, Home, PenLine, Search, Settings, UserRound } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/", label: "Create", icon: PenLine },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/settings", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-[640px] grid-cols-6 px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              aria-label={item.label}
              className="grid place-items-center rounded-full px-2 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={23} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}