export function Header({ title }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-center border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
      <h1 className="text-[16px] font-bold text-neutral-950">{title}</h1>
    </header>
  );
}