import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture Studio | Architecture & Design",
  description:
    "Thoughtful architecture and considered design for residential and commercial spaces.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
