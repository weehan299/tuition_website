/**
 * The Weehan Math Tuition mark — a navy octahedron inside a gold compass ring.
 * Vector redraw of the master artwork at docs/brand/weehan-logo.png, weighted
 * to read at header size: strokes are ~3× the master's and its fine inner arcs
 * and inner ticks are dropped. Plain SVG attributes only (no Tailwind inside),
 * so the same component also renders in Satori for the OG and Apple icons.
 */

// Logo-only colours, sampled from the master. Not UI tokens — the site's
// accents stay green (fix) + red (mark).
const NAVY = "#03244e";
const GOLD = "#b38747";

// Drawing is centred on 0,0. Octahedron vertices traced from the master.
const RING_R = 445;
const DOT_R = 26;
const RING_GAP = DOT_R + 20; // ring stops this far either side of each dot
const TICK_END = 525;

const point = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  return `${(RING_R * Math.cos(t)).toFixed(1)} ${(RING_R * Math.sin(t)).toFixed(1)}`;
};
const gapDeg = (RING_GAP / RING_R) * (180 / Math.PI);
const RING = [0, 90, 180, 270]
  .map(
    (q) =>
      `M${point(q + gapDeg)}A${RING_R} ${RING_R} 0 0 1 ${point(q + 90 - gapDeg)}`,
  )
  .join("");
const TICKS = `M0 -${RING_R + RING_GAP}V-${TICK_END}M${RING_R + RING_GAP} 0H${TICK_END}M0 ${RING_R + RING_GAP}V${TICK_END}M-${RING_R + RING_GAP} 0H-${TICK_END}`;
const DOTS = [
  [0, -RING_R],
  [RING_R, 0],
  [0, RING_R],
  [-RING_R, 0],
];

// Outer diamond, front faces, front equator; then the hidden back edges.
const EDGES =
  "M0 -358L-357 0L0 358L357 0ZM0 -358L-145 51L0 358L145 51ZM-357 0L-145 51H145L357 0";
const BACK_EDGES = "M-357 0L0 -110L357 0M-357 0L0 133L357 0";

export function Logo({
  className,
  size,
}: {
  className?: string;
  /** Fixed pixel size, for Satori. On the site, size it with `className`. */
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="-530 -530 1060 1060"
      width={size}
      height={size}
      fill="none"
      className={className}
    >
      <g stroke={GOLD}>
        <path d={RING} strokeWidth="20" />
        <path d={TICKS} strokeWidth="14" />
        <path
          d="M0 -358V358"
          strokeWidth="12"
          strokeDasharray="30 22"
          strokeDashoffset="-40"
        />
      </g>
      {DOTS.map(([cx, cy]) => (
        <circle key={`${cx},${cy}`} cx={cx} cy={cy} r={DOT_R} fill={GOLD} />
      ))}
      <path
        d={BACK_EDGES}
        stroke={NAVY}
        strokeWidth="12"
        strokeDasharray="30 22"
      />
      <path
        d={EDGES}
        stroke={NAVY}
        strokeWidth="34"
        strokeLinejoin="miter"
        strokeMiterlimit="2"
      />
    </svg>
  );
}
