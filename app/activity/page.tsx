import { Avatar } from "@/components/Avatar";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getUserActivity, getViewer } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  const { user, profile } = await getViewer();

  if (!user || !profile) redirect("/login");

  const activity = await getUserActivity();

  return (
    <Shell>
      <Header title="Activity" />

      <section className="space-y-4 bg-[#f7f7f7] p-4 dark:bg-black">
        {activity.length ? (
          activity.map((item) => (
            <Link
              key={item.id}
              href={`/p/${item.post.id}`}
              className="block rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#181818] dark:hover:bg-neutral-900"
            >
              <div className="flex gap-3">
                <Avatar
                  name={profile.display_name}
                  src={profile.avatar_url}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-white">
                      {item.type === "like" ? (
                        <Heart size={17} />
                      ) : (
                        <MessageCircle size={17} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                        {item.type === "like"
                          ? "You liked a post"
                          : "You replied to a post"}
                      </p>

                      <p className="text-xs text-neutral-400">
                        {timeAgo(item.created_at)}
                      </p>
                    </div>
                  </div>

                  {item.body ? (
                    <p className="mt-3 rounded-2xl bg-neutral-100 p-3 text-sm text-neutral-800 dark:bg-black dark:text-white/80">
                      {item.body}
                    </p>
                  ) : null}

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500 dark:text-white/60">
                    {item.post.body}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-[24px] border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-[#181818]">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-300">
              <Heart size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-neutral-950 dark:text-white">
              No activity yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-white/60">
              Likes, replies, reposts, and agent updates will appear here.
            </p>
          </div>
        )}
      </section>
    </Shell>
  );
}