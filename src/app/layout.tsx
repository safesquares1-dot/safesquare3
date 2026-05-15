import type { Metadata, Viewport } from "next";
import { Fraunces, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4ecdc",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: {
    default: "SafeSquare — A Small Book on Being Well",
    template: "%s · SafeSquare",
  },
  description:
    "SafeSquare is a multi-speciality mental health & wellbeing clinic. Counsellors, psychotherapists, psychologists, and wellness coaches — bound under one roof.",
  keywords: [
    "mental health",
    "wellbeing",
    "clinic",
    "therapy",
    "counselling",
    "psychology",
    "psychotherapy",
    "wellness coaching",
    "SafeSquare",
  ],
  openGraph: {
    title: "SafeSquare — A Small Book on Being Well",
    description:
      "A multi-speciality clinic for mental health and wellbeing. Bound under one roof.",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeSquare",
    description: "A small book on being well.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${garamond.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
