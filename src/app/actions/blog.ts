/**
 * Server Actions for blog post CRUD.
 */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
} from "@/lib/db";
import { verifySession } from "@/lib/dal";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().default(""),
  author: z.string().default("Austin Perkins"),
  status: z.enum(["published", "draft"]),
  publishedAt: z.string().min(1, "Publish date is required"),
});

export interface BlogFormState {
  errors?: {
    title?: string[];
    slug?: string[];
    excerpt?: string[];
    content?: string[];
    coverImage?: string[];
    author?: string[];
    status?: string[];
    publishedAt?: string[];
  };
  message?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export async function createPost(
  state: BlogFormState | undefined,
  formData: FormData
): Promise<BlogFormState> {
  await verifySession();
  const rawSlug = (formData.get("slug") as string) || "";
  const data = postSchema.safeParse({
    title: formData.get("title"),
    slug: rawSlug || slugify((formData.get("title") as string) || ""),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || "",
    author: formData.get("author") || "Austin Perkins",
    status: formData.get("status") || "published",
    publishedAt: formData.get("publishedAt"),
  });

  if (!data.success) {
    return { errors: data.error.flatten().fieldErrors as BlogFormState["errors"] };
  }

  try {
    await createBlogPost({
      title: data.data.title,
      slug: data.data.slug,
      excerpt: data.data.excerpt,
      content: data.data.content,
      coverImage: data.data.coverImage,
      author: data.data.author,
      status: data.data.status,
      publishedAt: data.data.publishedAt,
    });
  } catch (err) {
    return {
      message:
        err instanceof Error && err.message.includes("unique")
          ? "A post with this slug already exists."
          : "Failed to create post.",
    };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(
  id: number,
  state: BlogFormState | undefined,
  formData: FormData
): Promise<BlogFormState> {
  await verifySession();
  const rawSlug = (formData.get("slug") as string) || "";
  const data = postSchema.safeParse({
    title: formData.get("title"),
    slug: rawSlug || slugify((formData.get("title") as string) || ""),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage") || "",
    author: formData.get("author") || "Austin Perkins",
    status: formData.get("status") || "published",
    publishedAt: formData.get("publishedAt"),
  });

  if (!data.success) {
    return { errors: data.error.flatten().fieldErrors as BlogFormState["errors"] };
  }

  try {
    const existingPost = await getBlogPostById(id);
    await updateBlogPost(id, {
      title: data.data.title,
      slug: data.data.slug,
      excerpt: data.data.excerpt,
      content: data.data.content,
      coverImage: data.data.coverImage,
      author: data.data.author,
      status: data.data.status,
      publishedAt: data.data.publishedAt,
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.data.slug}`);
    if (existingPost && existingPost.slug !== data.data.slug) {
      revalidatePath(`/blog/${existingPost.slug}`);
    }
    revalidatePath("/admin/blog");
  } catch (err) {
    return {
      message:
        err instanceof Error && err.message.includes("unique")
          ? "A post with this slug already exists."
          : "Failed to update post.",
    };
  }

  redirect("/admin/blog");
}

export async function deletePost(id: number): Promise<void> {
  await verifySession();
  const post = await getBlogPostById(id);
  await deleteBlogPost(id);
  if (post) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
