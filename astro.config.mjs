import { defineConfig } from 'astro/config';
import addClasses from './add-classes.mjs';
import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkDiagram } from './remark-diagram.mjs';
import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://tw-dev-docs.netlify.app/',
  integrations: [sitemap(), vue()],
  markdown: {
    remarkPlugins: [
      remarkDiagram,
      remarkReadingTime, 
      'remark-code-titles'
    ],
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