/**
 * Minimal, dependency-free Markdown renderer.
 * Supports: ## / ### headings, paragraphs, unordered lists, and **bold** / *italic* inline.
 * Sufficient for the blog post content stored in the database.
 */

import { cn } from "@/lib/utils";

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Split on **bold** and *italic* while keeping delimiters
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={i}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith("*") && part.endsWith("*")) {
      nodes.push(<em key={i}>{part.slice(1, -1)}</em>);
    } else if (part) {
      nodes.push(<span key={i}>{part}</span>);
    }
  });
  return nodes;
}

export function Markdown({ content, className }: { content: string; className?: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={`ul-${key++}`} className="space-y-2 my-5 pl-1">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-3 text-charcoal/80 leading-relaxed">
              <span className="text-sage mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sage" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={`h2-${key++}`} className="font-heading text-2xl sm:text-3xl font-semibold mt-10 mb-4 text-charcoal">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={`h3-${key++}`} className="font-heading text-xl sm:text-2xl font-semibold mt-8 mb-3 text-charcoal">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={`p-${key++}`} className="text-charcoal/80 leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <div className={cn("prose-blog", className)}>{blocks}</div>;
}
