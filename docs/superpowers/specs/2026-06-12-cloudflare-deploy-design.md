# Cloudflare Auto-Deploy Design

**Date:** 2026-06-12
**Status:** Approved

## Goal

Automatically deploy the site to Cloudflare whenever `main` is updated (e.g.
when a PR is merged), with no manual steps.

## Background

The site is a Next.js static export (`output: "export"`), built with
`npm run build` into `out/`. The repo has no Cloudflare configuration and no
GitHub Actions workflows today. The repo secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` already exist.

The Cloudflare account already has a Worker named `solitary-hall-c4e1` with
the `aureviantech.com` custom domain (+1 other route) attached. Deploys must
target this existing Worker so the live domain picks up each release.

## Decision

Deploy as a **Cloudflare Worker with Static Assets** (assets-only, no Worker
script), driven by a GitHub Actions workflow. This is Cloudflare's recommended
setup for new static sites; Cloudflare Pages was considered and rejected
because new platform investment is going to Workers.

## Components

### 1. `wrangler.toml` (repo root)

```toml
name = "solitary-hall-c4e1"
compatibility_date = "2026-06-12"

[assets]
directory = "./out"
```

- `name` matches the existing Worker, so each deploy publishes a new version
  of `solitary-hall-c4e1` and the attached `aureviantech.com` domain serves
  it immediately.
- No `main` entry: the Worker serves the static `out/` directory directly.
- No `routes` in the config: the domain/route bindings managed in the
  Cloudflare dashboard stay as they are.

### 2. `.github/workflows/deploy.yml`

- **Trigger:** `push` to `main` only. Merging a PR produces a push to `main`,
  so merges deploy automatically. No deploys from PRs or other branches.
- **Job steps (ubuntu-latest):**
  1. `actions/checkout@v4`
  2. `actions/setup-node@v4` — Node 22, npm cache (repo requires Node ≥ 18.18)
  3. `npm ci`
  4. `npm test` — failing tests abort the deploy
  5. `npm run build` — static export to `out/`
  6. `cloudflare/wrangler-action@v3` with `apiToken` / `accountId` from the
     existing repo secrets; default command (`wrangler deploy`) picks up
     `wrangler.toml`

## Error handling

Any failing step fails the workflow run; nothing is deployed. Failures are
visible in the GitHub Actions tab (and GitHub's default email notifications).

## Testing

- CI-side: the workflow itself runs jest before deploying.
- Acceptance: after merging this branch to `main`, the workflow runs and
  `aureviantech.com` serves the current design.
- Local validation before merge: `npx wrangler deploy --dry-run` to confirm
  the config parses and the asset directory resolves (requires a local build).

## Out of scope

- Custom domain mapping for the Worker.
- PR preview deployments.
- Caching/CDN tuning beyond Workers defaults.
