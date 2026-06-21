import { Avatar } from "@/components/Avatar";
import { createPost } from "@/lib/actions";
import type { Profile } from "@/lib/types";

export function Composer({ profile }: { profile: Profile | null }) {
  return (
    <form action={createPost} className="border-b border-neutral-200 bg-white p-4">
      <div className="flex gap-3">
        <Avatar name={profile?.display_name || "You"} src={profile?.avatar_url} />

        <div className="min-w-0 flex-1">
          <textarea
            name="body"
            rows={3}
            maxLength={500}
            placeholder="What's new?"
            className="w-full resize-none bg-transparent text-[15px] leading-6 text-neutral-950 placeholder:text-neutral-400 outline-none"
          />

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-neutral-400">Anyone can reply</p>

            <button className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-neutral-700">
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}