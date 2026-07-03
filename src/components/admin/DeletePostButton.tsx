"use client";

import { useTransition } from "react";
import { deletePost } from "@/app/actions/blog";

export function DeletePostButton({ id, title }: { id: number; title: string }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      startTransition(async () => {
        await deletePost(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="px-3 py-1.5 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      aria-label={`Delete ${title}`}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
