<script setup>
// Chrome ported from the main site; no session concept here — links are absolute.
const open = ref(false)

const links = [
  { label: 'Docs', href: 'https://shotium.com/docs' },
  { label: 'Templates', href: 'https://shotium.com/og-templates' },
  { label: 'Pricing', href: 'https://shotium.com/pricing' },
]
</script>

<template>
  <header class="lp-topbar">
    <div class="lp-container lp-nav">
      <a
        href="https://shotium.com"
        class="lp-logo"
      >
        <BrandMark class="lp-logo-mark" />
        <span>Shotium</span>
      </a>
      <div class="lp-nav-right">
        <nav class="lp-nav-links">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
          >{{ l.label }}</a>
          <a href="https://shotium.com/account">Sign in</a>
        </nav>
        <a
          href="https://shotium.com/account"
          class="btn btn-outline-brand"
        >Get started</a>
      </div>
      <button
        class="lp-burger"
        :aria-expanded="open"
        aria-label="Menu"
        @click="open = !open"
      >
        <span
          class="lp-burger-line"
          :class="{ x1: open }"
        /><span
          class="lp-burger-line"
          :class="{ x2: open }"
        />
      </button>
    </div>
    <Transition name="lp-menu">
      <nav
        v-if="open"
        class="lp-nav-mobile"
      >
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="lp-mobile-link"
        >{{ l.label }}</a>
        <a
          href="https://shotium.com/account"
          class="lp-mobile-link"
        >Sign in</a>
        <a
          href="https://shotium.com/account"
          class="btn btn-outline-brand lp-mobile-cta"
        >Get started</a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.lp-topbar { padding: 28px 0 18px; position: relative; z-index: 30; }
.lp-nav { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.lp-logo {
  display: flex; align-items: center; gap: 8px;
  font-size: 22px; font-weight: 850; letter-spacing: -0.035em; line-height: 24px;
  color: #f4f4f5; text-decoration: none; text-shadow: 0 0 20px rgba(255, 255, 255, 0.07);
}
.lp-logo-mark { width: 24px; height: 24px; color: #eef1f6; filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.18)); }
.lp-nav-links { display: flex; align-items: center; gap: 24px; color: #d1d7e3; font-size: 14px; }
.lp-nav-links a { opacity: 0.9; color: inherit; text-decoration: none; }
.lp-nav-links a:hover { opacity: 1; }
.lp-nav-right { display: flex; align-items: center; gap: 14px; }

.lp-burger {
  display: none; background: none; border: 1px solid var(--lp-line); border-radius: 8px;
  width: 36px; height: 36px; cursor: pointer; flex-direction: column;
  align-items: center; justify-content: center; gap: 5px;
}
.lp-burger-line { width: 16px; height: 1.5px; background: var(--lp-ink); transition: transform 0.2s ease; }
.lp-burger-line.x1 { transform: translateY(3.25px) rotate(45deg); }
.lp-burger-line.x2 { transform: translateY(-3.25px) rotate(-45deg); }

.lp-nav-mobile {
  position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
  background: #0a0c10; border-bottom: 1px solid var(--lp-line);
  display: flex; flex-direction: column; padding: 8px 14px 20px;
}
.lp-mobile-link {
  padding: 13px 0; color: #d1d7e3; text-decoration: none; font-size: 15px;
  border-bottom: 1px solid var(--lp-line-soft);
}
.lp-mobile-cta { margin-top: 16px; text-align: center; }

.lp-menu-enter-active, .lp-menu-leave-active { transition: opacity 0.15s ease; }
.lp-menu-enter-from, .lp-menu-leave-to { opacity: 0; }

@media (max-width: 860px) {
  .lp-nav-right { display: none; }
  .lp-burger { display: flex; }
}
</style>
