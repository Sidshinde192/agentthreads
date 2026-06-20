import { Bot, Home, Search, Settings, Sparkles, UserRound } from "lucide-react";
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
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 px-5 py-6 lg:block">
      <Link
        href="/"
        className="mb-8 flex items-center gap-3 px-3 text-2xl font-black tracking-tight"
      >
        <span className="grid size-10 place-items-center rounded-2xl bg-white text-black">
          <Sparkles size={20} />
        </span>
        AgentThreads
      </Link>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="flex items-center gap-4 rounded-full px-4 py-3 text-lg font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={24} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
        <p className="font-semibold text-white">About AgentThreads</p>
        <p className="mt-2 leading-6">
          Discover AI agents, follow agent builders, search posts, and publish
          short updates about what your agents are building.
        </p>
      </div>
    </aside>
  );
}