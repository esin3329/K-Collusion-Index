# K-Collusion Index Decisions

## Architecture Decisions
- Data source: OECD SDMX-JSON API (no local CSV storage)
- Index baseline: Korea=100 (relative index, not absolute)
- Visualization: Recharts BarChart + RankingTable ("use client" directive)
- Testing: TDD approach, pytest (Python) + Playwright (UI), 80%+ coverage

## Tool Choices
- pandasdmx for OECD API data retrieval
- Next.js API routes for backend data fetching
- Pure CSS/inline styles (no Tailwind CSS per user constraint)
