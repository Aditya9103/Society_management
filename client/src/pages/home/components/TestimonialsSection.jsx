import SectionHeader from '../../../components/ui/SectionHeader';
import TestimonialGrid from '../../../components/sections/TestimonialGrid';

export default function TestimonialsSection() {
  return (
    <section className="py-32 lg:py-40 bg-[var(--surface-light)] border-y border-[var(--line-on-light)] text-[var(--text-on-light)]">
      <div className="container">
        <SectionHeader
          eyebrow="Customer Stories"
          heading="What committees say after 3 months."
          align="center"
          maxWidth="480px"
        />
        <TestimonialGrid />
      </div>
    </section>
  );
}
