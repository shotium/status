// Status site — static generation only, deployed to gh-pages (status.shotium.com)
export default defineNuxtConfig({
  compatibilityDate: '2026-08-23',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Shotium Status',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Live uptime and response times for shotium.com and api.shotium.com. History is stored as public git commits — fully auditable.' },
        { name: 'theme-color', content: '#0a0a12' },
        { property: 'og:title', content: 'Shotium Status' },
        { property: 'og:description', content: 'Live uptime for shotium.com and api.shotium.com.' },
        { property: 'og:url', content: 'https://status.shotium.com/' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://status.shotium.com/' },
      ],
    },
  },
})
