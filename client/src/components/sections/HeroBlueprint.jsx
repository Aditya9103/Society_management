import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ── Static stat badge ────────────────────────────────────────────
function StatBadge({ value, label, x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="130" height="38" rx="6"
        fill="rgba(16,24,43,1)" stroke="rgba(192,138,62,0.7)" strokeWidth="1" />
      <text x="10" y="13" fill="#E4B876" fontSize="10" fontFamily="IBM Plex Mono"
        letterSpacing="1" fontWeight="600">
        {label.toUpperCase()}
      </text>
      <text x="10" y="32" fill="#FFFFFF" fontSize="20" fontFamily="IBM Plex Mono" fontWeight="700">
        {value}
      </text>
    </g>
  );
}

// ── QR ring pulse around gate ────────────────────────────────────
function QRRing({ cx, cy, reduced }) {
  return (
    <g>
      {/* Outer pulsing ring */}
      {!reduced && (
        <motion.circle
          cx={cx} cy={cy} r={22}
          fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeDasharray="4 3"
          initial={{ r: 20, opacity: 0.8 }}
          animate={{ r: [20, 26, 20], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Inner ring */}
      <circle cx={cx} cy={cy} r="16" fill="rgba(192,138,62,0.3)"
        stroke="var(--accent)" strokeWidth="1.5" />
      {/* QR icon simplified */}
      <g transform={`translate(${cx - 8}, ${cy - 8})`}>
        {/* Top-left module */}
        <rect x="0" y="0" width="5" height="5" rx="1" fill="var(--accent)" />
        <rect x="1" y="1" width="3" height="3" rx="0.5" fill="rgba(16,24,43,1)" />
        <rect x="2" y="2" width="1" height="1" fill="var(--accent)" />
        {/* Top-right module */}
        <rect x="11" y="0" width="5" height="5" rx="1" fill="var(--accent)" />
        <rect x="12" y="1" width="3" height="3" rx="0.5" fill="rgba(16,24,43,1)" />
        <rect x="13" y="2" width="1" height="1" fill="var(--accent)" />
        {/* Bottom-left module */}
        <rect x="0" y="11" width="5" height="5" rx="1" fill="var(--accent)" />
        <rect x="1" y="12" width="3" height="3" rx="0.5" fill="rgba(16,24,43,1)" />
        <rect x="2" y="13" width="1" height="1" fill="var(--accent)" />
        {/* Data dots */}
        <rect x="7" y="0" width="2" height="2" rx="0.5" fill="var(--accent)" />
        <rect x="11" y="7" width="2" height="2" rx="0.5" fill="var(--accent)" />
        <rect x="7" y="11" width="2" height="2" rx="0.5" fill="var(--accent)" />
        <rect x="7" y="7" width="2" height="2" rx="0.5" fill="var(--accent)" />
        <rect x="11" y="11" width="2" height="2" rx="0.5" fill="var(--accent)" />
        <rect x="14" y="7" width="2" height="2" rx="0.5" fill="var(--accent)" />
      </g>
    </g>
  );
}

// ── Tower block ───────────────────────────────────────────────────
function Tower({ x, y, label, floors = 8, width = 32, active = false }) {
  const floorHeight = 9;
  const totalH = floors * floorHeight;
  return (
    <g>
      {/* Building */}
      <rect x={x - width / 2} y={y - totalH} width={width} height={totalH}
        fill="rgba(26,35,56,1)" stroke={active ? 'var(--accent)' : 'rgba(192,138,62,0.6)'}
        strokeWidth={active ? '1.5' : '1'} rx="2" />
      {/* Windows */}
      {Array.from({ length: floors - 1 }, (_, i) => (
        <g key={i}>
          {[0, 1].map((col) => (
            <rect
              key={col}
              x={x - width / 2 + 5 + col * 14}
              y={y - totalH + (i * floorHeight) + 2}
              width="8" height="5" rx="1"
              fill={Math.random() > 0.4 ? 'rgba(228,184,118,0.7)' : 'rgba(26,35,56,1)'}
            />
          ))}
        </g>
      ))}
      {/* Roof */}
      <rect x={x - width / 2} y={y - totalH - 4} width={width} height="4"
        fill={active ? 'var(--accent)' : 'rgba(192,138,62,0.8)'} rx="1" />
      {/* Label */}
      <rect x={x - 18} y={y + 4} width="36" height="16" rx="3"
        fill="rgba(16,24,43,1)" stroke="rgba(192,138,62,0.75)" strokeWidth="1" />
      <text x={x} y={y + 15} textAnchor="middle" fill="#E4B876"
        fontSize="10" fontFamily="IBM Plex Mono" fontWeight="600">
        {label}
      </text>
    </g>
  );
}

// ── Animated travelling dot ───────────────────────────────────────
function TravelDot({ reduced }) {
  // Path: Gate (250,320) → junction (250,200) → Tower A (120,230)
  if (reduced) return null;
  return (
    <motion.g>
      <motion.circle
        cx={250} cy={320} r={4} fill="var(--teal)"
        initial={{ cx: 250, cy: 320, opacity: 0 }}
        animate={{
          cx: [250, 250, 120, 120, 250, 380, 380, 250],
          cy: [320, 210, 210, 200, 210, 210, 200, 320],
          opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: 'easeInOut',
          times: [0, 0.15, 0.35, 0.42, 0.58, 0.75, 0.85, 1],
        }}
      />
      {/* Glow trail */}
      <motion.circle
        cx={250} cy={320} r={8} fill="rgba(47,158,110,0.6)"
        initial={{ cx: 250, cy: 320, opacity: 0 }}
        animate={{
          cx: [250, 250, 120, 120, 250, 380, 380, 250],
          cy: [320, 210, 210, 200, 210, 210, 200, 320],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: 'easeInOut',
          times: [0, 0.15, 0.35, 0.42, 0.58, 0.75, 0.85, 1],
        }}
      />
    </motion.g>
  );
}

export default function HeroBlueprint({ stats, simplified = false }) {
  const reduced = useReducedMotion();

  const defaultStats = {
    visitors: '128',
    guards: '4',
    tickets: '3',
  };
  const s = stats || defaultStats;

  if (simplified) {
    // Smaller static version for inner pages
    return (
      <svg viewBox="0 0 500 200" className="w-full max-w-lg opacity-100"
        aria-label="Society blueprint diagram" role="img">
        <defs>
          <pattern id="grid-s" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(192,138,62,0.25)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="200" fill="url(#grid-s)" />
        {/* Simplified perimeter */}
        <rect x="60" y="20" width="380" height="160" rx="8"
          fill="none" stroke="rgba(192,138,62,0.6)" strokeWidth="1.5" strokeDasharray="6 4" />
        <QRRing cx={250} cy={100} reduced />
        <text x="250" y="160" textAnchor="middle" fill="#E4B876"
          fontSize="12" fontFamily="IBM Plex Mono" letterSpacing="2" fontWeight="600">
          PARAPET SOCIETY ERP
        </text>
      </svg>
    );
  }

  return (
    <div className="relative w-full" role="img" aria-label="Animated society blueprint showing live visitor entry tracking">
      <svg
        viewBox="0 0 500 430"
        className="w-full"
        style={{ filter: 'drop-shadow(0 0 40px rgba(192,138,62,0.35))' }}
      >
        <defs>
          {/* Blueprint grid */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(192,138,62,0.2)" strokeWidth="0.5" />
          </pattern>
          {/* Path tracks for dot */}
          <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L0,4 L4,2 z" fill="rgba(192,138,62,0.8)" />
          </marker>
        </defs>

        {/* Grid background */}
        <rect width="500" height="430" fill="url(#grid)" />

        {/* Society perimeter wall */}
        <rect x="50" y="40" width="400" height="300" rx="10"
          fill="none" stroke="rgba(192,138,62,0.7)" strokeWidth="2" strokeDasharray="8 5" />

        {/* Road/path lines inside */}
        {/* Horizontal main road */}
        <line x1="50" y1="210" x2="450" y2="210"
          stroke="rgba(192,138,62,0.35)" strokeWidth="12" />
        {/* Vertical from gate to road */}
        <line x1="250" y1="340" x2="250" y2="210"
          stroke="rgba(192,138,62,0.35)" strokeWidth="12" />

        {/* Path lines (thin, dashed) for dot route */}
        <path d="M 250 320 L 250 210 L 120 210" fill="none"
          stroke="rgba(192,138,62,0.5)" strokeWidth="1" strokeDasharray="4 3" />
        <path d="M 250 210 L 380 210" fill="none"
          stroke="rgba(192,138,62,0.5)" strokeWidth="1" strokeDasharray="4 3" />

        {/* Towers */}
        <Tower x={120} y={190} label="TWR-A" floors={9} width={36} active />
        <Tower x={250} y={170} label="TWR-B" floors={11} width={38} />
        <Tower x={380} y={190} label="TWR-C" floors={9} width={36} />

        {/* Clubhouse (smaller) */}
        <rect x="190" y="250" width="60" height="36" rx="4"
          fill="rgba(26,35,56,1)" stroke="rgba(192,138,62,0.75)" strokeWidth="1" />
        <text x="220" y="261" textAnchor="middle" fill="#E4B876"
          fontSize="8" fontFamily="IBM Plex Mono" fontWeight="600">CLUBHOUSE</text>
        <rect x="195" y="263" width="50" height="18" rx="2" fill="rgba(192,138,62,0.3)" />

        {/* Parking lot */}
        <rect x="350" y="250" width="70" height="50" rx="4"
          fill="rgba(26,35,56,0.8)" stroke="rgba(192,138,62,0.5)" strokeWidth="1" />
        {[0, 1, 2].map((col) =>
          [0, 1].map((row) => (
            <rect key={`${col}-${row}`}
              x={355 + col * 22} y={255 + row * 20}
              width="18" height="15" rx="2"
              fill={col === 1 && row === 0 ? 'rgba(47,158,110,0.8)' : 'rgba(192,138,62,0.25)'}
              stroke="rgba(192,138,62,0.5)" strokeWidth="0.5" />
          ))
        )}
        <text x="385" y="313" textAnchor="middle" fill="#E4B876"
          fontSize="8" fontFamily="IBM Plex Mono" fontWeight="600">PARKING</text>

        {/* Main gate */}
        <g>
          {/* Gate pillars */}
          <rect x="225" y="315" width="10" height="28" rx="2"
            fill="rgba(192,138,62,1)" />
          <rect x="265" y="315" width="10" height="28" rx="2"
            fill="rgba(192,138,62,1)" />
          {/* Gate bar (boom barrier) */}
          {reduced ? (
            <line x1={235} y1={322} x2={265} y2={322} stroke="var(--accent)" strokeWidth={3} strokeLinecap="round" />
          ) : (
            <motion.line
              x1={235} y1={322} x2={265} y2={322}
              stroke="var(--accent)" strokeWidth={3} strokeLinecap="round"
              initial={{ x2: 265, y2: 322 }}
              animate={{ x2: [265, 265, 265], y2: [322, 310, 322] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
          )}
          {/* Gate label */}
          <rect x="210" y="345" width="80" height="16" rx="3"
            fill="rgba(16,24,43,1)" stroke="rgba(192,138,62,0.85)" strokeWidth="1" />
          <text x="250" y="356" textAnchor="middle" fill="#E4B876"
            fontSize="9" fontFamily="IBM Plex Mono" letterSpacing="1" fontWeight="600">MAIN GATE</text>
        </g>

        {/* QR pulse ring at gate */}
        <QRRing cx={250} cy={323} reduced={!!reduced} />

        {/* Live indicator dot at Tower A */}
        {!reduced && (
          <motion.circle cx={120} cy={168} r={4} fill="var(--teal)"
            initial={{ opacity: 1, r: 4 }}
            animate={{ opacity: [1, 0.3, 1], r: [4, 5, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Compass rose (top-right corner) */}
        <g transform="translate(440, 55)">
          <circle cx="0" cy="0" r="12" fill="rgba(26,35,56,1)"
            stroke="rgba(192,138,62,0.6)" strokeWidth="1" />
          <text x="0" y="-3" textAnchor="middle" fill="#E4B876"
            fontSize="10" fontFamily="IBM Plex Mono" fontWeight="700">N</text>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(192,138,62,0.8)" strokeWidth="0.5" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(192,138,62,0.8)" strokeWidth="0.5" />
        </g>

        {/* Label: "PARAPET LIVE" top-left */}
        <g transform="translate(50, 18)">
          <rect x="0" y="0" width="180" height="22" rx="4"
            fill="rgba(16,24,43,1)" stroke="rgba(192,138,62,0.6)" strokeWidth="1" />
          <circle cx="12" cy="11" r="3" fill="var(--status-live, #2F9E6E)" />
          <text x="22" y="14" fill="#E4B876" fontSize="9"
            fontFamily="IBM Plex Mono" letterSpacing="1" fontWeight="700">
            PARAPET · LIVE OVERVIEW
          </text>
        </g>

        {/* Travelling dot */}
        <TravelDot reduced={!!reduced} />

        {/* Stat badges */}
        <StatBadge value={s.visitors} label="Visitors Today" x={22} y={345} />
        <StatBadge value={s.guards} label="Guards On Duty" x={180} y={378} />
        <StatBadge value={s.tickets} label="Open Tickets" x={342} y={345} />
      </svg>
    </div>
  );
}
