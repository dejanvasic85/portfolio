import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
	site: 'https://dejan.vasic.com.au',
	trailingSlash: 'never',
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), sitemap()],
	env: {
		validateSecrets: true,
		schema: {
			AWS_ACCESS_KEY_ID: envField.string({ access: 'secret', context: 'server' }),
			AWS_SECRET_ACCESS_KEY: envField.string({
				access: 'secret',
				context: 'server'
			}),
			AWS_REGION: envField.string({ access: 'secret', context: 'server' }),
			EMAIL_TO: envField.string({ access: 'secret', context: 'server' }),
			EMAIL_FROM: envField.string({ access: 'secret', context: 'server' })
		}
	},
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
