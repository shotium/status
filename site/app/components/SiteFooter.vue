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
        <nav
          class="lp-foot-col"
          aria-label="Support"
        >
          <span class="lp-foot-head">Support</span>
          <a
            href="https://shotium.com/contact"
            class="lp-foot-link"
          >Contact</a>
          <a
            href="https://github.com/shotium/status"
            class="lp-foot-link"
          >Status data</a>
          <a
            href="mailto:support@shotium.com"
            class="lp-foot-link"
          >support@shotium.com</a>
        </nav>
      </div>
      <div class="lp-foot-bottom">
        <span>© {{ new Date().getFullYear() }} Shotium. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.lp-footer { padding: 76px 0 30px; border-top: 1px solid rgba(255, 255, 255, 0.06); position: relative; z-index: 2; margin-top: auto; }
.lp-foot-grid { display: grid; grid-template-columns: 1.4fr repeat(3, 0.85fr); gap: 26px; }
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
}
@media (max-width: 1200px) {
  .lp-foot-grid { grid-template-columns: repeat(3, 1fr); }
  .lp-foot-brand { grid-column: 1 / -1; }
}
</style>
