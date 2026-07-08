import SectionHeader from '../../../components/ui/SectionHeader';
import WorkflowTimeline from '../../../components/sections/WorkflowTimeline';

export default function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-surface-light py-24 lg:py-32 text-text-primary-on-light">

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