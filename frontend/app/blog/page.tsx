import { Navbar } from "@/components/Navbar";
import { getBlogPosts } from "@/data/loaders";
import Link from "next/link";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="w-full max-w-[520px] mx-auto px-5">
      <Navbar />
      <section>
        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
          Writing
        </p>
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.documentId}
              href={`/blog/${post.Slug}`}
              className="flex items-center justify-between py-3 border-b border-border last:border-0 group"
            >
              <div className="flex items-center gap-5">
                <span className="text-xs text-muted-foreground w-16 flex-shrink-0">
                  {post.publishedAt ? formatDate(post.publishedAt) : ""}
                </span>
                <span className="text-sm text-foreground group-hover:underline underline-offset-2">
                  {post.Title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
