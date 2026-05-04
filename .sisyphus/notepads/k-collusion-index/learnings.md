## Learnings

- Build-time data generation with "prebuild": "python python/generate_data.py" works but requires Python deps (pandas, pandasdmx, requests) in CI.
- generate_data.py includes a fallback when pandas is unavailable; CI should prefer real data generation by installing deps.
- APIs now read public/data/k-collusion-index.json from process.cwd(); ensure CI populates public/data before build.

## [TIMESTAMP] Initial
- Created notepad to record conventions and decisions.

## [2026-05-04T00:00:00Z] Added CI workflow
- Created .github/workflows/prebuild.yml to run Python data generation and Next.js build on Ubuntu runners.
- Workflow steps: setup Python, pip install pandas/pandasdmx/requests, run python python/generate_data.py, verify public/data/k-collusion-index.json exists, npm ci, npm run build, upload .next artifact.
- Rationale: ensure CI produces the same prebuild-generated JSON used by the app APIs; avoids runtime dependency on pandas in production.

## [2026-05-04] README Update: CI and Local Prebuild Documentation
- Updated README.md to include a new section "CI / Build-time data generation".
- Documented the GitHub Actions workflow (.github/workflows/prebuild.yml) and its role in generating data before the Next.js build.
- Added detailed local reproduction steps for both POSIX and Windows environments, including venv setup, dependency installation (pandas, pandasdmx, requests), and script execution.
- Updated the existing Python setup section to include the `requests` package.

## [2026-05-04T01:00:00Z] Weekly Data Update Workflow Added
- Created .github/workflows/weekly-data-update.yml (schedule: weekly Sunday 06:00 UTC) to regenerate public/data/k-collusion-index.json via python/generate_data.py.
- Workflow behavior: setup Python 3.10, pip install pandas/pandasdmx/requests, run script, compare repo copy, commit+push only if changed (commit message includes [skip ci]).
- Optional smoke-test step: if secret PAGES_URL is defined, curl and validate the deployed JSON.
- Rationale: low-cost weekly automation that only pushes when data changes, minimizing Pages builds and CI usage.

## [2026-05-04T01:23:45Z] Removed smoke-test step due to YAML parse error referencing secrets.PAGES_URL
 - Reason: the conditional `if: secrets.PAGES_URL != ''` caused the GitHub Actions parser to fail when queuing the workflow. Removed the step to restore workflow queuing. Will re-add a safer check (vars or expression) later if needed.

## [2026-05-04T11:40:42Z] Removed tracked Python bytecode and added .gitignore entries
 - Reason: generated __pycache__/*.pyc were accidentally committed by workflow. Removed from index and updated .gitignore to prevent re-committing compiled artifacts.

## [2026-05-04T11:52:00Z] Re-added optional smoke test (retrying) for Pages URL
 - Reason: add a safe smoke-test to validate deployed public/data/k-collusion-index.json when PAGES_URL secret is present. Uses 3 attempts with 10s backoff and JSON validation.

## [2026-05-05T07:35:37Z] Removed prototype_repo submodule entry to fix Pages deployment
 - Reason: submodule entry existed in index but .gitmodules missing, causing Cloudflare Pages submodule initialization failure. Removed from index.

## [2026-05-05T07:38:14Z] Removed prototype_repo submodule entry to fix Pages deployment
 - Reason: submodule entry existed in index but .gitmodules missing, causing Cloudflare Pages submodule initialization failure. Removed from index.

## [2026-05-05T08:16:21Z] Added .gitignore entry for prototype_repo to prevent accidental tracking
 - Reason: local prototype working dir should remain untracked to avoid submodule/index confusion in remote builds.
