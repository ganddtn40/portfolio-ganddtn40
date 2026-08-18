import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { CursorLayer } from "@/components/ui/cursor-layer";
import { DotPatternLayer } from "@/components/ui/dot-pattern-layer";
import { LoaderProvider } from "@/components/ui/loader-provider";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteDescription =
  "Portfolio of ganddtn40, a Full Stack Web Developer from Indonesia specializing in TypeScript, Next.js, PHP, SQL, and Dart. Terminal-first, gothic aesthetic.";

export const metadata: Metadata = {
  title: "ganddtn40 | Full Stack Web Developer",
  description: siteDescription,
  keywords: [
    "Full Stack Developer",
    "Backend Developer",
    "Next.js Portfolio",
    "ganddtn40",
    "lyhsjaa",
    "Indonesia Developer",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/favicon.ico" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  openGraph: {
    title: "ganddtn40 | Full Stack Web Developer",
    description: siteDescription,
    type: "website",
    locale: "en_US",
    images: [{ url: SITE.avatar }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ganddtn40 | Full Stack Web Developer",
    description: siteDescription,
    images: [SITE.avatar],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <DotPatternLayer />
        <CursorLayer />
        <LoaderProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
