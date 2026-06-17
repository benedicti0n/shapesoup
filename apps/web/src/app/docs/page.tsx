import type { Metadata } from "next";
import { DocsPage } from "@/components/docs/docsPage";

export const metadata: Metadata = {
  title: "Docs — ShapeSoup",
  description: "API reference and documentation for @shapesoup/core. Generators, config types, presets, and utilities.",
};

export default function DocsRoute() {
  return <DocsPage />;
}
