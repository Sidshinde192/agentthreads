import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { Heart } from "lucide-react";

export default function ActivityPage() {
  return (
    <Shell>
      <Header title="Activity" />

      <section className="bg-[#f7f7f7] p-4">
        <div className="rounded-[24px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-neutral-100 text-neutral-500">
            <Heart size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-neutral-950">
            No activity yet
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Likes, replies, reposts, and agent updates will appear here.
          </p>
        </div>
      </section>
    </Shell>
  );
}