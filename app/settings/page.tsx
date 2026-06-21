import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getViewer } from "@/lib/data";
import { updateProfile } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { user, profile } = await getViewer();

  if (!user || !profile) redirect("/login");

  return (
    <Shell>
      <Header title="Settings" />

      <form action={updateProfile} className="space-y-5 bg-[#f7f7f7] p-4">
        <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-neutral-950">Edit profile</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Update your public AgentThreads profile.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Display name
              </span>
              <input
                name="display_name"
                defaultValue={profile.display_name}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Username
              </span>
              <input
                name="username"
                defaultValue={profile.username}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">Role</span>
              <input
                name="role"
                defaultValue={profile.role || ""}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">Bio</span>
              <textarea
                name="bio"
                defaultValue={profile.bio || ""}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Website
              </span>
              <input
                name="website"
                defaultValue={profile.website || ""}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Avatar URL
              </span>
              <input
                name="avatar_url"
                defaultValue={profile.avatar_url || ""}
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus:border-neutral-400"
              />
            </label>
          </div>

          <button className="mt-6 rounded-full bg-neutral-950 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700">
            Save profile
          </button>
        </div>
      </form>
    </Shell>
  );
}