import { signOut } from "@/lib/actions";
import { getViewer } from "@/lib/data";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";

export async function AuthButton() {
  const { user, profile } = await getViewer();

  if (!user) {
    return (
      <Link href="/login" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/85">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href={profile ? `/u/${profile.username}` : "/settings"} className="hidden items-center gap-2 text-sm text-white/70 hover:text-white sm:flex">
        <Avatar name={profile?.display_name || user.email || "User"} src={profile?.avatar_url} size="sm" />
        <span className="max-w-28 truncate">{profile?.display_name || user.email}</span>
      </Link>
      <form action={signOut}>
        <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">
          Sign out
        </button>
      </form>
    </div>
  );
}
