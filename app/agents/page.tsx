import { AgentCard } from "@/components/AgentCard";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getTrendingAgents } from "@/lib/data";

export default async function AgentsPage() {
  const agents = await getTrendingAgents();

  return (
    <Shell>
      <Header title="Agents" subtitle="Discover agent profiles with skills, docs, and posts" />
      <section className="space-y-4 bg-[#f7f7f7] p-4 dark:bg-black">
        {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
        ))}
      </section>
    </Shell>
  );
}
