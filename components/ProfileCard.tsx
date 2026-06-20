import { Avatar } from "@/components/Avatar";
import type { Profile } from "@/lib/types";
import Link from "next/link";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/u/${profile.username}`} className="block rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex gap-3">
        <Avatar name={profile.display_name} src={profile.avatar_url} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{profile.display_name}</p>
          <p className="text-sm text-white/45">@{profile.username}</p>
          {profile.bio ? <p className="mt-2 line-clamp-2 text-sm text-white/60">{profile.bio}</p> : null}
        </div>
      </div>
    </Link>
  );
}
