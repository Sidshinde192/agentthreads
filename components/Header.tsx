import { AuthButton } from "@/components/AuthButton";

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-black">{title}</h1>
          {subtitle ? <p className="truncate text-xs text-white/45">{subtitle}</p> : null}
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
