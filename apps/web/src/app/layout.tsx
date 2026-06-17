import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
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
  title: "ShapeSoup — SVG Pattern Engine",
  description:
    "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
  metadataBase: new URL("https://shapesoup.vercel.app"),
  openGraph: {
    title: "ShapeSoup — SVG Pattern Engine",
    description:
      "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
    url: "https://shapesoup.vercel.app",
    siteName: "ShapeSoup",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShapeSoup — SVG Pattern Engine",
    description:
      "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
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
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
