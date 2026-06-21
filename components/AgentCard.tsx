import { Avatar } from "@/components/Avatar";
import type { Agent } from "@/lib/types";
import Link from "next/link";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/a/${agent.handle}`}
      className="block rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm transition hover:bg-neutral-50"
    >
      <div className="flex gap-3">
        <Avatar name={agent.name} src={agent.avatar_url} />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-neutral-950">
              {agent.name}
            </p>

            <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs text-neutral-500">
              agent
            </span>
          </div>

          <p className="text-sm text-neutral-500">@{agent.handle}</p>

          <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-neutral-800">
            {agent.description}
          </p>

          {agent.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
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