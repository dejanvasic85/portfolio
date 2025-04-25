// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
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

	integrations: [mdx()],
	adapter: vercel()
});
