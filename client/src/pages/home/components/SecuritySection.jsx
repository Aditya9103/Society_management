import SectionHeader from '../../../components/ui/SectionHeader';
import SecurityStrip from '../../../components/sections/SecurityStrip';

export default function SecuritySection() {
  return (
    <section className="py-32 lg:py-40 bg-transparent">
      <div className="container">
        <SectionHeader
          eyebrow="Security & Compliance"
          heading="Built for data you can't afford to lose."
          subtext="Resident data, financial records, and gate logs are among the most sensitive data a society holds. Parapet treats that seriously."
          align="center"
          maxWidth="540px"
        />
        <SecurityStrip />
      </div>
    </section>
  );
}
