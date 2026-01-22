import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type StaticPageProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
};

export default function StaticPage({ eyebrow, title, lead, children }: StaticPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <header className="py-16 md:py-20 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl">
              {eyebrow ? (
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                  {eyebrow}
                </span>
              ) : null}
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight">{title}</h1>
              {lead ? <p className="mt-4 text-muted-foreground leading-relaxed">{lead}</p> : null}
            </div>
          </div>
        </header>

        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
