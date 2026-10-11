"use client";

import type { Publication } from "@/lib/bibtex";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";

type Panel = "abstract" | "bibtex" | null;

const pill =
  "inline-flex h-6 items-center rounded-md border border-border px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function PublicationItem({ pub }: { pub: Publication }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [copied, setCopied] = useState(false);
  const toggle = (p: Exclude<Panel, null>) => setPanel((cur) => (cur === p ? null : p));
  const hasEqual = pub.authors.some((a) => a.equal);

  const copyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the text stays selectable.
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
      <div className="flex-none sm:w-28 sm:pt-0.5">
        {pub.abbr && (
          <span className="inline-flex w-fit items-center justify-center rounded-lg bg-primary px-2.5 py-1 text-center text-xs font-semibold text-primary-foreground sm:w-full">
            {pub.abbr}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="font-semibold leading-snug tracking-tight">{pub.title}</h3>
        <p className="text-sm text-muted-foreground">
          {pub.authors.map((a, i) => (
            <Fragment key={a.name}>
              {i > 0 && (i < pub.authors.length - 1 ? ", " : pub.authors.length > 2 ? ", and " : " and ")}
              <span className={cn(a.isMe && "font-semibold text-foreground underline underline-offset-4 decoration-border")}>
                {a.name}
                {a.equal && "*"}
              </span>
            </Fragment>
          ))}
          {hasEqual && <span className="ml-1 text-xs italic">(*: equal contribution)</span>}
        </p>
        <p className="text-sm italic text-muted-foreground">
          {pub.venue}, {pub.year}
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          {pub.abstract && (
            <button type="button" className={cn(pill, panel === "abstract" && "bg-muted text-foreground")} onClick={() => toggle("abstract")}>
              Abstract
            </button>
          )}
          <button type="button" className={cn(pill, panel === "bibtex" && "bg-muted text-foreground")} onClick={() => toggle("bibtex")}>
            BibTeX
          </button>
          {pub.pdf && (
            <a className={pill} href={pub.pdf} target="_blank" rel="noopener noreferrer">
              PDF
            </a>
          )}
          {pub.html && (
            <a className={pill} href={pub.html} target="_blank" rel="noopener noreferrer">
              HTML
            </a>
          )}
          {pub.doi && (
            <a className={pill} href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
              DOI
            </a>
          )}
          {pub.code && (
            <a className={pill} href={pub.code} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          )}
        </div>
        <AnimatePresence initial={false} mode="wait">
          {panel && (
            <motion.div
              key={panel}
              initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              {panel === "abstract" ? (
                <p className="mt-2 rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
                  {pub.abstract}
                </p>
              ) : (
                <div className="relative mt-2">
                  <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 pr-12 font-mono text-xs leading-relaxed text-foreground/90">
                    {pub.bibtex}
                  </pre>
                  <button
                    type="button"
                    onClick={copyBibtex}
                    aria-label="Copy BibTeX"
                    className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground"
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
