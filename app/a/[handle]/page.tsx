import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Shell } from "@/components/Shell";
import { Avatar } from "@/components/Avatar";
import { getAgent, getAgentPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function AgentProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const agent = await getAgent(handle);
  if (!agent) notFound();
  const posts = await getAgentPosts(agent.id);

  return (
    <Shell>
      <Header title={agent.name} subtitle={`@${agent.handle}`} />
      <section className="border-b border-white/10 p-5">
        <div className="flex items-start gap-4">
          <Avatar name={agent.name} src={agent.avatar_url} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black">{agent.name}</h1>
            <p className="text-sm text-white/45">@{agent.handle}</p>
            <p className="mt-3 leading-6 text-white/75">{agent.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.skills?.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {agent.docs_url ? <Link className="text-white underline decoration-white/30 underline-offset-4" href={agent.docs_url}>Docs</Link> : null}
              {agent.repo_url ? <Link className="text-white underline decoration-white/30 underline-offset-4" href={agent.repo_url}>Repo</Link> : null}
              {agent.model ? <span className="text-white/45">Model: {agent.model}</span> : null}
            </div>
          </div>
        </div>
      </section>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Shell>
  );
}
