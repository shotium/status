// Bakes Upptime data into site/app/data/status.json at build time.
// Sources: history/summary.json (written by Uptime CI every ~5 min, includes
// dailyMinutesDown), history/<slug>.yml (startTime), GitHub Issues (incidents).
// Zero-dependency; runs on Node 20+. GITHUB_TOKEN is optional (anonymous works locally).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const DAYS = 90
const REPO = 'shotium/status'

const DESCRIPTIONS = {
  'shotium-com': 'Landing, dashboard & docs',
  'api-shotium-com': 'Public REST API',
}

const summary = JSON.parse(readFileSync(join(root, 'history/summary.json'), 'utf8'))

function ymlField(slug, field) {
  const txt = readFileSync(join(root, `history/${slug}.yml`), 'utf8')
  const m = txt.match(new RegExp(`^${field}: (.*)$`, 'm'))
  return m ? m[1].trim() : null
}

function dayKey(offsetDays) {
  return new Date(Date.now() - offsetDays * 86400000).toISOString().slice(0, 10)
}

const sites = summary.map((s) => {
  const startKey = (ymlField(s.slug, 'startTime') || '').slice(0, 10) || null
  const days = []
  for (let i = DAYS - 1; i >= 0; i--) {
    const key = dayKey(i)
    const minutesDown = (s.dailyMinutesDown || {})[key] || 0
    let state = 'up'
    if (startKey && key < startKey) state = 'none'
    else if (minutesDown >= 60) state = 'down'
    else if (minutesDown > 0) state = 'degraded'
    days.push({ date: key, state, minutesDown })
  }
  return {
    slug: s.slug,
    name: s.name,
    url: s.url,
    description: DESCRIPTIONS[s.slug] || '',
    status: s.status,
    uptime: s.uptime,
    responseTime: s.time,
    days,
  }
})

// Incidents = GitHub issues labeled "status" (Upptime opens/closes them automatically)
let incidents = []
try {
  const headers = {
    accept: 'application/vnd.github+json',
    'user-agent': 'shotium-status-build',
  }
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues?labels=status&state=all&per_page=100`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const cutoff = Date.now() - DAYS * 86400000
  incidents = (await res.json())
    .filter(i => !i.pull_request && new Date(i.created_at).getTime() >= cutoff)
    .map(i => ({
      title: i.title.replace(/[🛑⚠️]/gu, '').trim(),
      url: i.html_url,
      state: i.state,
      createdAt: i.created_at,
      closedAt: i.closed_at,
      slugs: i.labels.map(l => l.name).filter(n => summary.some(s => s.slug === n)),
    }))
} catch (err) {
  console.warn(`[build-data] incidents fetch failed (${err.message}); baking empty list`)
}

const out = { generatedAt: new Date().toISOString(), sites, incidents }
const outPath = join(root, 'site/app/data/status.json')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n')
console.log(`[build-data] wrote ${outPath}: ${sites.length} sites, ${incidents.length} incidents`)
