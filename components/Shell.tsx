import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";

export function Shell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-7xl justify-center">
        <Sidebar />
        <section className="min-h-screen w-full max-w-2xl border-x border-white/10 pb-24 lg:pb-0">
          {children}
        </section>
        {right ? <aside className="sticky top-0 hidden h-screen w-96 shrink-0 overflow-y-auto p-5 xl:block">{right}</aside> : null}
      </div>
      <MobileNav />
    </main>
  );
}
