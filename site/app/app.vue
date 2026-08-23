<script setup>
// Self-hosted fonts, same family as the main site
import '@fontsource/geist-sans'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/700.css'
import baked from './data/status.json'

// Baked at build time (daily rebuild); current status refreshed at runtime below.
const data = reactive(JSON.parse(JSON.stringify(baked)))
const refreshing = ref(false)

const RAW_SUMMARY = 'https://raw.githubusercontent.com/shotium/status/HEAD/history/summary.json'

const overall = computed(() => {
  const states = data.sites.map(s => s.status)
  if (states.every(s => s === 'up')) return 'up'
  if (states.every(s => s === 'down')) return 'major'
  if (states.some(s => s === 'down')) return 'partial'
  return 'degraded'
})

const overallText = {
  up: 'All services are online',
  degraded: 'Degraded performance',
  partial: 'Partial outage',
  major: 'Major outage',
}

const openIncidents = computed(() => data.incidents.filter(i => i.state === 'open'))
const pastIncidents = computed(() => data.incidents.filter(i => i.state !== 'open'))

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

function fmtDuration(a, b) {
  const mins = Math.max(1, Math.round((new Date(b) - new Date(a)) / 60000))
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  return `${h} h ${mins % 60} min`
}

// Runtime refresh: raw.githubusercontent.com is a CDN — CORS-open, no API rate limit.
onMounted(async () => {
  refreshing.value = true
  try {
    const res = await fetch(RAW_SUMMARY, { cache: 'no-store' })
    if (!res.ok) return
    const fresh = await res.json()
    const todayKey = new Date().toISOString().slice(0, 10)
    for (const f of fresh) {
      const site = data.sites.find(s => s.slug === f.slug)
      if (!site) continue
      site.status = f.status
      site.uptime = f.uptime
      site.responseTime = f.time
      const mins = (f.dailyMinutesDown || {})[todayKey] || 0
      const today = site.days[site.days.length - 1]
      if (today && today.date === todayKey) {
        today.minutesDown = mins
        today.state = f.status === 'up' && mins === 0 ? 'up' : mins >= 60 ? 'down' : mins > 0 ? 'degraded' : f.status
      }
    }
  } catch { /* keep baked data on any failure */ } finally {
    refreshing.value = false
  }
})
</script>

<template>
  <div class="lp-canvas">
    <SiteHeader />
    <!-- Unified loading indicator: a single pulse line under the header -->
    <div
      class="refresh-line"
      :class="{ active: refreshing }"
      aria-hidden="true"
    />

    <main class="status-main">
      <div class="page-head">
        <div class="page-kicker">Status</div>
        <h1 class="page-title">Every check, <span class="dim">on the record.</span></h1>
      </div>

      <section
        class="overall"
        :class="'is-' + overall"
      >
        <svg
          class="overall-icon"
          viewBox="0 0 19 18"
          fill="none"
          aria-hidden="true"
        >
          <path
            v-if="overall === 'up'"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.50005 16.2008C11.4096 16.2008 13.241 15.4422 14.5912 14.092C15.9415 12.7417 16.7 10.9103 16.7 9.00078C16.7 7.09122 15.9415 5.25987 14.5912 3.90961C13.241 2.55935 11.4096 1.80078 9.50005 1.80078C7.59049 1.80078 5.75914 2.55935 4.40888 3.90961C3.05862 5.25987 2.30005 7.09122 2.30005 9.00078C2.30005 10.9103 3.05862 12.7417 4.40888 14.092C5.75914 15.4422 7.59049 16.2008 9.50005 16.2008ZM12.8894 7.20888C12.9536 7.14766 13.005 7.07441 13.0408 6.99331C13.0766 6.91221 13.0961 6.82485 13.0981 6.73622C13.1002 6.64759 13.0848 6.55943 13.0527 6.47676C13.0207 6.3941 12.9727 6.31855 12.9115 6.25443C12.8503 6.19031 12.777 6.13888 12.6959 6.10307C12.6148 6.06727 12.5275 6.04778 12.4388 6.04573C12.3502 6.04369 12.262 6.05912 12.1794 6.09114C12.0967 6.12317 12.0212 6.17116 11.957 6.23238C10.6037 7.52551 9.41617 8.98176 8.42185 10.5677L7.05205 9.19878C6.99025 9.13246 6.91573 9.07927 6.83293 9.04238C6.75013 9.00549 6.66075 8.98565 6.57012 8.98405C6.47949 8.98245 6.38946 8.99912 6.30541 9.03307C6.22136 9.06702 6.14501 9.11755 6.08091 9.18165C6.01682 9.24574 5.96629 9.32209 5.93234 9.40614C5.89839 9.49019 5.88172 9.58022 5.88332 9.67085C5.88492 9.76148 5.90475 9.85087 5.94165 9.93367C5.97854 10.0165 6.03173 10.091 6.09805 10.1528L8.07805 12.1337C8.15136 12.207 8.24059 12.2625 8.33881 12.2958C8.43703 12.3291 8.5416 12.3393 8.64441 12.3256C8.74721 12.3119 8.84548 12.2748 8.93159 12.217C9.0177 12.1592 9.08934 12.0823 9.14095 11.9924C10.1547 10.2265 11.4171 8.61548 12.8894 7.20888Z"
            fill="currentColor"
          />
          <path
            v-else
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.5 16.2C13.476 16.2 16.7 12.976 16.7 9C16.7 5.024 13.476 1.8 9.5 1.8C5.524 1.8 2.3 5.024 2.3 9C2.3 12.976 5.524 16.2 9.5 16.2ZM9.5 5.1C9.898 5.1 10.22 5.422 10.22 5.82V9.42C10.22 9.818 9.898 10.14 9.5 10.14C9.102 10.14 8.78 9.818 8.78 9.42V5.82C8.78 5.422 9.102 5.1 9.5 5.1ZM9.5 12.9C9.997 12.9 10.4 12.497 10.4 12C10.4 11.503 9.997 11.1 9.5 11.1C9.003 11.1 8.6 11.503 8.6 12C8.6 12.497 9.003 12.9 9.5 12.9Z"
            fill="currentColor"
          />
        </svg>
        <h2 class="overall-text">{{ overallText[overall] }}</h2>
      </section>

      <section
        v-if="openIncidents.length"
        class="active-incidents"
      >
        <a
          v-for="inc in openIncidents"
          :key="inc.url"
          :href="inc.url"
          class="incident is-open"
        >
          <span class="incident-title">{{ inc.title }}</span>
          <span class="incident-meta">Investigating — opened {{ fmtDate(inc.createdAt) }} · details on GitHub</span>
        </a>
      </section>

      <section class="services">
        <ServiceCard
          v-for="site in data.sites"
          :key="site.slug"
          :site="site"
        />
      </section>

      <section class="incidents">
        <h2 class="incidents-title">Past incidents</h2>
        <p
          v-if="!pastIncidents.length"
          class="incidents-empty"
        >No incidents in the last 90 days.</p>
        <a
          v-for="inc in pastIncidents"
          :key="inc.url"
          :href="inc.url"
          class="incident"
        >
          <span class="incident-title">{{ inc.title }}</span>
          <span class="incident-meta">{{ fmtDate(inc.createdAt) }} · resolved in {{ fmtDuration(inc.createdAt, inc.closedAt) }} · postmortem on GitHub</span>
        </a>
      </section>

      <p class="method-note">
        Checked every 5 minutes from GitHub Actions. Every data point is a public
        <a href="https://github.com/shotium/status">git commit</a> — fully auditable.
      </p>
    </main>

    <SiteFooter :overall="overall" />
  </div>
</template>

<style scoped>
.refresh-line {
  height: 2px; position: relative; z-index: 2; overflow: hidden;
  background: transparent;
}
.refresh-line.active::before {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, var(--brand-2), transparent);
  animation: refresh-sweep 1.1s ease-in-out infinite;
}
@keyframes refresh-sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.status-main {
  width: min(820px, calc(100% - 48px));
  margin: 0 auto; padding: 64px 0 96px;
  position: relative; z-index: 2; flex: 1;
}

/* Page head — main-site content-page hero pattern (kicker + heavy H1) */
.page-head { margin-bottom: 30px; }
.page-kicker {
  color: #8d98ab; text-transform: uppercase; letter-spacing: 0.13em; font-size: 12px;
  margin-bottom: 10px; display: flex; align-items: center; gap: 10px;
}
.page-kicker::before {
  content: ""; width: 8px; height: 8px; border-radius: 50%;
  background: var(--brand); box-shadow: 0 0 10px rgba(24, 195, 154, 0.5);
}
.page-title {
  margin: 0; font-size: 44px; font-weight: 830; letter-spacing: -0.05em;
  line-height: 1.05; color: var(--lp-ink);
}
.page-title .dim { color: var(--lp-dim); font-weight: 760; }

/* Overall banner */
.overall {
  display: flex; align-items: center; gap: 13px;
  border-radius: 18px; padding: 22px 24px;
  border: 1px solid rgba(39, 210, 174, 0.35);
  background: linear-gradient(180deg, rgba(24, 195, 154, 0.10), rgba(24, 195, 154, 0.04));
  box-shadow: 0 0 34px rgba(24, 195, 154, 0.10);
}
.overall-icon { width: 26px; height: 26px; flex: none; color: var(--brand-2); }
.overall-text { font-size: 19px; font-weight: 800; letter-spacing: -0.022em; margin: 0; }
.overall.is-partial, .overall.is-major {
  border-color: rgba(255, 32, 71, 0.45);
  background: linear-gradient(180deg, rgba(255, 32, 71, 0.12), rgba(255, 32, 71, 0.05));
  box-shadow: 0 0 34px rgba(255, 32, 71, 0.10);
}
.overall.is-partial .overall-icon, .overall.is-major .overall-icon { color: var(--status-down); }
.overall.is-degraded {
  border-color: rgba(255, 197, 61, 0.45);
  background: linear-gradient(180deg, rgba(255, 197, 61, 0.10), rgba(255, 197, 61, 0.04));
  box-shadow: 0 0 34px rgba(255, 197, 61, 0.10);
}
.overall.is-degraded .overall-icon { color: var(--status-degraded); }

/* Services panel */
.services {
  margin-top: 22px; padding: 6px 24px;
  border: 1px solid var(--lp-line); border-radius: 18px;
  background: linear-gradient(180deg, rgba(15, 18, 24, 0.94), rgba(10, 12, 17, 0.98));
  box-shadow: var(--lp-shadow);
}

/* Incidents */
.active-incidents { margin-top: 22px; display: flex; flex-direction: column; gap: 10px; }
.incidents { margin-top: 44px; }
.incidents-title { font-size: 20px; font-weight: 800; letter-spacing: -0.025em; margin: 0 0 14px; }
.incidents-empty { color: var(--lp-faint); font-size: 14.5px; margin: 0; }
.incident {
  display: flex; flex-direction: column; gap: 4px; text-decoration: none;
  border: 1px solid var(--lp-line); border-radius: 14px; padding: 14px 18px;
  background: linear-gradient(180deg, rgba(15, 18, 24, 0.94), rgba(10, 12, 17, 0.98));
  transition: border-color 0.15s ease;
}
.incident + .incident { margin-top: 10px; }
.incident:hover { border-color: rgba(255, 255, 255, 0.16); }
.incident.is-open { border-color: rgba(255, 32, 71, 0.45); }
.incident-title { color: var(--lp-ink); font-weight: 700; font-size: 15px; }
.incident-meta { color: var(--lp-faint); font-size: 13px; }

.method-note {
  margin: 40px 0 0; color: var(--lp-faint); font-size: 13.5px; line-height: 1.7;
}
.method-note a { color: var(--brand-2); text-decoration: none; }
.method-note a:hover { text-decoration: underline; text-underline-offset: 3px; }

@media (max-width: 640px) {
  .status-main { padding-top: 44px; }
  .page-title { font-size: 33px; }
}
</style>
