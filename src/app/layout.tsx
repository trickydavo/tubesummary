import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TubeSummary - AI-Powered YouTube Video Summarizer",
  description: "Summarize YouTube videos using AI for security and technology briefings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
