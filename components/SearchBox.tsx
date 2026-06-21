import { Search } from "lucide-react";

export function SearchBox({
  query,
  defaultValue,
  autoFocus = false,
}: {
  query?: string;
  defaultValue?: string;
  autoFocus?: boolean;
}) {
  const value = query ?? defaultValue ?? "";

  return (
    <form action="/search" className="relative">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
      />

      <input
        suppressHydrationWarning
        autoFocus={autoFocus}
        name="q"
        defaultValue={value}
        placeholder="Search"
        className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
      />
    </form>
  );
}