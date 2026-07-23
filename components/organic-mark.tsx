type OrganicMarkProps = { compact?: boolean; className?: string };

export function OrganicMark({ compact = false, className = "" }: OrganicMarkProps) {
  return (
    <span className={`organic-mark ${compact ? "organic-mark--compact" : ""} ${className}`} aria-hidden="true">
      <span className="organic-mark__seed" />
      <span className="organic-mark__ring organic-mark__ring--one" />
      <span className="organic-mark__ring organic-mark__ring--two" />
      <span className="organic-mark__stem" />
    </span>
  );
}
