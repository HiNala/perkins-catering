import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Signup",
  description: "Create an admin account for Perkins Catering.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
