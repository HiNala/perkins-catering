import { verifySession } from "@/lib/dal";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <div className="min-h-screen bg-cream-dark flex flex-col lg:flex-row">
      <AdminNav userEmail={session.email} />
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </div>
    </div>
  );
}
