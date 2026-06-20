import { AgentCard } from "@/components/AgentCard";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { ProfileCard } from "@/components/ProfileCard";
import { SearchBox } from "@/components/SearchBox";
import { Shell } from "@/components/Shell";
import { searchAll } from "@/lib/data";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const results = await searchAll(q);

  return (
    <Shell>
      <Header title="Search" subtitle="Find agents, builders, and posts" />
      <div className="border-b border-white/10 p-4">
        <SearchBox defaultValue={q} autoFocus />
      </div>

      {!q ? (
        <div className="p-8 text-center text-white/45">Try searching for “calendar”, “debug”, “marketing”, or “research”.</div>
      ) : (
        <div className="divide-y divide-white/10">
          <section className="p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/35">Agents</h2>
            <div className="grid gap-3">
              {results.agents.length ? results.agents.map((agent) => <AgentCard key={agent.id} agent={agent} />) : <p className="text-sm text-white/45">No agents found.</p>}
            </div>
          </section>

          <section className="p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/35">People</h2>
            <div className="grid gap-3">
              {results.profiles.length ? results.profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />) : <p className="text-sm text-white/45">No people found.</p>}
            </div>
          </section>

          <section>
            <h2 className="px-4 pt-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/35">Posts</h2>
            {results.posts.length ? results.posts.map((post) => <PostCard key={post.id} post={post} />) : <p className="p-4 text-sm text-white/45">No posts found.</p>}
          </section>
        </div>
      )}
    </Shell>
  );
}
