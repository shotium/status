# Shotium Status

Public status page for [Shotium](https://shotium.com) — live at **[status.shotium.com](https://status.shotium.com)**.

## How it works

- **Probes** — GitHub Actions checks every ~5 minutes (Uptime CI):
  - Website & Dashboard: `https://shotium.com/api/health`, expects `200` with `"status":"ok"` in the body
  - API: unauthenticated `https://api.shotium.com/v1/screenshot`, expects `401` — proving edge, routing and the auth layer are alive
- **Data** — every check result is committed to this repository: `history/*.yml` (current snapshot per service) and `history/summary.json` (aggregates, including daily downtime minutes). Uptime CI commits on status changes; Response Time CI forces a daily snapshot so aggregates never go stale. Fully auditable via git history.
- **Incidents** — downtime automatically opens a GitHub Issue labeled `status`; closing the issue marks recovery. Short-lived incidents are never deleted (`skipDeleteIssues`) — everything stays on the record.
- **Site** — `site/` is a custom Nuxt static build deployed to GitHub Pages by Static Site CI (daily rebuild, plus an immediate rebuild when a status flips). Data is baked in at build time; current status refreshes at runtime from raw committed JSON.

Monitoring engine by [Upptime](https://github.com/upptime/upptime) (pinned version, template auto-updates disabled). The UI is our own.

## License

MIT
