// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel';

export default defineConfig({
	adapter: vercel(),
	integrations: [mdx()],
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
	},

	output: 'static',
	site: 'https://dejan.vasic.com.au'
});
