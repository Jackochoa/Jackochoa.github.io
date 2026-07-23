# Deployment runbook

## Local

```bash
npm ci
npm run verify
npm run dev
```

## GitHub Pages

Production is intentionally not activated by this local implementation. Before the first production deploy:

1. Create the public user-site repository `Jackochoa/Jackochoa.github.io`.
2. Push the reviewed source to `main`.
3. Verify `jacksonochoa.page` in GitHub account settings.
4. In repository Settings → Pages, select GitHub Actions and add `jacksonochoa.page` as custom domain.
5. At Name.com, set the four GitHub Pages apex `A` records for `@` and a `www` `CNAME` to `jackochoa.github.io`.
6. Remove conflicting apex records and never add a wildcard record.
7. Wait for DNS propagation, verify with `dig`, then enable Enforce HTTPS.
8. Confirm both `https://jacksonochoa.page/` and `https://www.jacksonochoa.page/`; apex is canonical.

Do not change DNS before the domain is verified and the repository custom domain is configured. This avoids a custom-domain takeover window.

## Vercel previews

Connect the public repository to Vercel with automatic production deployment disabled. Keep preview deployments enabled for pull requests. Do not assign `jacksonochoa.page` to Vercel; production remains GitHub Pages.

## Rollback

Revert the offending commit or re-run the Pages workflow from the last approved `main` SHA. DNS does not change during a content rollback.

## Human gates

- Public repository creation
- Client/case-study disclosure approval
- Portrait and screenshot approval
- DNS changes
- First production deployment
