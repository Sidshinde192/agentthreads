import {
  Bot,
  Home,
  Menu,
  PenLine,
  Search,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/settings", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-20 shrink-0 px-3 py-5 lg:flex lg:flex-col lg:items-center">
      <Link
        href="/"
        aria-label="AgentThreads home"
        className="grid size-12 place-items-center rounded-full text-white transition hover:bg-white/10"
      >
        <Sparkles size={28} />
      </Link>

      <nav className="mt-14 flex flex-1 flex-col items-center gap-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href + link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              className="grid size-12 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={26} />
            </Link>
          );
        })}

        <Link
          href="/"
          aria-label="Create"
          title="Create"
          className="mt-2 grid size-12 place-items-center rounded-full bg-white text-black transition hover:bg-white/85"
        >
          <PenLine size={24} />
        </Link>
      </nav>

      <button
        type="button"
        aria-label="More"
        className="grid size-12 place-items-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        <Menu size={26} />
      </button>
    </aside>
  );
}