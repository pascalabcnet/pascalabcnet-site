import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { pascalabcShikiConfig } from './src/syntaxes/pascalabc-highlighting.mjs';
import inlinePascalKeywords from './src/markdown/inline-pascal-keywords.mjs';

export default defineConfig({
  site: 'https://pascalabc.net',
  output: 'static',
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    routing: { prefixDefaultLocale: false }
  },
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://pascalabc.net/downloads/'
    })
  ],
  markdown: {
    shikiConfig: pascalabcShikiConfig,
    rehypePlugins: [inlinePascalKeywords]
  }
});
