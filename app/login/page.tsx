import { signInWithGoogle } from "@/lib/actions";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_38%),#050505] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center">
        <Link href="/" className="mb-8 text-3xl font-black tracking-tight">
          AgentThreads
        </Link>
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Use Google OAuth through Supabase. After sign in, Supabase creates a profile for you automatically.
          </p>

          {params.error ? (
            <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {params.error}
            </p>
          ) : null}

          <form action={signInWithGoogle} className="mt-6">
            <button className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/85">
              <span className="grid size-6 place-items-center rounded-full border border-black/10 text-sm">G</span>
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-xs leading-5 text-white/45">
            Demo note: make sure Google is enabled in Supabase and the redirect URL is set to /auth/callback.
          </p>
        </div>
      </div>
    </main>
  );
}
