import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shapesoup.com"),
  title: {
    default: "ShapeSoup — SVG Pattern Engine",
    template: "%s — ShapeSoup",
  },
  description:
    "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
  icons: {
    icon: [
      { url: "/shapesoup-logo.svg", type: "image/svg+xml" },
      { url: "/shapesoupLogo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/shapesoupLogo.png", type: "image/png", sizes: "180x180" },
    shortcut: "/shapesoupLogo.png",
  },
  openGraph: {
    title: "ShapeSoup — SVG Pattern Engine",
    description:
      "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
    url: "https://www.shapesoup.com",
    siteName: "ShapeSoup",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/metaThumbnail.png?v=2",
        width: 1200,
        height: 630,
        alt: "ShapeSoup — SVG Pattern Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShapeSoup — SVG Pattern Engine",
    description:
      "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
    images: ["/metaThumbnail.png?v=2"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kalam.variable} ${patrickHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
