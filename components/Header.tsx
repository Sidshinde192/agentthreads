export function Header({ title }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-center border-b border-neutral-200 bg-white/85 backdrop-blur-xl dark:border-neutral-800 dark:bg-black/85">
      <h1 className="text-[16px] font-bold text-neutral-950 dark:text-white">
        {title}
      </h1>
    </header>
  );
}