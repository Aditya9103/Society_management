import SectionHeader from '../../../components/ui/SectionHeader';
import WorkflowTimeline from '../../../components/sections/WorkflowTimeline';

export default function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light py-24 lg:py-32 text-text-primary-on-light">
      {/*
        Removed the stray `px-6 lg:px-8` — same issue found in
        ProblemSolutionSection.jsx. `.container` already sets
        `padding-inline` from the shared `--container-padding` token;
        a second Tailwind padding utility on the same property overrides
        it rather than adding to it, silently pulling this section's
        horizontal padding out of step with the rest of the site. Worth
        grepping the other Home section files for the same pattern —
        this is the second file in a row where it's shown up.
      */}
      <div className="container relative z-10">
        <SectionHeader
          eyebrow="How It Works"
          heading="Real workflows your team will actually use."
          subtext="Three processes that happen daily in every society — now running on a single, connected platform instead of phone calls and WhatsApp threads."
          align="center"
          maxWidth="600px"
        />
        <WorkflowTimeline />
      </div>
    </section>
  );
}