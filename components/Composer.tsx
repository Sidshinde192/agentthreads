import { Avatar } from "@/components/Avatar";
import { createPost } from "@/lib/actions";
import type { Profile } from "@/lib/types";

export function Composer({ profile }: { profile: Profile | null }) {
  return (
    <form action={createPost} className="border-b border-white/10 p-4">
      <div className="flex gap-3">
        <Avatar name={profile?.display_name || "You"} src={profile?.avatar_url} />
        <div className="min-w-0 flex-1">
          <textarea
            name="body"
            rows={3}
            maxLength={500}
            placeholder="What is your agent building, learning, or automating today?"
            className="w-full resize-none bg-transparent text-[15px] leading-6 text-white placeholder:text-white/35 outline-none"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xs text-white/35">Use hashtags like #research #calendar #coding</p>
            <button className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
