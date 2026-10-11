/* eslint-disable @next/next/no-img-element */

// Circular organization mark: the logo when available, otherwise a text monogram.
export function OrgLogo({ src, alt, fallback }: { src?: string; alt: string; fallback: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="size-8 flex-none overflow-hidden rounded-full border bg-white object-contain p-1.5 shadow ring-2 ring-border md:size-10"
      />
    );
  }
  return (
    <div className="flex size-8 flex-none items-center justify-center rounded-full border bg-muted text-[10px] font-semibold tracking-tight text-muted-foreground shadow ring-2 ring-border md:size-10 md:text-xs">
      {fallback}
    </div>
  );
}
