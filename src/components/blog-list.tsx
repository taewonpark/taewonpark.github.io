"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { cn, formatDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type PostSummary = {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
};

const BLUR_FADE_DELAY = 0.04;

// Post list with client-side tag filtering (static export has no query-string rendering).
export function BlogList({ posts }: { posts: PostSummary[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();
  const visible = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border px-4 py-12">
        <p className="text-center text-muted-foreground">No notes yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {tags.length > 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-wrap gap-1.5">
            {[null, ...tags].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                onClick={() => setTag(t)}
                className={cn(
                  "h-7 rounded-md border border-border px-2.5 text-xs transition-colors",
                  tag === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t ?? "All"}
              </button>
            ))}
          </div>
        </BlurFade>
      )}
      <div className="flex flex-col gap-5">
        {visible.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
            <Link
              className="group flex cursor-pointer items-start gap-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`/blog/${post.slug}/`}
            >
              <span className="mt-[5px] font-mono text-xs font-medium tabular-nums">
                {String(id + 1).padStart(2, "0")}.
              </span>
              <div className="flex flex-1 flex-col gap-y-1.5">
                <p className="text-lg font-medium tracking-tight">
                  <span className="transition-colors group-hover:text-foreground">
                    {post.title}
                    <ChevronRight
                      className="ml-1 inline-block size-4 -translate-x-2 stroke-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">{post.summary}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.publishedAt)}
                  {post.tags.length > 0 && ` · ${post.tags.join(", ")}`}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
