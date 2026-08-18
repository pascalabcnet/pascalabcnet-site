import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { pascalabcShikiConfig } from './src/syntaxes/pascalabc-highlighting.mjs';

export default defineConfig({
  site: 'https://pascalabc.net',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: pascalabcShikiConfig
  }
});
