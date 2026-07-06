import React, { memo } from "react";

export const BaseCard = memo(function BaseCard({ 
  children, 
  className = "", 
  hover = true,
  padding = "p-6"
}) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-[24px] border border-bd-subtle bg-bg-surface shadow-sm transition-all duration-300 ${hover ? "hover:-translate-y-1 hover:border-bd-strong hover:shadow-lg hover:shadow-slate-200/50" : ""} ${className}`}
    >
      {/* Subtle top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary-light/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className={`relative z-10 h-full ${padding}`}>
        {children}
      </div>
    </div>
  );
});
