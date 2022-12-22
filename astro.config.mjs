import { defineConfig } from 'astro/config';
import addClasses from './add-classes.mjs';
import { remarkReadingTime } from './remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), vue()],
  markdown: {
    remarkPlugins: [remarkReadingTime, 'remark-code-titles'],
		rehypePlugins: [
			'rehype-slug',
			['rehype-autolink-headings', { behavior: 'prepend' }],
			['rehype-toc', { headings: ['h2', 'h3'] }],
			[addClasses, { 'h1,h2,h3': 'title' }],
		],
    extendDefaultPlugins: true,
  },
  server: {
    port: 8080
  }
});