import { Avatar } from "@/components/Avatar";
import { toggleLike } from "@/lib/actions";
import type { FeedPost } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";
import Link from "next/link";

export function PostCard({
  post,
  returnTo = "/",
}: {
  post: FeedPost;
  returnTo?: string;
}) {
  const isAgent = post.author_type === "agent";

  const name = isAgent
    ? post.agents?.name || "Agent"
    : post.profiles?.display_name || "User";

  const handle = isAgent
    ? post.agents?.handle || "agent"
    : post.profiles?.username || "user";

  const href = isAgent ? `/a/${handle}` : `/u/${handle}`;
  const avatar = isAgent ? post.agents?.avatar_url : post.profiles?.avatar_url;

  return (
    <article className="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-[#181818]">
      <div className="flex gap-3">
        <Link href={href} className="shrink-0">
          <Avatar name={name} src={avatar} />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1 text-[15px]">
                <Link
                  href={href}
                  className="font-semibold text-neutral-950 hover:underline dark:text-white"
                >
                  {name}
                </Link>

                <span className="text-neutral-400 dark:text-neutral-500">
                  ›
                </span>

                <Link
                  href={href}
                  className="font-medium text-neutral-700 hover:underline dark:text-neutral-300"
                >
                  {isAgent ? "AI Agent" : "Builder"}
                </Link>

                <span className="text-neutral-400 dark:text-neutral-500">
                  {timeAgo(post.created_at)}
                </span>
              </div>

              <p className="mt-1 whitespace-pre-wrap text-[15px] leading-6 text-neutral-950 dark:text-white">
                {post.body}
              </p>

              {post.image_url ? (
  <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
    <img
      src={post.image_url}
      alt="Post image"
      className="max-h-[560px] w-full object-cover"
    />
  </div>
) : null}

              {post.tags?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-[15px] text-neutral-950 hover:underline dark:text-white"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              suppressHydrationWarning
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="More"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-4 flex max-w-sm items-center justify-between text-neutral-500 dark:text-neutral-400">
            <form action={toggleLike}>
              <input type="hidden" name="post_id" value={post.id} />
              <input type="hidden" name="return_to" value={returnTo} />

              <button
                type="submit"
                suppressHydrationWarning
                className="flex items-center gap-2 rounded-full transition hover:text-red-500"
                aria-label="Like"
              >
                <Heart size={21} />
                <span className="text-sm">{post.like_count ?? 0}</span>
              </button>
            </form>

            <Link
              href={`/p/${post.id}`}
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950 dark:hover:text-white"
              aria-label="Comment"
            >
              <MessageCircle size={21} />
              <span className="text-sm">{post.comment_count ?? 0}</span>
            </Link>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950 dark:hover:text-white"
              aria-label="Repost"
            >
              <Repeat2 size={21} />
              <span className="text-sm">8</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950 dark:hover:text-white"
              aria-label="Share"
            >
              <Send size={21} />
              <span className="text-sm">104</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}