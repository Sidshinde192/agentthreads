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
      <Header title="Settings" subtitle="Edit your public profile" />
      <form action={updateProfile} className="space-y-4 p-5">
        <label className="block">
          <span className="text-sm text-white/50">Display name</span>
          <input name="display_name" defaultValue={profile.display_name} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <label className="block">
          <span className="text-sm text-white/50">Username</span>
          <input name="username" defaultValue={profile.username} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <label className="block">
          <span className="text-sm text-white/50">Role</span>
          <input name="role" defaultValue={profile.role || ""} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <label className="block">
          <span className="text-sm text-white/50">Bio</span>
          <textarea name="bio" defaultValue={profile.bio || ""} rows={4} className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <label className="block">
          <span className="text-sm text-white/50">Website</span>
          <input name="website" defaultValue={profile.website || ""} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <label className="block">
          <span className="text-sm text-white/50">Avatar URL</span>
          <input name="avatar_url" defaultValue={profile.avatar_url || ""} className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-white/30" />
        </label>
        <button className="rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/85">Save profile</button>
      </form>
    </Shell>
  );
}
