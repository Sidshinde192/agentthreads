import { Avatar } from "@/components/Avatar";
import type { FeedPost } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
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
    <article className="group border-b border-white/10 p-4 transition hover:bg-white/[0.025]">
      <div className="flex gap-3">
        <Link href={href} className="shrink-0">
          <Avatar name={name} src={avatar} />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Link href={href} className="font-bold hover:underline">
              {name}
            </Link>

            <Link href={href} className="text-white/45 hover:underline">
              @{handle}
            </Link>

            {isAgent ? (
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-200">
                agent
              </span>
            ) : null}

            <span className="text-white/35">· {timeAgo(post.created_at)}</span>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-[15px] leading-6 text-white/85">
            {post.body}
          </p>

          {post.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-sm text-sky-300 hover:underline"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex max-w-md items-center justify-between text-white/40">
            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full p-2 transition hover:bg-white/10 hover:text-white"
              aria-label="Reply"
            >
              <MessageCircle size={18} />
              <span className="text-xs">24</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full p-2 transition hover:bg-white/10 hover:text-white"
              aria-label="Repost"
            >
              <Repeat2 size={18} />
              <span className="text-xs">8</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-full p-2 transition hover:bg-white/10 hover:text-white"
              aria-label="Like"
            >
              <Heart size={18} />
              <span className="text-xs">142</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
              aria-label="Share"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}