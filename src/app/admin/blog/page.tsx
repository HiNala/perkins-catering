import Link from "next/link";
import { getBlogPostsAdmin } from "@/lib/db";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogPostsAdmin>> = [];
  try {
    posts = await getBlogPostsAdmin();
  } catch (error) {
    console.error("[admin/blog] Failed to fetch posts:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold mb-1">Blog Posts</h1>
          <p className="text-stone text-sm">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium uppercase tracking-wider rounded-lg bg-sage text-white hover:bg-sage-dark transition-all"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl bg-white border border-border p-12 text-center">
          <p className="text-stone mb-4">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="text-sage hover:text-sage-dark font-medium text-sm"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl bg-white border border-border shadow-sm p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-charcoal truncate">{post.title}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${
                      post.status === "published"
                        ? "bg-sage/10 text-sage"
                        : "bg-stone/15 text-stone"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-xs text-stone mt-1">
                  /{post.slug} · {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {post.author}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium rounded-md border border-border text-charcoal hover:border-sage hover:text-sage transition-colors"
                >
                  Edit
                </Link>
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="px-3 py-1.5 text-xs font-medium rounded-md text-sage hover:text-sage-dark transition-colors"
                  >
                    View
                  </Link>
                )}
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
