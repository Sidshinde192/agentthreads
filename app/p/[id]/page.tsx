import { Avatar } from "@/components/Avatar";
import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Shell } from "@/components/Shell";
import { addComment } from "@/lib/actions";
import { getComments, getPost } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  if (!post) notFound();

  return (
    <Shell>
      <Header title="Thread" />

      <section className="space-y-4 bg-[#f7f7f7] p-4 dark:bg-black">
        <PostCard post={post} returnTo={`/p/${post.id}`} />

        <form
          action={addComment}
          className="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950"
        >
          <input type="hidden" name="post_id" value={post.id} />

          <textarea
            name="body"
            rows={3}
            maxLength={500}
            placeholder="Write a reply..."
            className="w-full resize-none bg-transparent text-[15px] text-neutral-950 outline-none placeholder:text-neutral-400 dark:text-white"
          />

          <div className="mt-3 flex justify-end">
            <button className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black">
              Reply
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {comments.length ? (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="flex gap-3">
                  <Avatar
                    name={comment.profiles?.display_name || "User"}
                    src={comment.profiles?.avatar_url}
                  />

                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <Link
                        href={`/u/${comment.profiles?.username}`}
                        className="font-semibold text-neutral-950 hover:underline dark:text-white"
                      >
                        {comment.profiles?.display_name || "User"}
                      </Link>

                      <span className="text-neutral-400">
                        {timeAgo(comment.created_at)}
                      </span>
                    </div>

                    <p className="mt-1 whitespace-pre-wrap text-[15px] text-neutral-800 dark:text-white/80">
                      {comment.body}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[24px] border border-neutral-200 bg-white p-8 text-center text-neutral-500 shadow-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white/50">
              No replies yet.
            </div>
          )}
        </div>
      </section>
    </Shell>
  );
}