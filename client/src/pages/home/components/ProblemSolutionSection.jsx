import SectionHeader from '../../../components/ui/SectionHeader';
import ProblemSolutionGrid from '../../../components/sections/ProblemSolutionGrid';

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      {/* Soft depth, matches hero's mesh without competing with it */}
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#C58A38]/[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-emerald-500/[0.03] blur-[100px]" />

      <div className="container relative px-6 lg:px-8">
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