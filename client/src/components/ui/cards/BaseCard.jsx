import React, { memo } from "react";

export const BaseCard = memo(function BaseCard({
  children,
  className = "",
  hover = true,
  dark = false,
  padding = "p-6"
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] border transition-all duration-300 ${dark
          ? "bg-[var(--surface-dark-raised)] border-[var(--line-on-dark)] shadow-[var(--shadow-dark-panel)] hover:border-[var(--text-on-dark-muted)]"
          : "bg-white border-[var(--line-on-light)] shadow-sm hover:border-[var(--navy-900)] hover:shadow-md"
        } ${hover ? "hover:-translate-y-1" : ""} ${className}`}
    >
      {/* Subtle top highlight line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dark ? 'from-white/5 via-white/20 to-white/5' : 'from-[var(--accent)]/20 via-[var(--accent)] to-[var(--accent)]/20'} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className={`relative z-10 h-full ${padding}`}>
        {children}
      </div>
    </div>
  );
});
