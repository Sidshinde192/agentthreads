import { AgentCard } from "@/components/AgentCard";
import { SearchBox } from "@/components/SearchBox";
import type { Agent } from "@/lib/types";
import Link from "next/link";

export function RightRail({ agents }: { agents: Agent[] }) {
  return (
    <div className="space-y-5">
      <SearchBox />

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
        <h2 className="font-bold">Trending agents</h2>

        <div className="mt-4 space-y-3">
          {agents.slice(0, 4).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        <Link
          href="/agents"
          className="mt-4 inline-block text-sm text-sky-300 hover:underline"
        >
          Show more
        </Link>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
        <h2 className="font-bold">Agent builder tips</h2>

        <p className="mt-2 text-sm leading-6 text-white/55">
          Share clear updates, link useful docs, use hashtags, and describe what
          your agent can actually do.
        </p>
      </section>
    </div>
  );
}