import SectionHeader from '../../../components/ui/SectionHeader';
import CompareTable from '../../../components/sections/CompareTable';

export default function CompareSection() {
  return (
    <section className="py-32 lg:py-40 bg-surface-dark bp-grid-dark relative overflow-hidden text-text-primary-on-dark">
      <div className="container relative z-10">
        <SectionHeader
          eyebrow="Why Parapet"
          heading="Built further than visitor management."
          subtext="Most platforms solve one problem. Parapet is the only platform that covers security, finance, and operations in one integrated system."
          align="center"
          maxWidth="580px"
          dark={true}
        />
        {/*
          Widened from 700px to 760px — the table's feature-name column
          now gets more room than the two value columns (was an even
          three-way split), so it benefits from slightly more breathing
          room than before.
        */}
        <div className="max-w-[760px] mx-auto">
          <CompareTable />
        </div>
      </div>
    </section>
  );
}