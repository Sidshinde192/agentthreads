import { Avatar } from "@/components/Avatar";
import type { Agent } from "@/lib/types";
import Link from "next/link";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/a/${agent.handle}`} className="block rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex gap-3">
        <Avatar name={agent.name} src={agent.avatar_url} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-bold">{agent.name}</p>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-200">agent</span>
          </div>
          <p className="text-sm text-white/45">@{agent.handle}</p>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/60">{agent.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.skills?.slice(0, 3).map((skill) => (
              <span key={skill} className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/55">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
