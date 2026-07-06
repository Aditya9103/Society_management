import SectionHeader from '../../../components/ui/SectionHeader';
import TestimonialGrid from '../../../components/sections/TestimonialGrid';

export default function TestimonialsSection() {
  return (
    <section className="py-32 lg:py-40 bg-transparent border-y border-bd-subtle/60">
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
