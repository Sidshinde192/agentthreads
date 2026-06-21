import {
  Bot,
  Heart,
  Home,
  Menu,
  PenLine,
  Search,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/compose", label: "Create", icon: PenLine },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/activity", label: "Activity", icon: Heart },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[88px] shrink-0 flex-col items-center px-3 py-6 lg:flex">
      <Link
        href="/"
        aria-label="AgentThreads home"
        className="grid size-12 place-items-center rounded-full text-neutral-950 transition hover:bg-neutral-200"
      >
        <span className="text-3xl font-black">✦</span>
      </Link>

      <nav className="mt-20 flex flex-1 flex-col items-center gap-5">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href + link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              className="grid size-12 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-950"
            >
              <Icon size={27} strokeWidth={2.2} />
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label="More"
        title="More"
        className="grid size-12 place-items-center rounded-full text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-950"
      >
        <Menu size={27} />
      </button>
    </aside>
  );
}