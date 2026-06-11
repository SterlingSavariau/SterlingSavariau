import { Navbar } from "@/components/Navbar";
import { RichTextBlock } from "@/components/blocks/RichTextBlock";
import { getBlogPost, getBlogPosts } from "@/data/loaders";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatListDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

function formatDetailDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);

  if (!post) notFound();

  const richBlocks =
    post.Blocks?.filter((b) => b.__component === "components.rich-text") ?? [];

  const otherPosts = allPosts.filter((p) => p.Slug !== post.Slug).slice(0, 5);

  return (
    <div className="w-full max-w-[680px] mx-auto px-5">
      <Navbar />
      <section>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← BACK
        </Link>

        {post.publishedAt && (
          <p className="text-xs text-muted-foreground mb-8">
            {formatDetailDate(post.publishedAt)}
          </p>
        )}

        <h1 className="text-3xl font-medium text-foreground mb-8">
          {post.Title}
        </h1>

        {post.Description && (
          <>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {post.Description}
            </p>
            <div className="section-divider" />
          </>
        )}

        <div className="space-y-0 mt-8">
          {richBlocks.map((block) => (
            <RichTextBlock key={block.id} data={{ RichText: block.RichText }} />
          ))}
        </div>

        {otherPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
              More
            </p>
            <div className="flex flex-col">
              {otherPosts.map((p) => (
                <Link
                  key={p.documentId}
                  href={`/blog/${p.Slug}`}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0 group"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
                      {p.publishedAt ? formatListDate(p.publishedAt) : ""}
                    </span>
                    <span className="text-sm text-foreground group-hover:underline underline-offset-2">
                      {p.Title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
