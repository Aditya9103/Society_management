import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuresData } from '../../data/featuresData';
import PageWrapper from '../../components/layout/PageWrapper';
import CTASection from '../../components/sections/CTASection';
import Button from '../../components/ui/Button';
import MermaidDiagram from '../../components/ui/MermaidDiagram';
import FAQSection from '../../components/sections/FAQSection';
import { faqData } from '../../data/faqData';

export default function FeaturePage() {
  const { slug } = useParams();

  let feature = null;
  let categoryName = '';
  let categoryKey = '';
  let Icon = null;
  let siblingItems = {};

  for (const [key, category] of Object.entries(featuresData)) {
    if (category.items[slug]) {
      feature = category.items[slug];
      categoryName = category.title;
      categoryKey = key;
      Icon = category.icon;
      siblingItems = category.items;
      break;
    }
  }

  if (!feature) {
    return <Navigate to="/features" replace />;
  }

  // Was entirely missing from the previous version despite being in the
  // original spec — this is what turns 25 isolated pages into a browsable
  // section instead of a dead end after reading one feature.
  const relatedFeatures = Object.entries(siblingItems)
    .filter(([s]) => s !== slug)
    .slice(0, 3);

  return (
    <PageWrapper title={`${feature.title} | Parapet`}>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[var(--surface-dark-deepest)] bp-grid-dark text-[var(--text-on-dark)] overflow-hidden relative">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent-on-dark)] mb-6 tracking-wider uppercase mono">
              <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              <span className="text-[var(--text-on-dark-faint)]">/</span>
              <Link to={`/features#category-${categoryKey}`} className="hover:text-white transition-colors">
                {categoryName}
              </Link>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {Icon && (
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-[var(--line-on-dark)] flex items-center justify-center shrink-0">
                  <Icon size={26} className="text-[var(--accent-on-dark)]" aria-hidden="true" />
                </div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                {feature.title}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-[var(--text-on-dark-muted)] leading-relaxed mb-8 max-w-2xl"
            >
              {feature.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button as={Link} to="/book-demo" variant="brass" size="lg">
                Book a Free Demo
              </Button>
              <span className="text-sm text-[var(--text-on-dark-faint)] mono">
                Part of {categoryName} · {Object.keys(siblingItems).length} features
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-surface-light-alt text-text-primary-on-light">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Preview panel — was a plain centered icon + caption.
                Now framed like a lightweight app window so an empty
                preview still looks intentional rather than unfinished. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-[var(--line-on-light)] shadow-xl overflow-hidden bg-white"
            >
              {feature.previewImage ? (
                <img
                  src={feature.previewImage}
                  alt={`${feature.title} preview`}
                  className="w-full h-full object-cover aspect-square md:aspect-video lg:aspect-square"
                />
              ) : (
                <div className="aspect-square md:aspect-video lg:aspect-square flex flex-col">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--line-on-light)] bg-[var(--surface-light)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-alert)]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--status-live)]/70" />
                    <span className="ml-3 mono text-[11px] text-[var(--text-on-light-faint)] tracking-wide truncate">
                      parapet.app/{slug}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center bp-grid-light relative">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 flex items-center justify-center border border-[var(--line-on-light)]">
                      {Icon && <Icon size={30} className="text-[var(--accent)]" aria-hidden="true" />}
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-on-light)] mb-1">{feature.title}</h3>
                    <p className="text-sm text-[var(--text-on-light-muted)] mono">Live preview coming soon</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Benefits + How it works */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[var(--text-on-light)] mb-8">
                  Why use {feature.title}?
                </h2>
                <div className="space-y-1">
                  {feature.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors"
                    >
                      <div className="mt-1 shrink-0">
                        <div className="w-7 h-7 rounded-full bg-[var(--accent-tint)] flex items-center justify-center">
                          <CheckCircle2 size={15} className="text-[var(--accent)]" aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[var(--text-on-light)] mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-[var(--text-on-light-muted)] leading-relaxed text-[15px]">
                          {benefit.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Was a plain numbered grid of boxes. Reworked as a
                  connected timeline to match the visual language the
                  rest of the site already uses for step sequences
                  (visitor entry, complaints, SOS) — same motif,
                  consistent everywhere it shows up. */}
              <div className="pt-8 border-t border-[var(--line-on-light)]">
                <h3 className="text-xl font-bold text-[var(--text-on-light)] mb-6">How it works</h3>
                <div className="relative pl-2">
                  {feature.steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
                      {idx < feature.steps.length - 1 && (
                        <span className="absolute left-[15px] top-8 bottom-0 w-px bg-[var(--line-on-light)]" />
                      )}
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[var(--accent)] flex items-center justify-center text-[var(--accent)] font-bold text-sm shrink-0 z-10">
                        {idx + 1}
                      </div>
                      <p className="font-medium text-[var(--text-on-light)] pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow diagram */}
      {feature.diagram && (
        <section className="py-20 bg-surface-dark bp-grid-dark text-text-primary-on-dark border-t border-[var(--line-on-dark)]">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="mono text-[11px] uppercase tracking-widest text-[var(--accent-on-dark)]">
                  Architecture
                </span>
                <h2 className="text-3xl font-bold text-[var(--text-on-dark)] mt-3 mb-4">
                  Workflow diagram
                </h2>
                <p className="text-[var(--text-on-dark-muted)] text-lg">
                  Understanding the core operational flow behind this feature.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-[var(--line-on-dark)] shadow-2xl overflow-hidden">
                <MermaidDiagram chart={feature.diagram} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related features */}
      {relatedFeatures.length > 0 && (
        <section className="py-20 bg-surface-light text-text-primary-on-light border-t border-[var(--line-on-light)]">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <h3 className="text-2xl font-bold text-[var(--text-on-light)]">
                More in {categoryName}
              </h3>
              <Link
                to={`/features#category-${categoryKey}`}
                className="text-sm font-medium text-[var(--accent)] flex items-center gap-1 hover:gap-2 transition-all shrink-0"
              >
                View all <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedFeatures.map(([relSlug, relFeature]) => (
                <Link
                  key={relSlug}
                  to={`/features/${relSlug}`}
                  className="group block p-6 rounded-2xl border border-[var(--line-on-light)] bg-white hover:border-[var(--accent)]/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-bold text-[var(--text-on-light)] mb-2 flex items-center justify-between gap-2">
                    <span>{relFeature.title}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-[var(--text-on-light-faint)] group-hover:text-[var(--accent)] transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </h4>
                  <p className="text-sm text-[var(--text-on-light-muted)] leading-relaxed line-clamp-2">
                    {relFeature.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic FAQ Section based on feature */}
      {(() => {
        const faqCategory = faqData[slug];
        
        if (faqCategory && faqCategory.length > 0) {
          return <FAQSection faqs={faqCategory} title={`${feature.title} FAQs`} subtitle={`Common questions about ${feature.title.toLowerCase()}.`} />;
        }
        return null;
      })()}

      <CTASection
        heading={`Ready to implement ${feature.title}?`}
        subtext="See it in action with a personalized demo for your society."
      />
    </PageWrapper>
  );
}