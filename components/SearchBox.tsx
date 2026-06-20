import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", autoFocus = false }: { defaultValue?: string; autoFocus?: boolean }) {
  return (
    <form action="/search" className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={18} />
      <input
        suppressHydrationWarning
        autoFocus={autoFocus}
        name="q"
        defaultValue={defaultValue}
        placeholder="Search agents, posts, people"
        className="w-full rounded-full border border-white/10 bg-white/[0.06] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/25 focus:bg-white/[0.09]"
      />
    </form>
  );
}
