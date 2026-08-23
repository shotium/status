<script setup>
const props = defineProps({
  site: { type: Object, required: true },
})

const stateColor = {
  up: 'var(--brand)',
  degraded: 'var(--status-degraded)',
  down: 'var(--status-down)',
  none: 'rgba(255, 255, 255, 0.07)',
}

function tickTip(day) {
  const date = new Date(day.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
  if (day.state === 'none') return `${date} — before monitoring`
  if (day.state === 'up') return `${date} — operational`
  return `${date} — ${day.minutesDown} min downtime`
}

const label = computed(() => {
  if (props.site.status === 'up') return 'Operational'
  if (props.site.status === 'degraded') return 'Degraded'
  return 'Down'
})
</script>

<template>
  <div class="svc">
    <div class="svc-head">
      <div class="svc-name-wrap">
        <span
          class="svc-dot"
          :class="'is-' + site.status"
        />
        <a
          class="svc-name"
          :href="`https://github.com/shotium/status/commits/HEAD/history/${site.slug}.yml`"
          title="Full check history (git commits)"
        >{{ site.name }}</a>
        <span class="svc-desc">{{ site.description }}</span>
      </div>
      <div class="svc-meta">
        <span class="svc-response">{{ site.responseTime }} ms avg</span>
        <span
          class="svc-uptime"
          :class="'is-' + site.status"
        >{{ site.uptime }} uptime</span>
      </div>
    </div>
    <div
      class="svc-ticks"
      role="img"
      :aria-label="site.name + ' daily status, last 90 days'"
    >
      <span
        v-for="day in site.days"
        :key="day.date"
        class="tick"
        :data-tip="tickTip(day)"
        :style="{ background: stateColor[day.state] }"
      />
    </div>
    <div class="svc-axis">
      <span class="axis-90">90 days ago</span>
      <span class="axis-45">45 days ago</span>
      <span class="svc-status-label">{{ label }}</span>
      <span>Today</span>
    </div>
  </div>
</template>

<style scoped>
.svc { padding: 22px 0 20px; }
.svc + .svc { border-top: 1px solid var(--lp-line-soft); }

.svc-head {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 16px; flex-wrap: wrap; margin-bottom: 14px;
}
.svc-name-wrap { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.svc-dot {
  width: 9px; height: 9px; border-radius: 50%; flex: none; align-self: center;
}
.svc-dot.is-up { background: var(--brand); box-shadow: 0 0 10px rgba(24, 195, 154, 0.65); }
.svc-dot.is-degraded { background: var(--status-degraded); box-shadow: 0 0 10px rgba(255, 197, 61, 0.6); }
.svc-dot.is-down { background: var(--status-down); box-shadow: 0 0 10px rgba(255, 32, 71, 0.6); }
.svc-name {
  font-size: 16px; font-weight: 700; letter-spacing: -0.018em; color: var(--lp-ink);
  text-decoration: none;
}
.svc-name:hover { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--lp-faint); }
.svc-desc { font-size: 13px; color: var(--lp-faint); }

.svc-meta { display: flex; align-items: baseline; gap: 14px; flex: none; }
.svc-response { font-size: 13px; color: var(--lp-faint); font-variant-numeric: tabular-nums; }
.svc-uptime { font-size: 13.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
.svc-uptime.is-up { color: var(--brand-2); }
.svc-uptime.is-degraded { color: var(--status-degraded); }
.svc-uptime.is-down { color: var(--status-down); }

.svc-ticks { display: flex; gap: 2px; }
.tick {
  flex: 1 1 0; height: 30px; border-radius: 2px; position: relative;
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.tick:first-child { border-radius: 4px 2px 2px 4px; }
.tick:last-child { border-radius: 2px 4px 4px 2px; }
.tick:hover { opacity: 0.72; transform: scaleY(1.12); }

/* CSS-only tooltip */
.tick::after {
  content: attr(data-tip);
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: #10151d; color: var(--lp-ink);
  border: 1px solid var(--lp-line); border-radius: 8px;
  padding: 6px 10px; font-size: 12px; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity 0.12s ease;
  z-index: 10; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5);
}
.tick:hover::after { opacity: 1; }
/* Keep edge tooltips inside the card */
.tick:nth-child(-n+8)::after { left: 0; transform: none; }
.tick:nth-last-child(-n+8)::after { left: auto; right: 0; transform: none; }

.svc-axis {
  display: flex; justify-content: space-between; margin-top: 10px;
  font-size: 12px; color: var(--lp-faint);
}
.svc-status-label { display: none; }

@media (max-width: 640px) {
  /* Hide the oldest 45 ticks on small screens */
  .tick:nth-child(-n+45) { display: none; }
  .axis-90 { display: none; }
  .svc-desc { display: none; }
}
@media (min-width: 641px) {
  .axis-45 { display: none; }
}
</style>
