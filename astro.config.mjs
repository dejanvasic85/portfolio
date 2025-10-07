import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

export default defineConfig({
	site: 'https://dejan.vasic.com.au',
	trailingSlash: 'never',
	output: 'hybrid',
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
						const existingClasses = Array.isArray(node.properties.className)
							? node.properties.className.filter(
									(c) => typeof c === 'string' || typeof c === 'number'
								)
							: typeof node.properties.className === 'string' ||
								  typeof node.properties.className === 'number'
								? [node.properties.className]
								: [];
						node.properties.className = [...existingClasses, 'code-block'];
					}
				}
			]
		}
	}
});
