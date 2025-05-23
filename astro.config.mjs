// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

export default defineConfig({
	site: 'https://dejan.vasic.com.au',
	adapter: vercel(),
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
			transformers: [
				{
					pre(node) {
						// Add special class for our tab-size CSS
						node.properties.className = [...(node.properties.className || []), 'code-block'];
					}
				}
			]
		}
	}
});
