"use client";

import { useActionState } from "react";
import type { BlogFormState } from "@/app/actions/blog";
import type { BlogPostRecord } from "@/lib/db";

interface BlogFormProps {
  action: (state: BlogFormState | undefined, formData: FormData) => Promise<BlogFormState>;
  post?: BlogPostRecord;
  submitLabel?: string;
}

export function BlogForm({ action, post, submitLabel = "Publish Post" }: BlogFormProps) {
  const [state, formAction, pending] = useActionState<BlogFormState | undefined, FormData>(
    action,
    undefined
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title <span className="text-sage">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={post?.title ?? ""}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage"
          placeholder="e.g. Farm-to-Table Catering Tips"
        />
        {state?.errors?.title && (
          <p className="text-sm text-red-600 mt-1">{state.errors.title[0]}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2">
          Slug <span className="text-stone text-xs">(leave blank to auto-generate)</span>
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={post?.slug ?? ""}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage font-mono text-sm"
          placeholder="farm-to-table-catering-tips"
        />
        {state?.errors?.slug && (
          <p className="text-sm text-red-600 mt-1">{state.errors.slug[0]}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          Excerpt <span className="text-sage">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          required
          defaultValue={post?.excerpt ?? ""}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage resize-none"
          placeholder="A short summary shown on the blog list and in search results."
        />
        {state?.errors?.excerpt && (
          <p className="text-sm text-red-600 mt-1">{state.errors.excerpt[0]}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content <span className="text-sage">*</span>
          <span className="text-stone text-xs ml-2">(Markdown supported — use ## for headings)</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          required
          defaultValue={post?.content ?? ""}
          className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage font-mono text-sm leading-relaxed"
          placeholder="## Your Heading&#10;&#10;Write your post content here..."
        />
        {state?.errors?.content && (
          <p className="text-sm text-red-600 mt-1">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cover image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
            Cover Image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="text"
            defaultValue={post?.coverImage ?? ""}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage"
            placeholder="/images/gallery/gallery-01.jpg"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={post?.author ?? "Austin Perkins"}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage"
          />
        </div>

        {/* Published at */}
        <div>
          <label htmlFor="publishedAt" className="block text-sm font-medium mb-2">
            Publish Date <span className="text-sage">*</span>
          </label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="date"
            required
            defaultValue={post ? formatDate(post.publishedAt) : formatDate(new Date().toISOString())}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage"
          />
          {state?.errors?.publishedAt && (
            <p className="text-sm text-red-600 mt-1">{state.errors.publishedAt[0]}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={post?.status ?? "published"}
            className="w-full px-4 py-3 rounded-lg border-2 border-border bg-white focus:outline-none focus:border-sage"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {state?.message && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">
          {state.message}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <a
          href="/admin/blog"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-lg text-charcoal hover:bg-cream-dark transition-all"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-lg bg-sage text-white hover:bg-sage-dark transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
