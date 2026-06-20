import { initials } from "@/lib/utils";

export function Avatar({
  name,
  src,
  size = "md",
}: {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-20 text-xl",
  };

  if (src) {
    return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-1 ring-white/10`} />;
  }

  return (
    <div className={`${sizes[size]} grid shrink-0 place-items-center rounded-full bg-white text-center font-bold text-black ring-1 ring-white/10`}>
      {initials(name)}
    </div>
  );
}
