import SectionHeader from '../../../components/ui/SectionHeader';
import ProblemSolutionGrid from '../../../components/sections/ProblemSolutionGrid';

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light-alt py-24 lg:py-32 text-text-primary-on-light">
      <div className="container relative">
        <SectionHeader
          eyebrow="Why Societies Switch"
          heading="Replace the chaos. Run on structure."
          subtext="Every problem below is something a real committee is dealing with today. Parapet replaces each one with a digital workflow."
          align="center"
          maxWidth="560px"
        />
        <ProblemSolutionGrid />
      </div>
    </section>
  );
}