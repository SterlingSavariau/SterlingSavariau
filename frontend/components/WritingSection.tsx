import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBlogPosts } from "@/data/loaders";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function estimateReadTime(text: string | null): string {
  if (!text) return "1 min";
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

export async function WritingSection({ data: _ }: { data: unknown }) {
  const posts = await getBlogPosts(5);
  if (posts.length === 0) return null;

  return (
    <section id="thoughts" className="mb-16" aria-label="Writing">
      <div className="section-divider" />
      <div className="flex items-center justify-between mb-5">
        <p className="section-label">Writing</p>
        <Link
          href="/blog"
          className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          All posts
          <ArrowUpRight size={10} aria-hidden />
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.documentId}
            href={`/blog/${post.Slug}`}
            className="group grid grid-cols-[60px_1fr_14px] gap-x-5 items-start hover:opacity-80 transition-opacity"
            aria-label={`Read: ${post.Title}`}
          >
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 pt-0.5 leading-5">
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground mb-1 group-hover:underline underline-offset-4">
                {post.Title}
              </p>
              {post.Description && (
                <p className="text-[12px] leading-relaxed text-muted-foreground">
                  {post.Description}
                </p>
              )}
              <span className="inline-block mt-1.5 font-mono text-[10px] tracking-widest text-muted-foreground/50">
                {estimateReadTime(post.Description)} read
              </span>
            </div>
            <ArrowUpRight
              size={12}
              className="text-muted-foreground/40 group-hover:text-foreground transition-colors mt-0.5"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
