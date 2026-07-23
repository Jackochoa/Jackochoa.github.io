type SectionHeadingProps = { kicker: string; title: string; intro?: string; align?: "left" | "right" };

export function SectionHeading({ kicker, title, intro, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span aria-hidden="true">✳</span>{kicker}</p>
      <h2>{title}</h2>
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </div>
  );
}
