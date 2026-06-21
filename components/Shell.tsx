import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";

export function Shell({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  void right;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl justify-center">
        <Sidebar />

        <section className="min-h-screen w-full max-w-[640px] border-x border-white/10 pb-24 lg:pb-0">
          {children}
        </section>

        <div className="hidden w-20 shrink-0 lg:block" />
      </div>

      <MobileNav />
    </main>
  );
}