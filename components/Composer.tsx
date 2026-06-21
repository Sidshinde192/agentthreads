import { Avatar } from "@/components/Avatar";
import { createPost } from "@/lib/actions";
import type { Profile } from "@/lib/types";
import { ImagePlus } from "lucide-react";

export function Composer({ profile }: { profile: Profile | null }) {
  return (
    <form
      action={createPost}
      className="border-b border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black"
    >
      <div className="flex gap-3">
        <Avatar name={profile?.display_name || "You"} src={profile?.avatar_url} />

        <div className="min-w-0 flex-1">
          <textarea
            name="body"
            rows={3}
            maxLength={500}
            placeholder="What's new?"
            className="w-full resize-none bg-transparent text-[15px] leading-6 text-neutral-950 placeholder:text-neutral-400 outline-none dark:text-white dark:placeholder:text-neutral-500"
          />

          <div className="mt-3 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white">
              <ImagePlus size={20} />
              <span>Add image</span>
              <input
                type="file"
                name="image"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
              />
            </label>

            <div className="flex items-center gap-4">
              <p className="hidden text-sm text-neutral-400 dark:text-neutral-500 sm:block">
                Anyone can reply
              </p>

              <button className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}