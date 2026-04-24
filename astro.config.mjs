// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://energygastrade.github.io',
  base: '/egt-trading-landing',
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: {
          uk: 'uk',
          en: 'en',
        },
      },
    }),
    icon({
      include: {
        lucide: [
          'sun',
          'moon',
          'zap',
          'arrow-right-left',
          'truck',
          'trending-up',
          'phone',
          'mail',
          'map-pin',
          'clock',
          'globe',
          'users',
          'shield-check',
          'chevron-down',
          'menu',
          'x',
          'arrow-up-right',
          'check',
          'log-in',
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
