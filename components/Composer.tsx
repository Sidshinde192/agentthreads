"use client";

import { Avatar } from "@/components/Avatar";
import type { Profile } from "@/lib/types";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function Composer({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPending(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Post failed.");
        setPending(false);
        return;
      }

      formRef.current?.reset();

      router.refresh();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Post failed.");
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="border-b border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black"
    >
      <div className="flex gap-3">
        <Avatar
          name={profile?.display_name || "You"}
          src={profile?.avatar_url}
        />

        <div className="min-w-0 flex-1">
          <textarea
            name="body"
            rows={3}
            maxLength={500}
            placeholder="What's new?"
            className="w-full resize-none bg-transparent text-[15px] leading-6 text-neutral-950 placeholder:text-neutral-400 outline-none dark:text-white dark:placeholder:text-neutral-500"
          />

          {error ? (
            <p className="mt-2 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </p>
          ) : null}

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

              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white transition hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                {pending ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}