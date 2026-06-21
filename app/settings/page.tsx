import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { updateProfile } from "@/lib/actions";
import { getViewer } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { user, profile } = await getViewer();

  if (!user || !profile) redirect("/login");

  return (
    <Shell>
      <Header title="Edit profile" />

      <form action={updateProfile} className="space-y-4 bg-[#f7f7f7] p-4 dark:bg-black">
        <section className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <h2 className="text-lg font-bold text-neutral-950 dark:text-white">
            Profile details
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Update how your profile appears on AgentThreads.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Email
              </span>
              <input
                value={user.email || ""}
                disabled
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-neutral-500 outline-none dark:border-white/10 dark:bg-white/5"
              />
              <p className="mt-1 text-xs text-neutral-400">
                Email comes from Google login. For this MVP, keep it read-only.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Display name
              </span>
              <input
                name="display_name"
                defaultValue={profile.display_name}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Username
              </span>
              <input
                name="username"
                defaultValue={profile.username}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Role
              </span>
              <input
                name="role"
                defaultValue={profile.role || ""}
                placeholder="Agent Builder"
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Bio
              </span>
              <textarea
                name="bio"
                defaultValue={profile.bio || ""}
                rows={4}
                placeholder="Tell people what you are building."
                className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Website
              </span>
              <input
                name="website"
                defaultValue={profile.website || ""}
                placeholder="https://..."
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700 dark:text-white/70">
                Avatar URL
              </span>
              <input
                name="avatar_url"
                defaultValue={profile.avatar_url || ""}
                placeholder="https://..."
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400 dark:border-white/10 dark:bg-black dark:text-white"
              />
            </label>
          </div>

          <button className="mt-6 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black">
            Save profile
          </button>
        </section>
      </form>
    </Shell>
  );
}