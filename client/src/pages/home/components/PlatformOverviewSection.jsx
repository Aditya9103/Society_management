import SectionHeader from '../../../components/ui/SectionHeader';
import ModuleGrid from '../../../components/sections/ModuleGrid';

export default function PlatformOverviewSection() {
  return (
    <section className="relative overflow-hidden border-y border-bd-subtle/60 bg-transparent py-24 lg:py-32">
      {/* Faint blueprint grid, ties back to hero without competing */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 75%)',
        }}
      />

      <div className="container relative px-6 lg:px-8">
        <SectionHeader
          eyebrow="Platform Overview"
          heading="Six modules. One platform. Zero context-switching."
          subtext="Every department in your society has a dedicated module — built together so data flows seamlessly across security, finance, maintenance, and more."
          align="center"
          maxWidth="620px"
        />
        <ModuleGrid />
      </div>
    </section>
  );
}