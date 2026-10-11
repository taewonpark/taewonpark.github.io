import BlurFade from "@/components/magicui/blur-fade";
import { PositionList } from "@/components/position-list";
import { PageHeading, SectionHeading } from "@/components/section-heading";
import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import { AWARDS, EDUCATION, INDUSTRY, PATENTS, RESEARCH, SERVICE } from "@/data/cv";
import { SITE } from "@/data/site";
import { getPublications } from "@/lib/bibtex";
import { Download } from "lucide-react";
import type { Metadata } from "next";
import Markdown from "react-markdown";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${SITE.name}.`,
};

const BLUR_FADE_DELAY = 0.04;

function Dot() {
  return <div className="size-3 rounded-full border-2 border-border bg-card ring-4 ring-background" />;
}

export default function CVPage() {
  const pubs = getPublications();
  const conferences = pubs.filter((p) => p.type === "inproceedings");
  const journals = pubs.filter((p) => p.type === "article");

  return (
    <main className="flex flex-col gap-14">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <PageHeading label="Curriculum Vitae" title={`${SITE.name}, Ph.D.`} description={`${SITE.position} @ ${SITE.affiliation}`} />
        <div className="mt-6 flex justify-center">
          <a
            href={SITE.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Download className="size-4" />
            Download PDF
          </a>
        </div>
      </BlurFade>

      <section className="flex flex-col gap-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-xl font-bold">Education</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Timeline className="p-0">
            {EDUCATION.map((edu) => (
              <TimelineItem key={edu.degree} className="flex w-full items-start gap-6">
                <TimelineConnectItem className="pt-1.5">
                  <Dot />
                </TimelineConnectItem>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <time className="font-mono text-xs tabular-nums text-muted-foreground">
                    {edu.start} – {edu.end}
                  </time>
                  <h3 className="font-semibold leading-snug">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.school}, {edu.location}
                  </p>
                  {edu.details.length > 0 && (
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground [&_strong]:text-foreground">
                      {edu.details.map((d) => (
                        <li key={d}>
                          <Markdown components={{ p: ({ children }) => <>{children}</> }}>{d}</Markdown>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </BlurFade>
      </section>

      <section className="flex flex-col gap-6">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <h2 className="text-xl font-bold">Industry Experience</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
          <PositionList items={INDUSTRY} />
        </BlurFade>
      </section>

      <section className="flex flex-col gap-6">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <h2 className="text-xl font-bold">Research Experience</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
          <PositionList items={RESEARCH} />
        </BlurFade>
      </section>

      <section className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <SectionHeading title="Publications" href="/publications/" linkLabel="Details" />
        </BlurFade>
        {[
          { label: "Conference", prefix: "C", items: conferences },
          { label: "Journal", prefix: "J", items: journals },
        ].map((group) => (
          <BlurFade key={group.label} delay={BLUR_FADE_DELAY * 5} inView>
            <h3 className="mb-3 mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{group.label}</h3>
            <ol className="flex flex-col gap-3">
              {group.items.map((p, i) => (
                <li key={p.key} className="flex gap-3 text-sm">
                  <span className="w-8 flex-none font-mono text-xs tabular-nums text-muted-foreground">
                    [{group.prefix}
                    {group.items.length - i}]
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-muted-foreground">
                      {p.venue}
                      {p.abbr && p.abbr !== p.venue && ` (${p.abbr})`}, {p.year}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </BlurFade>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <h2 className="text-xl font-bold">Patents</h2>
        </BlurFade>
        <ol className="flex flex-col gap-4">
          {PATENTS.map((p, i) => (
            <BlurFade key={p.number} delay={BLUR_FADE_DELAY * 5 + i * 0.05} inView>
              <li className="flex gap-3 text-sm">
                <span className="w-8 flex-none font-mono text-xs tabular-nums text-muted-foreground">[P{PATENTS.length - i}]</span>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-muted-foreground">{p.number}</span>
                  <span className="text-muted-foreground">{p.authors}</span>
                </div>
                <time className="flex-none font-mono text-xs tabular-nums text-muted-foreground">{p.date}</time>
              </li>
            </BlurFade>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <h2 className="text-xl font-bold">Honors & Awards</h2>
        </BlurFade>
        <ul className="flex flex-col gap-3">
          {AWARDS.map((a, i) => (
            <BlurFade key={a.title} delay={BLUR_FADE_DELAY * 5 + i * 0.05} inView>
              <li className="flex items-baseline justify-between gap-4 text-sm">
                <span>{a.title}</span>
                <time className="flex-none font-mono text-xs tabular-nums text-muted-foreground">{a.date}</time>
              </li>
            </BlurFade>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          <h2 className="text-xl font-bold">Academic Service</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 5} inView>
          {SERVICE.map((s) => (
            <p key={s.role} className="text-sm">
              <span className="font-medium">{s.role}:</span> <span className="text-muted-foreground">{s.venues}</span>
            </p>
          ))}
        </BlurFade>
      </section>
    </main>
  );
}
