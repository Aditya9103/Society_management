import React, { memo } from "react";
import { BaseCard } from "./BaseCard";

export const FeatureCard = memo(function FeatureCard({ 
  title, 
  description, 
  icon, 
  className = "" 
}) {
  return (
    <BaseCard className={`group ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
          </div>
          <h3 className="ml-4 text-xl font-bold text-tx-primary leading-tight">{title}</h3>
        </div>
        <p className="text-tx-primary-light flex-grow leading-relaxed">
          {description}
        </p>
      </div>
    </BaseCard>
  );
});
