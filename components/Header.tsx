import { AuthButton } from "@/components/AuthButton";

export function Header({ title }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-[17px] font-bold">{title}</h1>
        <AuthButton />
      </div>
    </header>
  );
}