# Jackson Ochoa — portfolio

Public source for [jacksonochoa.page](https://jacksonochoa.page).

## Stack

- Next.js App Router with static export
- React + TypeScript, hand-written CSS in `app/globals.css`
- GitHub Pages production, Vercel pull-request previews
- Optional cookieless Umami analytics

## Local development

```bash
npm install
npm run dev
```

Verification:

```bash
npm run verify
```

The production export is generated in `out/`.

After adding a screenshot to `public/images/`, run `npm run images` to rewrite it
as WebP at the size it is actually displayed. `next.config.ts` sets
`images.unoptimized`, so whatever is committed there is what the browser
downloads. See `docs/asset-register.md`.

## Content safety

Project cases are sanitized summaries. Do not copy private repository README files, credentials, client names, internal URLs, production data, or unapproved screenshots into this repository.

Before launch, review `docs/content-governance.md` and `docs/asset-register.md`.

## Licensing

Original source code, copy, and illustrations are MIT licensed. Client marks, third-party assets, fonts, screenshots, portrait photography, and other material that Jackson cannot sublicense are excluded; see `docs/asset-register.md`.
