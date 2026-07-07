import React, { memo } from "react";

export const Background = memo(function Background({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen flex flex-col ${className}`}>
      {children}
    </div>
  );
});
