# Asset register

| Asset | Status | Rights | Required action |
| --- | --- | --- | --- |
| Organic system mark | Original CSS/SVG | MIT | Keep source with the app |
| Project diagrams | To produce | Jackson-owned | Review every label before launch |
| Project screenshots | Pending | Must be approved | Sanitize or replace |
| Portrait | Pending production | Personal use only unless separately licensed | Add approved derivatives before launch |
| Fonts | System fallbacks in v1 | System licenses | Do not add third-party font files without provenance |

## Adding a capture

`next.config.ts` sets `images.unoptimized`, so `public/images/` is served
verbatim — whatever is committed there is exactly what the browser downloads.

1. Drop the PNG or JPEG in `public/images/` under its published name.
2. Run `npm run images`. It rewrites the file as WebP capped at 1000px wide and
   deletes the original.
3. Reference the `.webp` path from `lib/content.ts`, with an `aspectRatio` that
   matches the source so the layout reserves the right space.

Unprocessed source captures live in `IMG/`, which is gitignored.
