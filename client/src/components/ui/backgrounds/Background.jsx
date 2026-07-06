import React, { memo } from "react";

export const Background = memo(function Background({ children, className = "" }) {
  return (
    <div className={`min-h-screen bg-[#F8F9FB] relative overflow-hidden ${className}`}>
      {/* Standard Clean Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Modern Ambient Mesh Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[120px] opacity-70 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/5 blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-purple-500/5 blur-[120px] opacity-60 mix-blend-multiply pointer-events-none" />
        
        {/* Standard SaaS Dot Pattern (Centralized in index.css) */}
        <div className="absolute inset-0 opacity-40 bg-standard-dots" />
        
        {/* Very subtle noise texture for premium feel */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
});
