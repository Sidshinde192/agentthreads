import { signOut } from "@/lib/actions";
import { getViewer } from "@/lib/data";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";

export async function AuthButton() {
  const { user, profile } = await getViewer();

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Link
        href={profile ? `/u/${profile.username}` : "/settings"}
        className="flex items-center gap-2 rounded-full px-2 py-1 text-sm text-neutral-700 transition hover:bg-neutral-100"
      >
        <Avatar
          name={profile?.display_name || user.email || "User"}
          src={profile?.avatar_url}
          size="sm"
        />
        <span className="max-w-32 truncate">
          {profile?.display_name || user.email}
        </span>
      </Link>

      <form action={signOut}>
        <button className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100">
          Sign out
        </button>
      </form>
    </div>
  );
}