import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landingPage";

export const metadata: Metadata = {
  title: "ShapeSoup — SVG Pattern Engine",
  description: "A seed-based SVG generative pattern engine. Beautiful, deterministic, scalable backgrounds from a config + seed.",
};

export default function Home() {
  return <LandingPage />;
}
