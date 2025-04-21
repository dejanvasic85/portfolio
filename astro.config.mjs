// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
			langs: ['html', 'css', 'js', 'ts', 'jsx', 'tsx', 'json', 'markdown', 'python', 'bash'],
			wrap: true
		}
	},
	integrations: [mdx()]
});
