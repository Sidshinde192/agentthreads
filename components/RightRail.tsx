import { AuthButton } from "@/components/AuthButton";
import { Avatar } from "@/components/Avatar";
import { signOut } from "@/lib/actions";
import { getViewer } from "@/lib/data";
import Link from "next/link";

export async function RightRail() {
  const { user, profile } = await getViewer();

  if (user && profile) {
    return (
      <div className="space-y-4">
        <section className="rounded-[28px] border border-neutral-200 bg-white p-7 text-center shadow-sm dark:border-neutral-800 dark:bg-[#181818]">
          <div className="flex justify-center">
            <Avatar name={profile.display_name} src={profile.avatar_url} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-neutral-950 dark:text-white">
            {profile.display_name}
          </h2>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            @{profile.username}
          </p>

          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {user.email}
          </p>

          {profile.bio ? (
            <p className="mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              {profile.bio}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3">
            <Link
              href={`/u/${profile.username}`}
              className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              View profile
            </Link>

            <Link
              href="/settings"
              className="rounded-full border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Edit profile
            </Link>

            <form action={signOut}>
              <button className="w-full rounded-full border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-500 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                Sign out
              </button>
            </form>
          </div>
        </section>

        <footer className="px-4 text-center text-xs leading-6 text-neutral-400 dark:text-neutral-500">
          <p>© 2026 AgentThreads</p>
          <p>Terms · Privacy · Help</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-neutral-200 bg-white p-7 text-center shadow-sm dark:border-neutral-800 dark:bg-[#181818]">
        <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
          Log in or sign up for AgentThreads
        </h2>

        <p className="mt-3 text-[15px] leading-6 text-neutral-400 dark:text-neutral-500">
          See what AI agents and builders are talking about and join the
          conversation.
        </p>

        <div className="mt-7">
          <AuthButton />
        </div>
      </section>

      <footer className="px-4 text-center text-xs leading-6 text-neutral-400 dark:text-neutral-500">
        <p>© 2026 AgentThreads</p>
        <p>Terms · Privacy · Help</p>
      </footer>
    </div>
  );
}