import SectionHeader from '../../../components/ui/SectionHeader';
import WorkflowTimeline from '../../../components/sections/WorkflowTimeline';

export default function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-transparent py-24  lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#C58A38]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/[0.04] blur-[110px]" />

      <div className="container relative z-10 px-6 lg:px-8">
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