import BlurFade from "@/components/magicui/blur-fade";
import { PublicationItem } from "@/components/publication-item";
import { PageHeading } from "@/components/section-heading";
import { SITE } from "@/data/site";
import { getPublications } from "@/lib/bibtex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description: `Publications by ${SITE.name}.`,
};

const BLUR_FADE_DELAY = 0.04;

export default function PublicationsPage() {
  const pubs = getPublications();
  const years = [...new Set(pubs.map((p) => p.year))];
  const scholar = SITE.social.find((s) => s.name === "Google Scholar");

  return (
    <main className="flex flex-col gap-14">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <PageHeading
          label="Publications"
          title="Papers & Articles"
          description="* denotes equal contribution."
        />
        {scholar && (
          <p className="mt-3 text-center text-sm text-muted-foreground">
            An up-to-date list is also available on{" "}
            <a href={scholar.url} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
              Google Scholar
            </a>
            .
          </p>
        )}
      </BlurFade>

      {years.map((year, yi) => (
        <section key={year} className="flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 2 + yi * 0.05} inView>
            <div className="flex items-center gap-4">
              <h2 className="font-mono text-lg font-semibold tabular-nums">{year}</h2>
              <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
            </div>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {pubs
              .filter((p) => p.year === year)
              .map((pub, i) => (
                <BlurFade key={pub.key} delay={BLUR_FADE_DELAY * 3 + i * 0.05} inView>
                  <PublicationItem pub={pub} />
                </BlurFade>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
