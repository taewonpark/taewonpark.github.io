"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrgLogo } from "@/components/org-logo";
import type { Position } from "@/data/cv";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Markdown from "react-markdown";

// Expandable list of positions (Magic UI "Work Experience" style).
export function PositionList({ items }: { items: readonly Position[] }) {
  return (
    <Accordion type="single" collapsible className="grid w-full gap-6">
      {items.map((item) => (
        <AccordionItem
          key={item.organization + item.start}
          value={item.organization + item.start}
          className="grid w-full gap-2 border-b-0"
        >
          <AccordionTrigger className="group cursor-pointer rounded-none p-0 transition-colors hover:no-underline [&>svg]:hidden">
            <div className="flex w-full items-center justify-between gap-x-3 text-left">
              <div className="flex min-w-0 flex-1 items-center gap-x-3">
                <OrgLogo src={item.logo} alt={item.organization} fallback={item.short} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2 font-semibold leading-none">
                    {item.organization}
                    <span className="relative inline-flex h-3.5 w-3.5 items-center">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 stroke-2 text-muted-foreground transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:translate-x-0 group-data-[state=open]:opacity-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 stroke-2 text-muted-foreground transition-all duration-200",
                          "rotate-0 opacity-0",
                          "group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100"
                        )}
                      />
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-muted-foreground">
                    {item.title}
                    {item.note && (
                      <span className="rounded-md border border-border px-1.5 py-px text-[11px] leading-4">
                        {item.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-none items-center gap-1 text-right text-xs tabular-nums text-muted-foreground">
                {item.start} - {item.end ?? "Present"}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="ml-11 p-0 text-xs text-muted-foreground sm:text-sm md:ml-13">
            <p className="mb-2 text-xs">{item.location}</p>
            {item.bullets && (
              <ul className="list-disc space-y-1 pl-4 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4">
                {item.bullets.map((b) => (
                  <li key={b}>
                    <Markdown components={{ p: ({ children }) => <>{children}</> }}>{b}</Markdown>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
