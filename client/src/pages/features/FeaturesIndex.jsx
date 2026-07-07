import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { featuresData } from '../../data/featuresData';
import PageWrapper from '../../components/layout/PageWrapper';
import SectionHeader from '../../components/ui/SectionHeader';
import CTASection from '../../components/sections/CTASection';
import FAQSection from '../../components/sections/FAQSection';
import { faqData } from '../../data/faqData';
import FeatureCard from '@/components/ui/cards/FeatureCard';

export default function FeaturesIndex() {
  const [query, setQuery] = useState('');

  // Client-side filter — feature copy is static (data/featuresData.js),
  // so there's no reason to round-trip to a server for this.
  const filteredData = useMemo(() => {
    if (!query.trim()) return featuresData;
    const q = query.toLowerCase();
    const result = {};
    Object.entries(featuresData).forEach(([key, category]) => {
      const items = Object.fromEntries(
        Object.entries(category.items).filter(
          ([, feature]) =>
            feature.title.toLowerCase().includes(q) ||
            feature.description.toLowerCase().includes(q)
        )
      );
      if (Object.keys(items).length) {
        result[key] = { ...category, items };
      }
    });
    return result;
  }, [query]);

  const categories = Object.entries(featuresData);
  const hasResults = Object.keys(filteredData).length > 0;

  return (
    <PageWrapper title="All Features | Parapet">
      <div className="pt-32 pb-16 bg-surface-light text-text-primary-on-light min-h-screen">
        <div className="container">
          <SectionHeader
            eyebrow="Complete ERP"
            heading="Everything you need to run a modern society."
            subtext="From secure gate entry to automated billing and maintenance tracking, Parapet replaces 5 different apps with one unified platform."
            align="center"
            maxWidth="700px"
          />

          {/* Search */}
          <div className="max-w-md mx-auto mt-10 relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-on-light-faint)] pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search features…"
              aria-label="Search features"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--input-border-focus)] transition-colors"
            />
          </div>

          {/* Mobile category pills — previously there was zero category
              navigation below the lg breakpoint since the sidebar is
              `hidden lg:block`. This gives small screens the same jump-to
              navigation the sidebar gives desktop. */}
          <div className="flex lg:hidden gap-2 overflow-x-auto mt-8 pb-2 -mx-4 px-4">
            {categories.map(([key, category]) => (
              <a
                key={key}
                href={`#category-${key}`}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-[var(--surface-light-card)] border border-[var(--line-on-light)] text-[var(--text-on-light-muted)] whitespace-nowrap"
              >
                {category.title}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 mt-12">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-1">
                {categories.map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <a
                      key={key}
                      href={`#category-${key}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-on-light-muted)] font-medium hover:bg-[var(--surface-light-alt)] hover:text-[var(--text-on-light)] transition-colors"
                    >
                      <Icon size={18} className="text-[var(--accent)]" aria-hidden="true" />
                      {category.title}
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Content Area */}
            <div className="space-y-24">
              {!hasResults && (
                <p className="text-center text-[var(--text-on-light-muted)] py-16">
                  No features match &ldquo;{query}&rdquo;. Try a different search term.
                </p>
              )}
              {Object.entries(filteredData).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <section key={key} id={`category-${key}`} className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-6">
                      {/* was `bg-bd-subtle` — that class doesn't exist
                          anywhere in the token set, so this chip was
                          rendering with no background at all. */}
                      <div className="w-10 h-10 rounded-lg bg-[var(--accent-tint)] flex items-center justify-center">
                        <Icon size={20} className="text-[var(--accent)]" aria-hidden="true" />
                      </div>
                      <div>
                        {/* was a two-tone gradient from navy-950 to
                            Tailwind's default `slate-500` — slate isn't
                            part of this palette, and a decorative text
                            gradient isn't needed here. Plain, solid,
                            on-brand text reads cleaner. */}
                        <h2 className="text-2xl font-bold text-[var(--text-on-light)]">
                          {category.title}
                        </h2>
                        <p className="text-[var(--text-on-light-muted)] font-medium">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(category.items).map(([slug, feature]) => (
                        <FeatureCard
                          key={slug}
                          slug={slug}
                          title={feature.title}
                          description={feature.description}
                          icon={Icon}
                          tag={category.title}
                          hasDiagram={Boolean(feature.diagram)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <FAQSection faqs={faqData.administration} title="Technical FAQs" subtitle="Common questions about functionality and implementation." />
      <CTASection />
    </PageWrapper>
  );
}