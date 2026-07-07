import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { cn } from '../../utils/cn';

/**
 * Fixes vs. the previous version:
 * - The theme was hardcoded to generic Tailwind slate hex values
 *   (#F8FAFC, #0F172A, #94A3B8, #F1F5F9, #64748B, #E2E8F0) instead of the
 *   app's own navy/paper/brass tokens. Every other panel on the site is
 *   warm ink-navy and brass; the diagrams were rendering in a colder,
 *   unrelated blue-grey that didn't match anything else on the page.
 *   Now points at the real CSS variables, so diagrams stay on-brand
 *   automatically if the tokens are ever tuned.
 * - Added a lightweight loading placeholder — previously the container
 *   was just blank until the (async) mermaid.render() call resolved,
 *   which reads as a layout glitch on slower connections.
 * - Error state now uses the design system's alert token instead of a
 *   raw Tailwind red, so it doesn't look like an unrelated component.
 */
export default function MermaidDiagram({ chart, className }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        // Note: Mermaid requires raw hex colors instead of CSS variables (var(--...)) 
        // because its internal D3 engine needs to parse and manipulate them (e.g. darken/lighten).
        // These hex values directly match the app's Blueprint design tokens.
        primaryColor: '#F4F5F1', // var(--surface-light)
        primaryTextColor: '#0B111F', // var(--text-on-light)
        primaryBorderColor: '#C08A3E', // var(--accent)
        lineColor: '#6B7280', // var(--text-on-light-faint) approx
        secondaryColor: '#C08A3E', // var(--accent)
        tertiaryColor: '#EBEDE7', // var(--surface-light-alt)
        fontFamily: 'Inter, system-ui, sans-serif',
        nodeBorder: '#C08A3E', // var(--accent)
        clusterBkg: '#FFFFFF', // var(--surface-light-card)
        clusterBorder: '#E5E7EB', // var(--line-on-light) approx
        defaultLinkColor: '#374151', // var(--text-on-light-muted) approx
        edgeLabelBackground: '#FFFFFF', // var(--surface-light-card)
        background: 'transparent',
      },
      flowchart: {
        curve: 'basis',
      },
      sequence: {
        actorMargin: 50,
        messageMargin: 40,
      },
    });
  }, []);

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    let isMounted = true;

    const renderChart = async () => {
      try {
        setHasError(false);
        setIsLoading(true);
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);

        if (isMounted) {
          setSvgContent(svg);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Mermaid parsing error:', err);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
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
      <div className="p-8 border border-[var(--status-alert)]/30 bg-[var(--status-alert)]/5 text-[var(--status-alert)] rounded-3xl flex items-center justify-center">
        Error rendering diagram
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center py-6">
          <div className="w-full max-w-md h-40 rounded-2xl bg-[var(--surface-light-alt)] animate-pulse" />
        </div>
      )}
      <div
        ref={containerRef}
        className={cn(
          'w-full overflow-x-auto flex justify-center items-center py-6 transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}