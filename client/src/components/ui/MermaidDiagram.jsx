import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '../../utils/cn';

export default function MermaidDiagram({ chart, className }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Initialize mermaid with custom theme matching the app's aesthetic
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#F8FAFC',
        primaryTextColor: '#0F172A',
        primaryBorderColor: '#C58A38',
        lineColor: '#94A3B8',
        secondaryColor: '#C58A38',
        tertiaryColor: '#F1F5F9',
        fontFamily: 'Inter, system-ui, sans-serif',
        nodeBorder: '#C58A38',
        clusterBkg: '#FFFFFF',
        clusterBorder: '#E2E8F0',
        defaultLinkColor: '#64748B',
        edgeLabelBackground: '#FFFFFF',
        background: 'transparent',
      },
      flowchart: {
        curve: 'basis'
      },
      sequence: {
        actorMargin: 50,
        messageMargin: 40,
      }
    });
  }, []);

  useEffect(() => {
    if (!chart || !containerRef.current) return;
    
    let isMounted = true;
    
    const renderChart = async () => {
      try {
        setHasError(false);
        // Generate a unique ID to prevent conflicts when multiple diagrams mount
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        
        const { svg } = await mermaid.render(id, chart);
        
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error("Mermaid parsing error:", err);
        if (isMounted) {
          setHasError(true);
        }
      }
    };
    
    renderChart();
    
    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (hasError) {
    return (
      <div className="p-8 border border-red-200 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center">
        Error rendering diagram
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn("w-full overflow-x-auto flex justify-center items-center py-6", className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
