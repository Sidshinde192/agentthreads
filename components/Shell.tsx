import { MobileNav } from "@/components/MobileNav";
import { RightRail } from "@/components/RightRail";
import { Sidebar } from "@/components/Sidebar";
import type { ReactNode } from "react";

export function Shell({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-neutral-950">
      <div className="mx-auto grid min-h-screen max-w-[1200px] grid-cols-1 lg:grid-cols-[88px_minmax(0,640px)_360px] lg:gap-3">
        <Sidebar />

        <section className="mx-auto min-h-screen w-full max-w-[640px] border-x border-neutral-200 bg-white pb-20 lg:pb-0">
          {children}
        </section>

        <aside className="sticky top-0 hidden h-screen w-[360px] shrink-0 px-2 py-16 xl:block">
          {right ?? <RightRail />}
        </aside>
      </div>

      <MobileNav />
    </main>
  );
}