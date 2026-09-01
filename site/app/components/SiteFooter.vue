<script setup>
const props = defineProps({
  overall: { type: String, default: 'up' },
})

const badge = computed(() => ({
  up: 'All services are online',
  degraded: 'Degraded performance',
  partial: 'Service disruption',
  major: 'Service disruption',
}[props.overall] || 'System status'))
</script>

<template>
  <footer class="lp-footer">
    <div class="lp-container">
      <div class="lp-foot-grid">
        <div class="lp-foot-brand">
          <div class="lp-foot-lock">
            <BrandMark class="lp-foot-mark" />
            <span class="lp-foot-word">Shotium</span>
          </div>
          <p class="lp-foot-tag">Screenshots &amp; OG images from one clean API.</p>
        </div>
        <nav
          class="lp-foot-col"
          aria-label="Product"
        >
          <span class="lp-foot-head">Product</span>
          <a
            href="https://shotium.com/docs"
            class="lp-foot-link"
          >Docs</a>
          <a
            href="https://shotium.com/screenshot-api"
            class="lp-foot-link"
          >Guides</a>
          <a
            href="https://shotium.com/og-templates"
            class="lp-foot-link"
          >Templates</a>
          <a
            href="https://shotium.com/pricing"
            class="lp-foot-link"
          >Pricing</a>
          <a
            href="https://shotium.com/account"
            class="lp-foot-link"
          >Account</a>
        </nav>
        <nav
          class="lp-foot-col"
          aria-label="Resources"
        >
          <span class="lp-foot-head">Resources</span>
          <a
            href="https://shotium.com/tools/og-image-generator"
            class="lp-foot-link"
          >Free OG generator</a>
          <a
            href="https://shotium.com/tools/open-graph-checker"
            class="lp-foot-link"
          >Open Graph checker</a>
          <a
            href="https://shotium.com/blog"
            class="lp-foot-link"
          >Blog</a>
          <a
            href="https://shotium.com/changelog"
            class="lp-foot-link"
          >Changelog</a>
          <a
            href="https://shotium.com/openapi.json"
            class="lp-foot-link"
          >OpenAPI spec</a>
        </nav>
        <nav
          class="lp-foot-col"
          aria-label="Company"
        >
          <span class="lp-foot-head">Company</span>
          <a
            href="https://shotium.com/about"
            class="lp-foot-link"
          >About</a>
          <a
            href="https://shotium.com/contact"
            class="lp-foot-link"
          >Contact</a>
          <a
            href="mailto:support@shotium.com"
            class="lp-foot-link"
          >support@shotium.com</a>
        </nav>
        <nav
          class="lp-foot-col"
          aria-label="Legal"
        >
          <span class="lp-foot-head">Legal</span>
          <a
            href="https://shotium.com/terms"
            class="lp-foot-link"
          >Terms of Service</a>
          <a
            href="https://shotium.com/privacy"
            class="lp-foot-link"
          >Privacy Policy</a>
        </nav>
      </div>
      <div class="lp-foot-bottom">
        <span>© {{ new Date().getFullYear() }} Shotium. All rights reserved.</span>
        <a
          href="/"
          class="lp-foot-status"
          :class="'is-' + overall"
        >
          <svg
            v-if="overall === 'up'"
            viewBox="0 0 19 18"
            fill="none"
            aria-hidden="true"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.50005 16.2008C11.4096 16.2008 13.241 15.4422 14.5912 14.092C15.9415 12.7417 16.7 10.9103 16.7 9.00078C16.7 7.09122 15.9415 5.25987 14.5912 3.90961C13.241 2.55935 11.4096 1.80078 9.50005 1.80078C7.59049 1.80078 5.75914 2.55935 4.40888 3.90961C3.05862 5.25987 2.30005 7.09122 2.30005 9.00078C2.30005 10.9103 3.05862 12.7417 4.40888 14.092C5.75914 15.4422 7.59049 16.2008 9.50005 16.2008ZM12.8894 7.20888C12.9536 7.14766 13.005 7.07441 13.0408 6.99331C13.0766 6.91221 13.0961 6.82485 13.0981 6.73622C13.1002 6.64759 13.0848 6.55943 13.0527 6.47676C13.0207 6.3941 12.9727 6.31855 12.9115 6.25443C12.8503 6.19031 12.777 6.13888 12.6959 6.10307C12.6148 6.06727 12.5275 6.04778 12.4388 6.04573C12.3502 6.04369 12.262 6.05912 12.1794 6.09114C12.0967 6.12317 12.0212 6.17116 11.957 6.23238C10.6037 7.52551 9.41617 8.98176 8.42185 10.5677L7.05205 9.19878C6.99025 9.13246 6.91573 9.07927 6.83293 9.04238C6.75013 9.00549 6.66075 8.98565 6.57012 8.98405C6.47949 8.98245 6.38946 8.99912 6.30541 9.03307C6.22136 9.06702 6.14501 9.11755 6.08091 9.18165C6.01682 9.24574 5.96629 9.32209 5.93234 9.40614C5.89839 9.49019 5.88172 9.58022 5.88332 9.67085C5.88492 9.76148 5.90475 9.85087 5.94165 9.93367C5.97854 10.0165 6.03173 10.091 6.09805 10.1528L8.07805 12.1337C8.15136 12.207 8.24059 12.2625 8.33881 12.2958C8.43703 12.3291 8.5416 12.3393 8.64441 12.3256C8.74721 12.3119 8.84548 12.2748 8.93159 12.217C9.0177 12.1592 9.08934 12.0823 9.14095 11.9924C10.1547 10.2265 11.4171 8.61548 12.8894 7.20888Z"
            fill="currentColor"
          /></svg>
          <svg
            v-else
            viewBox="0 0 19 18"
            fill="none"
            aria-hidden="true"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.5 16.2C13.476 16.2 16.7 12.976 16.7 9C16.7 5.024 13.476 1.8 9.5 1.8C5.524 1.8 2.3 5.024 2.3 9C2.3 12.976 5.524 16.2 9.5 16.2ZM9.5 5.1C9.898 5.1 10.22 5.422 10.22 5.82V9.42C10.22 9.818 9.898 10.14 9.5 10.14C9.102 10.14 8.78 9.818 8.78 9.42V5.82C8.78 5.422 9.102 5.1 9.5 5.1ZM9.5 12.9C9.997 12.9 10.4 12.497 10.4 12C10.4 11.503 9.997 11.1 9.5 11.1C9.003 11.1 8.6 11.503 8.6 12C8.6 12.497 9.003 12.9 9.5 12.9Z"
            fill="currentColor"
          /></svg>
          <span>{{ badge }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.lp-footer { padding: 76px 0 30px; border-top: 1px solid rgba(255, 255, 255, 0.06); position: relative; z-index: 2; margin-top: auto; }
.lp-foot-grid { display: grid; grid-template-columns: 1.5fr repeat(4, 0.78fr); gap: 24px; }
.lp-foot-lock { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.lp-foot-mark { width: 24px; height: 24px; color: #eef1f6; }
.lp-foot-word { font-size: 22px; font-weight: 850; letter-spacing: -0.03em; line-height: 24px; color: #f5f7fb; }
.lp-foot-tag { margin: 0; color: var(--lp-body); line-height: 1.95; max-width: 340px; font-size: 16px; }
.lp-foot-col { display: flex; flex-direction: column; align-items: flex-start; }
.lp-foot-head { margin: 0 0 12px; font-size: 15px; color: #f3f5f8; }
.lp-foot-link { color: var(--lp-body); margin: 4.5px 0; font-size: 14px; text-decoration: none; transition: color 0.15s ease; }
.lp-foot-link:hover { color: var(--lp-ink); }
.lp-foot-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06); margin-top: 28px; padding-top: 18px;
  color: var(--lp-faint); font-size: 14px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
}
.lp-foot-status {
  display: inline-flex; align-items: center; gap: 7px;
  color: var(--lp-body); font-size: 13.5px; text-decoration: none;
  transition: color 0.15s ease;
}
.lp-foot-status:hover { color: var(--lp-ink); }
.lp-foot-status svg { width: 15px; height: 15px; flex: none; }
.lp-foot-status.is-up svg { color: var(--brand-2); }
.lp-foot-status.is-degraded svg { color: var(--status-degraded); }
.lp-foot-status.is-partial svg, .lp-foot-status.is-major svg { color: var(--status-down); }
@media (max-width: 1200px) {
  .lp-foot-grid { grid-template-columns: repeat(4, 1fr); }
  .lp-foot-brand { grid-column: 1 / -1; }
}
@media (max-width: 720px) {
  .lp-foot-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 24px; }
}
</style>
