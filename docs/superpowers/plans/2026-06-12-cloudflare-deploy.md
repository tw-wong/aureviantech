# Cloudflare Auto-Deploy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-deploy the static site to the existing Cloudflare Worker `solitary-hall-c4e1` on every push to `main`.

**Architecture:** An assets-only `wrangler.toml` (no Worker script) serves the Next.js static export from `out/`. A single GitHub Actions workflow builds, tests, and deploys via `cloudflare/wrangler-action@v3` using existing repo secrets.

**Tech Stack:** GitHub Actions, Wrangler (Workers Static Assets), Next.js 15 static export.

**Spec:** `docs/superpowers/specs/2026-06-12-cloudflare-deploy-design.md`

---

## File Structure

- Create: `wrangler.toml` — Worker identity + static assets directory (deploy target config)
- Create: `.github/workflows/deploy.yml` — CI pipeline: test → build → deploy

No source files change. There is nothing unit-testable here (pure config); each
task verifies by running the real tool against the config instead of jest.

Note: this machine's default Node is 18.17.0, below Next.js/wrangler minimums.
Run build/wrangler commands with Node 22:
`PATH="$HOME/.nvm/versions/node/v22.22.1/bin:$PATH" <command>`

---

### Task 1: wrangler.toml

**Files:**
- Create: `wrangler.toml`

- [ ] **Step 1: Create `wrangler.toml`** at the repo root:

```toml
name = "solitary-hall-c4e1"
compatibility_date = "2026-06-12"

[assets]
directory = "./out"
not_found_handling = "404-page"
```

`not_found_handling` serves the exported `out/404.html` for unknown URLs.
Also gitignore `.wrangler/` (local state created by wrangler dry-runs).

`name` MUST be `solitary-hall-c4e1` (the existing Worker with the
aureviantech.com domain attached). A different name would create a new,
unrouted Worker. No `main`, no `routes` — assets-only, dashboard routes
stay untouched.

- [ ] **Step 2: Build the site so `./out` exists**

Run: `PATH="$HOME/.nvm/versions/node/v22.22.1/bin:$PATH" npm run build`
Expected: exits 0, `out/index.html` exists.

- [ ] **Step 3: Validate the config with a dry-run deploy**

Run: `PATH="$HOME/.nvm/versions/node/v22.22.1/bin:$PATH" npx wrangler@latest deploy --dry-run`
Expected: exits 0, output reads the config, names the Worker
`solitary-hall-c4e1`, and reports the assets directory — no upload happens
and no credentials are needed for a dry run.

- [ ] **Step 4: Commit**

```bash
git add wrangler.toml
git commit -m "feat(deploy): wrangler config targeting Worker solitary-hall-c4e1

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

### Task 2: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: deploy-main
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build static site
        run: npm run build

      - name: Deploy Worker
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

The default wrangler-action command is `wrangler deploy`, which reads
`wrangler.toml` from Task 1. Failing tests or build abort the job, so
nothing deploys on failure.

- [ ] **Step 2: Validate the YAML parses**

Run: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat(deploy): GitHub Actions workflow deploying main to Cloudflare

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

### Task 3: Verify branch and hand off

- [ ] **Step 1: Confirm the full test suite still passes**

Run: `npx jest`
Expected: 6 suites, 29 tests passing.

- [ ] **Step 2: Confirm the working tree is clean and both files are on the branch**

Run: `git status --short && git log main..HEAD --oneline`
Expected: empty status; commits for spec, plan, wrangler.toml, deploy.yml.

- [ ] **Step 3: Hand off**

Push `feat/cloudflare-deploy`, open a PR to `main`. Acceptance check after
merge: the "Deploy to Cloudflare" run succeeds in the Actions tab and
aureviantech.com serves the current design.
