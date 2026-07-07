import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Workflow } from 'lucide-react';
import { BaseCard } from './BaseCard';

/**
 * FeatureCard
 *
 * Fixes vs. the previous version:
 * - `bg-primary/10` / `text-primary` referenced a token ("primary") that
 *   doesn't exist anywhere in the design system — those classes were
 *   silently unstyled. Replaced with the real `--accent` / `--accent-tint`
 *   tokens used everywhere else in the app.
 * - `icon` used to be rendered as a raw emoji/text span. It now takes an
 *   actual lucide-react icon component, matching how icons are passed
 *   everywhere else (FeaturesIndex, FeaturePage).
 * - The card now owns its own <Link> and routing (via `slug`), a small
 *   department `tag`, and an optional "includes workflow diagram" footer
 *   badge — so a single component can represent a feature consistently
 *   wherever it's used, instead of the caller re-implementing the link
 *   and layout by hand each time.
 *
 * NOTE: this component now wraps itself in a <Link>. If you use
 * FeatureCard anywhere that previously wrapped it in an outer <Link> or
 * used it as a non-clickable summary card, remove the outer wrapper (or
 * ask me to add an `asLink=false` variant) to avoid nested <a> tags.
 */
export const FeatureCard = memo(function FeatureCard({
  slug,
  title,
  description,
  icon: Icon,
  tag,
  hasDiagram = false,
  className = '',
}) {
  return (
    <Link to={`/features/${slug}`} className={`block group ${className}`}>
      <BaseCard className="relative h-full p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--accent)]/40">
        {/* top accent line, reveals on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-5">
            <div className="w-11 h-11 rounded-xl bg-[var(--accent-tint)] flex items-center justify-center text-[var(--accent)] transition-colors duration-300 group-hover:bg-[var(--accent)] group-hover:text-[var(--navy-900)]">
              {Icon && <Icon size={20} strokeWidth={2} aria-hidden="true" />}
            </div>
            <ArrowUpRight
              size={18}
              className="text-[var(--text-on-light-faint)] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[var(--accent)] transition-all duration-300"
              aria-hidden="true"
            />
          </div>

          {tag && (
            <span className="mono text-[11px] uppercase tracking-widest text-[var(--text-on-light-faint)] mb-2">
              {tag}
            </span>
          )}

          <h3 className="text-lg font-bold text-[var(--text-on-light)] mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-[15px] text-[var(--text-on-light-muted)] leading-relaxed flex-grow">
            {description}
          </p>

          {hasDiagram && (
            <div className="mt-5 pt-4 border-t border-[var(--line-on-light)] flex items-center gap-2 text-[12px] font-medium text-[var(--text-on-light-faint)]">
              <Workflow size={13} aria-hidden="true" />
              Includes workflow diagram
            </div>
          )}
        </div>
      </BaseCard>
    </Link>
  );
});

export default FeatureCard;