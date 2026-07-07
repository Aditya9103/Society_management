import { motion } from 'framer-motion';
import { Trophy, Users, ShieldCheck, Heart, User } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import CTASection from '../components/sections/CTASection';
import FAQSection from '../components/sections/FAQSection';
import { faqData } from '../data/faqData';

/**
 * Fixes vs. the previous version:
 *
 * 1. `bg-gradient-to-br from-[var(--navy-950)] to-slate-500` appeared
 *    TWICE in this file (hero H1, "What drives us" H2) — same off-palette
 *    bug already fixed in the shared SectionHeader component, but this
 *    page wasn't using that component for either heading, so the fix
 *    there never reached here. Fixed directly, and the second heading
 *    now goes through the shared SectionHeader so future token changes
 *    only need to happen in one place.
 * 2. `var(--brass)` isn't a real token (used for the hero highlight span
 *    and the value-card icons) — the real token is `--accent`. Fourth
 *    file in a row with a variant of this exact typo.
 * 3. `text-slate-800` (value titles) and
 *    `bg-gradient-to-br from-slate-200 to-slate-300` (team photo
 *    placeholder) are off-palette Tailwind defaults, not tokens from
 *    this design system — same "slate" leak as the earlier
 *    SectionHeader and MobilePWASection bugs.
 * 4. `team.map((member) => ... key={member.name} ...)` — both team
 *    entries currently have `name: ''`, so both array items share the
 *    identical (empty) React key. That's a real bug (React will warn
 *    about duplicate keys and reconciliation becomes unreliable), not
 *    just an empty-content issue. Fixed by keying on array index.
 *    Separately: an empty name was rendering as a visibly blank bold
 *    heading above the role — the card now falls back gracefully
 *    instead of showing an empty heading, but you'll want to fill in
 *    the real names before this ships.
 * 5. The team grid was `md:grid-cols-4` for only 2 entries, leaving two
 *    empty, lopsided gaps on desktop. Narrowed to fit the actual count;
 *    it'll still scale cleanly if more members are added later.
 * 6. `font-medium font-medium` duplicate class on the team role text —
 *    harmless but a clear copy-paste leftover, cleaned up.
 *
 * Visual changes: the values section now uses the same white-card
 * treatment as FeatureCard / ProblemCard elsewhere on the site instead
 * of a bare icon+text row — this page previously had zero cards despite
 * every other page being built around them. Team placeholders use a
 * proper "no photo" avatar state (icon on a neutral tile) instead of a
 * random gradient block. Added a stat strip under the mission statement
 * reusing the same figures already established in the Home hero, for
 * cross-page consistency rather than inventing new numbers.
 */
const values = [
  {
    icon: ShieldCheck,
    title: 'Trust First',
    desc: 'We are stewards of your most sensitive community data. We build everything with privacy and security as the baseline, not an afterthought.',
  },
  {
    icon: Users,
    title: 'Community Centric',
    desc: 'Technology should bring people together. Every feature we build is designed to foster harmony and reduce friction among neighbors.',
  },
  {
    icon: Heart,
    title: 'Empathy in Support',
    desc: 'We know that managing a society is a thankless, 24/7 volunteer job. Our support team treats committee members with the respect they deserve.',
  },
  {
    icon: Trophy,
    title: 'Relentless Excellence',
    desc: 'We refuse to accept the status quo of clunky, outdated software. We bring consumer-grade, beautiful design to enterprise operations.',
  },
];

const team = [
  { name: '', role: 'Founder & CEO' },
  { name: '', role: 'Head of Product' },
];

const stats = [
  { value: '100+', label: 'societies onboarded' },
  { value: '50000+', label: 'residents managed' },
  { value: '99.95%', label: 'uptime, last 12 months' },
];

export default function About() {
  return (
    <PageWrapper
      title="About Us | Parapet"
      description="The story behind Parapet and our mission to modernize society management."
    >
      <div className="pt-32 pb-24 bg-surface-light text-text-primary-on-light min-h-screen">
        {/* Mission */}
        <section className="container mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-tint)] text-sm font-bold text-[var(--accent-hover)] mb-8"
            >
              Our Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--text-on-light)] mb-8 leading-[1.1]"
            >
              We're building the <br />
              <span className="text-[var(--accent)]">operating system</span> <br />
              for modern living.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-[var(--text-on-light-muted)] leading-relaxed font-medium max-w-3xl mx-auto mb-12"
            >
              Parapet was born out of frustration. We saw managing committees struggling with 5
              different tools for billing, gate security, and communication. We knew there had to
              be a better, more beautiful way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-[var(--line-on-light)] pt-8 mono text-[13px] text-[var(--text-on-light-muted)]"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="text-[var(--accent-hover)] font-bold">{s.value}</span> {s.label}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-surface-light-alt py-24 border-y border-[var(--line-on-light)]">
          <div className="container">
            <SectionHeader
              eyebrow="What Drives Us"
              heading="Values that dictate every decision."
              subtext="These aren't wall art — they're what we actually check a feature against before we ship it."
              maxWidth="640px"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-8 rounded-[20px] border border-[var(--line-on-light)] bg-[var(--surface-light-card)] shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent-tint)] flex items-center justify-center shrink-0">
                      <Icon size={26} className="text-[var(--accent)]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-on-light)] mb-2.5">{val.title}</h3>
                      <p className="text-[15px] text-[var(--text-on-light-muted)] leading-relaxed font-medium">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-on-light)] mb-4">Meet the team</h2>
            <p className="text-xl text-[var(--text-on-light-muted)] font-medium">
              Built by a passionate team of engineers and community builders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-3xl bg-[var(--surface-light-alt)] border border-[var(--line-on-light)] mb-6 flex items-center justify-center">
                  <User size={40} className="text-[var(--text-on-light-faint)]" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-on-light)] mb-1">
                  {member.name || <span className="text-[var(--text-on-light-faint)] font-normal italic">Name coming soon</span>}
                </h3>
                <p className="text-[var(--text-on-light-muted)] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <FAQSection faqs={faqData.about} title="Security & Trust FAQs" subtitle="Common questions about data privacy and compliance." />

      <CTASection />
    </PageWrapper>
  );
}