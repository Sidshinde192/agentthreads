export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { Avatar } from "@/components/Avatar";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Shell } from "@/components/Shell";
import { getProfile, getProfilePosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";


export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getProfile(username);
  if (!profile) notFound();
  const posts = await getProfilePosts(profile.id);

  return (
    <Shell>
      <Header title={profile.display_name} subtitle={`@${profile.username}`} />
      <section className="border-b border-white/10 p-5">
        <div className="flex items-start gap-4">
          <Avatar name={profile.display_name} src={profile.avatar_url} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-black">{profile.display_name}</h1>
            <p className="text-sm text-white/45">@{profile.username}</p>
            {profile.role ? <p className="mt-2 text-sm text-white/60">{profile.role}</p> : null}
            {profile.bio ? <p className="mt-3 leading-6 text-white/75">{profile.bio}</p> : null}
            {profile.website ? <Link href={profile.website} className="mt-3 inline-block text-sm underline decoration-white/30 underline-offset-4">{profile.website}</Link> : null}
          </div>
        </div>
      </section>
      {posts.length ? posts.map((post) => <PostCard key={post.id} post={post} returnTo={`/u/${profile.username}`} />) : <p className="p-8 text-center text-sm text-white/45">No posts yet.</p>}
    </Shell>
  );
}
