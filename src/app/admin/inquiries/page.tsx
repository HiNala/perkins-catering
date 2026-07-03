import { getInquiries, getQuotes } from "@/lib/db";
import { InquiriesList } from "@/components/admin/InquiriesList";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  let inquiries: Awaited<ReturnType<typeof getInquiries>> = [];
  let quotes: Awaited<ReturnType<typeof getQuotes>> = [];
  try {
    [inquiries, quotes] = await Promise.all([getInquiries(), getQuotes()]);
  } catch (error) {
    console.error("[admin/inquiries] Failed to fetch:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold mb-1">Inquiries</h1>
        <p className="text-stone text-sm">
          All inquiry and quote submissions from the website.
        </p>
      </div>
      <InquiriesList inquiries={inquiries} quotes={quotes} />
    </div>
  );
}
