/* Domain motifs — animated SVG tied to the author's real fields (genomics,
 * systems, science). Vector, accent-tinted, and paused by prefers-reduced-motion
 * via the global rule in globals.css. Decorative → aria-hidden. */

export function DnaHelix({ className = "" }: { className?: string }) {
  const rungs = [45, 80, 115, 150, 185, 220, 255];
  return (
    <span className={`motif motif--dna ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 300" fill="none">
        <path className="motif__strand" d="M100 10 C180 50 180 100 100 150 C20 200 20 250 100 290" />
        <path className="motif__strand" d="M100 10 C20 50 20 100 100 150 C180 200 180 250 100 290" />
        {rungs.map((y, i) => (
          <line
            key={y}
            className="motif__rung"
            x1="35" x2="165" y1={y} y2={y}
            style={{ animationDelay: `${i * 0.22}s` }}
          />
        ))}
        <circle className="motif__node" cx="100" cy="10" r="5" />
        <circle className="motif__node" cx="100" cy="150" r="5" />
        <circle className="motif__node" cx="100" cy="290" r="5" />
      </svg>
    </span>
  );
}

export function CircosArcs({ className = "" }: { className?: string }) {
  return (
    <span className={`motif motif--circos ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none">
        <g className="motif__spin">
          <circle className="motif__ring" cx="100" cy="100" r="88" strokeDasharray="46 22" />
          <circle className="motif__ring motif__ring--mid" cx="100" cy="100" r="68" strokeDasharray="26 16" />
        </g>
        <circle className="motif__ring motif__ring--inner" cx="100" cy="100" r="48" />
        <path className="motif__chord" d="M62 68 Q100 100 150 88" />
        <path className="motif__chord" d="M138 132 Q100 100 58 118" />
        <path className="motif__chord" d="M84 55 Q100 100 116 145" />
        <circle className="motif__node" cx="62" cy="68" r="4" />
        <circle className="motif__node" cx="150" cy="88" r="4" />
        <circle className="motif__node" cx="58" cy="118" r="4" />
        <circle className="motif__node" cx="138" cy="132" r="4" />
      </svg>
    </span>
  );
}

export function SystemFlow({ className = "" }: { className?: string }) {
  const nodes = [40, 120, 200, 280, 360];
  return (
    <span className={`motif motif--flow ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 200" fill="none">
        {/* network layer */}
        {nodes.map((x) => <circle key={x} className="motif__node" cx={x} cy="28" r="6" />)}
        <path className="motif__strand" d="M40 28H360" />
        {/* architecture layer */}
        <rect className="motif__block" x="90" y="82" width="100" height="36" rx="4" />
        <rect className="motif__block" x="210" y="82" width="100" height="36" rx="4" />
        {/* science layer */}
        <path className="motif__wave" d="M40 168 Q100 128 160 168 T280 168 T400 168" />
        {/* flows between layers */}
        <path className="motif__flow" d="M120 34V82M280 34V82M140 118V150M260 118V150" />
      </svg>
    </span>
  );
}
