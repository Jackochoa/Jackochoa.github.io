/* Domain motifs — animated SVG tied to the author's real fields (genomics,
 * systems, science). Vector, accent-tinted, and paused by prefers-reduced-motion
 * via the global rule in globals.css. Decorative → aria-hidden. */

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

/* One strand crossing three acts: scattered context on the left resolves
 * into a straight system in the middle, then closes into a legible decision
 * on the right — literally, the sentence "I build systems so people can
 * decide with confidence." The strand and every element on it are always
 * fully drawn; a small warm pulse loops along it every 5.5s as the only
 * moving accent, so a static screenshot already reads as the finished
 * illustration, not a mid-animation frame. Global prefers-reduced-motion
 * freezes it, same as every other motif. */
const STRAND_PATH = "M55,70 Q95,60 115,95 Q140,115 155,100 L187,100 L251,100 L315,100 L410,100";

export function TransformationMap({ className = "" }: { className?: string }) {
  return (
    <span className={`motif motif--map ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 200" fill="none">
        {/* Context: signals that never made it onto the strand — dispersed, some
            loosely linked, none yet resolved. */}
        <circle className="motif__node motif__node--noise" cx="30" cy="120" r="3" />
        <circle className="motif__node motif__node--noise" cx="85" cy="145" r="2.5" />
        <path className="motif__noise" d="M30,120 L55,70" />
        <path className="motif__noise" d="M85,145 L115,95" />

        <path className="motif__strand" d={STRAND_PATH} />

        {/* Context nodes riding the strand. */}
        <circle className="motif__node motif__cascade" cx="55" cy="70" r="4" style={{ animationDelay: "0s" }} />
        <circle className="motif__node motif__cascade" cx="115" cy="95" r="3.5" style={{ animationDelay: "0.3s" }} />

        {/* System: the same line, straightened into interface / API / database. */}
        <rect className="motif__block motif__cascade" x="165" y="86" width="44" height="28" rx="4" style={{ animationDelay: "0.6s" }} />
        <rect className="motif__block motif__cascade" x="229" y="86" width="44" height="28" rx="4" style={{ animationDelay: "0.9s" }} />
        <rect className="motif__block motif__cascade" x="293" y="86" width="44" height="28" rx="4" style={{ animationDelay: "1.2s" }} />

        {/* Decision: the strand closes into a dial with one warm center. */}
        <g className="motif__ring-spin">
          <circle className="motif__ring motif__ring--map" cx="410" cy="100" r="34" strokeDasharray="8 10" />
        </g>
        <circle className="motif__ring motif__ring--inner" cx="410" cy="100" r="22" />
        <path className="motif__tick" d="M425,126 L429,132.9" />
        <path className="motif__tick" d="M395,126 L391,132.9" />
        <path className="motif__tick" d="M395,74 L391,67.1" />
        <path className="motif__tick" d="M425,74 L429,67.1" />
        <circle className="motif__core motif__cascade" cx="410" cy="100" r="6" style={{ animationDelay: "1.5s" }} />

        <circle className="motif__pulse" r="4" style={{ offsetPath: `path('${STRAND_PATH}')` }} />
      </svg>
    </span>
  );
}
