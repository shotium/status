# Shotium Status

Public status page for [Shotium](https://shotium.com) — live at **[status.shotium.com](https://status.shotium.com)**.

## How it works

- **Probes** — GitHub Actions checks every ~5 minutes (Uptime CI):
  - Website & Dashboard: `https://shotium.com/api/health`, expects `200` with `"status":"ok"` in the body
  - API: unauthenticated `https://api.shotium.com/v1/screenshot`, expects `401` — proving edge, routing and the auth layer are alive
- **Data** — every check result is committed to this repository: `history/*.yml` (current snapshot per service) and `history/summary.json` (aggregates, including daily downtime minutes). Uptime CI commits on status changes; Response Time CI forces a daily snapshot so aggregates never go stale. Fully auditable via git history.
- **Incidents** — downtime automatically opens a GitHub Issue labeled `status`; closing the issue marks recovery. Blips that auto-recover within 15 minutes are treated as probe noise and pruned (Upptime default).
- **Site** — `site/` is a custom Nuxt static build deployed to GitHub Pages by Static Site CI (daily rebuild, plus an immediate rebuild when a status flips). Data is baked in at build time; current status refreshes at runtime from raw committed JSON.

## Keeping chrome in sync

The header and footer (`site/app/components/SiteHeader.vue` / `SiteFooter.vue`) are ports of the main site's chrome ([shotium](https://github.com/shotium/shotium) repo, `app/components/`). Whenever the main site's header/footer changes — nav items, footer link columns, tagline, brand lockup — mirror the change here (links become absolute `https://shotium.com/...`; no session state on this site) **and push**: only a push to `master` triggers Static Site CI, a local commit alone never reaches production.

Monitoring engine by [Upptime](https://github.com/upptime/upptime) (pinned version, template auto-updates disabled). The UI is our own.

## License

MIT
