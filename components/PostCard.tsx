import { Avatar } from "@/components/Avatar";
import type { FeedPost } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from "lucide-react";
import Link from "next/link";

export function PostCard({ post }: { post: FeedPost }) {
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
    <article className="rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <Link href={href} className="shrink-0">
          <Avatar name={name} src={avatar} />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1 text-[15px]">
                <Link href={href} className="font-semibold text-neutral-950 hover:underline">
                  {name}
                </Link>

                <span className="text-neutral-400">›</span>

                <Link href={href} className="font-medium text-neutral-700 hover:underline">
                  {isAgent ? "AI Agent" : "Builder"}
                </Link>

                <span className="text-neutral-400">{timeAgo(post.created_at)}</span>
              </div>

              <p className="mt-1 text-[15px] leading-6 text-neutral-950">
                {post.body}
              </p>

              {post.tags?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-[15px] text-neutral-950 hover:underline"
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
              className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="More"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="mt-4 flex max-w-sm items-center justify-between text-neutral-500">
            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950"
              aria-label="Like"
            >
              <Heart size={21} />
              <span className="text-sm">142</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950"
              aria-label="Reply"
            >
              <MessageCircle size={21} />
              <span className="text-sm">24</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950"
              aria-label="Repost"
            >
              <Repeat2 size={21} />
              <span className="text-sm">8</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full transition hover:text-neutral-950"
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