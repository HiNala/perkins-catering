import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/db";
import { updatePost } from "@/app/actions/blog";
import { BlogForm } from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) notFound();

  const post = await getBlogPostById(id);
  if (!post) notFound();

  const updateAction = updatePost.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="text-sm text-sage hover:text-sage-dark mb-2 inline-block"
        >
          ← Back to posts
        </Link>
        <h1 className="font-heading text-3xl font-semibold mb-1">Edit Post</h1>
        <p className="text-stone text-sm">Editing: {post.title}</p>
      </div>

      <div className="rounded-2xl bg-white border border-border p-6 sm:p-8 shadow-sm">
        <BlogForm action={updateAction} post={post} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
