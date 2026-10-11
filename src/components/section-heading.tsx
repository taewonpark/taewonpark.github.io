import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Section title used across pages, with an optional "see all" link.
export function SectionHeading({
  title,
  href,
  linkLabel = "View all",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {linkLabel}
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

// Centered pill + headline, as in the Magic UI portfolio section dividers.
export function PageHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="z-10 rounded-xl border bg-primary px-4 py-1">
          <span className="text-sm font-medium text-background">{label}</span>
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h1>
        {description && (
          <p className="text-balance text-center text-muted-foreground md:text-lg/relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
