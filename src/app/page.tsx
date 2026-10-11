import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { OrgLogo } from "@/components/org-logo";
import { PositionList } from "@/components/position-list";
import { PublicationItem } from "@/components/publication-item";
import { SectionHeading } from "@/components/section-heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AWARDS, EDUCATION, INDUSTRY, RESEARCH } from "@/data/cv";
import { NEWS, SITE } from "@/data/site";
import { getPublications } from "@/lib/bibtex";
import { formatMonth } from "@/lib/utils";
import { allPosts } from "content-collections";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;
const NEWS_LIMIT = 5;
const NOTES_LIMIT = 3;
// Research positions shown alongside industry roles on the home page.
const HOME_RESEARCH = new Set(["CMU", "NAIST"]);

const inlineMarkdown = { p: ({ children }: { children?: React.ReactNode }) => <>{children}</> };

export default function Page() {
  const selected = getPublications().filter((p) => p.selected);
  const notes = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, NOTES_LIMIT);

  return (
    <main className="relative flex min-h-dvh flex-col gap-14">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col justify-between gap-2 gap-y-6 md:flex-row">
            <div className="order-2 flex flex-col gap-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${SITE.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] text-muted-foreground md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY * 2}
                text={`${SITE.position} @ ${SITE.affiliation} · Ph.D. in AI`}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 rounded-full border shadow-lg ring-4 ring-muted md:size-32">
                <AvatarImage alt={SITE.name} src={SITE.avatarUrl} className="object-cover" />
                <AvatarFallback>{SITE.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{SITE.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="news">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <h2 className="text-xl font-bold">News</h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {NEWS.slice(0, NEWS_LIMIT).map((item, i) => (
              <BlurFade key={item.date + item.text} delay={BLUR_FADE_DELAY * 7 + i * 0.05}>
                <div className="flex gap-4 text-sm">
                  <time className="w-16 flex-none pt-px font-mono text-xs tabular-nums text-muted-foreground">
                    {formatMonth(item.date)}
                  </time>
                  <p className="text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-foreground">
                    <Markdown components={inlineMarkdown}>{item.text}</Markdown>
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="publications">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8} inView>
            <SectionHeading title="Selected Publications" href="/publications/" />
          </BlurFade>
          <div className="flex flex-col gap-8">
            {selected.map((pub, i) => (
              <BlurFade key={pub.key} delay={BLUR_FADE_DELAY * 9 + i * 0.05} inView>
                <PublicationItem pub={pub} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 10} inView>
            <SectionHeading title="Experience" href="/cv/" linkLabel="Full CV" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 11} inView>
            <PositionList items={[...INDUSTRY, ...RESEARCH.filter((r) => HOME_RESEARCH.has(r.short))]} />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 12} inView>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {EDUCATION.map((edu, i) => (
              <BlurFade key={edu.degree} delay={BLUR_FADE_DELAY * 13 + i * 0.05} inView>
                <Link
                  href={edu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-x-3"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-x-3">
                    <OrgLogo src={edu.logo} alt={edu.school} fallback="KNU" />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center gap-2 font-semibold leading-none">
                        {edu.school}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          aria-hidden
                        />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">{edu.degree}</div>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-1 text-right text-xs tabular-nums text-muted-foreground">
                    {edu.start} - {edu.end}
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="honors">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
            <h2 className="text-xl font-bold">Honors &amp; Awards</h2>
          </BlurFade>
          <ul className="flex flex-col gap-3">
            {AWARDS.map((award, i) => (
              <BlurFade key={award.title} delay={BLUR_FADE_DELAY * 14 + i * 0.05} inView>
                <li className="flex items-baseline justify-between gap-4 text-sm">
                  <span>{award.title}</span>
                  <time className="flex-none font-mono text-xs tabular-nums text-muted-foreground">{award.date}</time>
                </li>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      {notes.length > 0 && (
        <section id="notes">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
              <SectionHeading title="Recent Research Notes" href="/blog/" />
            </BlurFade>
            <div className="flex flex-col gap-4">
              {notes.map((post, i) => (
                <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 15 + i * 0.05} inView>
                  <Link href={`/blog/${post.slug}/`} className="group flex flex-col gap-1">
                    <span className="font-medium tracking-tight">
                      {post.title}
                      <ChevronRight
                        className="ml-1 inline-block size-4 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="text-sm text-muted-foreground">{post.summary}</span>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16} inView>
          <ContactCard />
        </BlurFade>
      </section>
    </main>
  );
}


function ContactCard() {
  return (
    <div className="relative rounded-xl border p-10">
      <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1">
        <span className="text-sm font-medium text-background">Contact</span>
      </div>
      <div className="absolute inset-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
        <p className="mx-auto max-w-lg text-balance text-muted-foreground">
          If you&apos;re interested in memory, modularity, or continual learning, feel free to{" "}
          <a href={`mailto:${SITE.email}`} className="text-blue-500 underline-offset-4 hover:underline">
            send me an email
          </a>
          . You can also find my{" "}
          <a href={SITE.cvPdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline-offset-4 hover:underline">
            CV here
          </a>
          .
        </p>
      </div>
    </div>
  );
}
