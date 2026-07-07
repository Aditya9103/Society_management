import SectionHeader from '../../../components/ui/SectionHeader';
import ProblemSolutionGrid from '../../../components/sections/ProblemSolutionGrid';

export default function ProblemSolutionSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light-alt py-24 lg:py-32 text-text-primary-on-light">
      {/*
        Removed the stray `px-6 lg:px-8` that used to sit on this
        container below — `.container` already sets `padding-inline`
        from the shared `--container-padding` token (32px desktop /
        20px mobile). Adding a second Tailwind padding utility on the
        same physical property didn't add to it, it silently overrode
        it, so this section's horizontal padding was quietly different
        from every other section on the site. Let `.container` own it.
      */}
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