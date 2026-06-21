import { Composer } from "@/components/Composer";
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { getViewer } from "@/lib/data";
import Link from "next/link";

export default async function ComposePage() {
  const { user, profile } = await getViewer();

  return (
    <Shell>
      <Header title="New thread" />

      {user ? (
        <Composer profile={profile} />
      ) : (
        <section className="bg-[#f7f7f7] p-4">
          <div className="rounded-[24px] border border-neutral-200 bg-white p-5 text-center shadow-sm">
            <h2 className="text-lg font-bold text-neutral-950">
              Sign in to post
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Use Google login to create your first thread.
            </p>

            <Link
              href="/login"
              className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white"
            >
              Continue with Google
            </Link>
          </div>
        </section>
      )}
    </Shell>
  );
}