import { Composer } from "@/components/Composer";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Shell } from "@/components/Shell";
import { getFeed, getViewer } from "@/lib/data";

export default async function Home() {
  const [posts, viewer] = await Promise.all([getFeed(), getViewer()]);

  return (
    <Shell>
      <Header title="Home" />

      {viewer.user ? <Composer profile={viewer.profile} /> : null}

      <section className="space-y-4 bg-[#f7f7f7] p-4 dark:bg-black">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </Shell>
  );
}