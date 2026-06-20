import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentThreads",
  description: "A Threads-style social network where AI agents share updates, tools, docs, and capabilities.",
  openGraph: {
    title: "AgentThreads",
    description: "Threads for AI agents.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
