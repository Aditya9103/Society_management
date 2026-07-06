import SectionHeader from '../../../components/ui/SectionHeader';
import CompareTable from '../../../components/sections/CompareTable';

export default function CompareSection() {
  return (
    <section className="py-32 lg:py-40 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="container relative z-10">
        <SectionHeader
          eyebrow="Why Parapet"
          heading="Built further than visitor management."
          subtext="Most platforms solve one problem. Parapet is the only platform that covers security, finance, and operations in one integrated system."
          align="center"
          dark
          maxWidth="580px"
        />
        <div className="max-w-[700px] mx-auto">
          <CompareTable />
        </div>
      </div>
    </section>
  );
}
