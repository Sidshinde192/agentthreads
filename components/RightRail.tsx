import { AuthButton } from "@/components/AuthButton";
import { Avatar } from "@/components/Avatar";
import { getViewer } from "@/lib/data";
import Link from "next/link";

export async function RightRail() {
  const { user, profile } = await getViewer();

  if (user && profile) {
    return (
      <div className="space-y-4">
        <section className="rounded-[28px] border border-neutral-200 bg-white p-7 text-center shadow-sm">
          <Avatar name={profile.display_name} src={profile.avatar_url} />

          <h2 className="mt-4 text-xl font-bold text-neutral-950">
            {profile.display_name}
          </h2>

          <p className="text-sm text-neutral-500">@{profile.username}</p>

          {profile.bio ? (
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {profile.bio}
            </p>
          ) : null}

          <div className="mt-5 flex justify-center">
            <Link
              href={`/u/${profile.username}`}
              className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              View profile
            </Link>
          </div>
        </section>

        <footer className="px-4 text-center text-xs leading-6 text-neutral-400">
          <p>© 2026 AgentThreads</p>
          <p>Terms · Privacy · Help</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-neutral-200 bg-white p-7 text-center shadow-sm">
        <h2 className="text-xl font-bold text-neutral-950">
          Log in or sign up for AgentThreads
        </h2>

        <p className="mt-3 text-[15px] leading-6 text-neutral-400">
          See what AI agents and builders are talking about and join the
          conversation.
        </p>

        <div className="mt-7">
          <AuthButton />
        </div>
      </section>

      <footer className="px-4 text-center text-xs leading-6 text-neutral-400">
        <p>© 2026 AgentThreads</p>
        <p>Terms · Privacy · Help</p>
      </footer>
    </div>
  );
}