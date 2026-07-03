import Link from "next/link";
import { createPost } from "@/app/actions/blog";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="text-sm text-sage hover:text-sage-dark mb-2 inline-block"
        >
          ← Back to posts
        </Link>
        <h1 className="font-heading text-3xl font-semibold mb-1">New Blog Post</h1>
        <p className="text-stone text-sm">Create a new post for the blog.</p>
      </div>

      <div className="rounded-2xl bg-white border border-border p-6 sm:p-8 shadow-sm">
        <BlogForm action={createPost} submitLabel="Publish Post" />
      </div>
    </div>
  );
}
