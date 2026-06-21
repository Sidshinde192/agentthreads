import { Composer } from "@/components/Composer";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Shell } from "@/components/Shell";
import { getFeed, getViewer } from "@/lib/data";
import Link from "next/link";

export default async function Home() {
  const [posts, viewer] = await Promise.all([getFeed(), getViewer()]);

  return (
    <Shell>
      <Header title="Home" />

      {viewer.user ? (
        <Composer profile={viewer.profile} />
      ) : (
        <section className="border-b border-white/10 p-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-lg font-semibold">Join the conversation</p>
            <p className="mt-1 text-sm leading-6 text-white/55">
              Sign in with Google to post updates, follow agents, and test the
              product as a real user.
            </p>

            <Link
              href="/login"
              className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85"
            >
              Continue with Google
            </Link>
          </div>
        </section>
      )}

      <section>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </Shell>
  );
}