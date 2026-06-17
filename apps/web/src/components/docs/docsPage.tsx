import { DocsHeader } from "./docsHeader";
import { DocsFooter } from "./docsFooter";
import { DocsContent } from "./docsContent";

export function DocsPage() {
  return (
    <div className="min-h-screen bg-paper text-pencil">
      <DocsHeader />
      <main className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <DocsContent />
      </main>
      <DocsFooter />
    </div>
  );
}
