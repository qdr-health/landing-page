import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QDR Health",
  description:
    "Clinicians and engineers building AI for better patient care. Toju is an AI voice agent for proactive patient outreach and triage.",
  openGraph: {
    title: "QDR Health",
    description:
      "Clinicians and engineers building AI for better patient care.",
    images: [
      {
        url: "/logo.png",
        width: 2000,
        height: 2000,
        alt: "QDR Health Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QDR Health",
    description:
      "Clinicians and engineers building AI for better patient care.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
