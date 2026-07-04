"use client";

import { useTransition, useState } from "react";
import { deletePost } from "@/app/actions/blog";

export function DeletePostButton({ id, title }: { id: number; title: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      setError(null);
      startTransition(async () => {
        try {
          await deletePost(id);
        } catch (err) {
          setError("Failed to delete post. Please try again.");
          console.error("Delete failed:", err);
        }
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={pending}
        className="px-3 py-1.5 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        aria-label={`Delete ${title}`}
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}
