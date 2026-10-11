import BlurFade from "@/components/magicui/blur-fade";
import { BlogList } from "@/components/blog-list";
import { allPosts } from "content-collections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Notes",
  description: "Research notes on memory, modularity, and learning.",
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const posts = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(({ slug, title, publishedAt, summary, tags }) => ({ slug, title, publishedAt, summary, tags }));

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight">
          Research Notes{" "}
          <span className="ml-1 rounded-md border border-border bg-card px-2 py-1 text-sm text-muted-foreground">
            {posts.length} posts
          </span>
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Notes on papers, experiments, and ideas I&apos;m exploring.
        </p>
      </BlurFade>
      <BlogList posts={posts} />
    </section>
  );
}
