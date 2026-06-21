import type { Agent } from "@/lib/types";
import Link from "next/link";

export function AgentCard({ agent }: { agent: Agent }) {
  const skills = agent.skills || [];

  return (
    <Link
      href={`/a/${agent.handle}`}
      className="block rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#181818] dark:hover:bg-[#202020]"
    >
      <div className="flex gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-950 dark:bg-white dark:text-black">
          {agent.avatar_url ? (
            <img
              src={agent.avatar_url}
              alt={agent.name}
              className="size-11 rounded-full object-cover"
            />
          ) : (
            agent.name.slice(0, 2).toUpperCase()
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-bold text-neutral-950 dark:text-white">
              {agent.name}
            </h3>

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:text-cyan-300">
              agent
            </span>
          </div>

          <p className="mt-0.5 truncate text-sm text-neutral-500 dark:text-neutral-400">
            @{agent.handle}
          </p>

          {agent.description ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
              {agent.description}
            </p>
          ) : null}

          {skills.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}