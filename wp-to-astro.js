const fs = require('fs');
const path = require('path');
const { DOMParser } = require('@xmldom/xmldom');
const TurndownService = require('turndown');
const turndownService = new TurndownService({
	codeBlockStyle: 'fenced',
	headingStyle: 'atx'
});
x;

// Configure turndown to handle WordPress code blocks better
turndownService.addRule('codeBlocks', {
	filter: function (node) {
		return (
			node.nodeName === 'PRE' || (node.nodeName === 'CODE' && node.parentNode.nodeName !== 'PRE')
		);
	},
	replacement: function (content, node) {
		// Determine language from class if available
		let language = '';
		if (node.getAttribute && node.getAttribute('class')) {
			const match = node.getAttribute('class').match(/language-(\w+)/);
			if (match) {
				language = match[1];
			}
		}

		return '\n```' + language + '\n' + content + '\n```\n';
	}
});

// Path to the WordPress export file
const wpExportPath = path.join(
	__dirname,
	'data/softwareengineeringnotebook.WordPress.2025-04-28.xml'
);
const blogOutputDir = path.join(__dirname, 'src/pages/blog');

// Read the WordPress export file
const xmlData = fs.readFileSync(wpExportPath, 'utf8');
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

// Get all <item> elements
const items = xmlDoc.getElementsByTagName('item');

// Convert each item to MDX
for (let i = 0; i < items.length; i++) {
	const item = items[i];

	// Get post type
	const postTypeElements = item.getElementsByTagName('wp:post_type');
	if (postTypeElements.length === 0 || postTypeElements[0].textContent !== 'post') {
		continue; // Skip if not a blog post
	}

	// Get post status
	const postStatusElements = item.getElementsByTagName('wp:status');
	if (postStatusElements.length === 0 || postStatusElements[0].textContent !== 'publish') {
		continue; // Skip if not published
	}

	// Extract post details
	const title = item.getElementsByTagName('title')[0].textContent;
	const dateElement = item.getElementsByTagName('wp:post_date')[0];
	const dateGmt = new Date(dateElement.textContent);

	// Format the date as YYYY-MM-DD
	const year = dateGmt.getFullYear();
	const month = (dateGmt.getMonth() + 1).toString().padStart(2, '0');
	const day = dateGmt.getDate().toString().padStart(2, '0');

	// Extract content
	const contentElement = item.getElementsByTagName('content:encoded')[0];
	let content = contentElement.textContent;

	// Extract categories and tags
	const categories = [];
	const categoryElements = item.getElementsByTagName('category');
	for (let j = 0; j < categoryElements.length; j++) {
		const category = categoryElements[j];
		const domain = category.getAttribute('domain');
		if (domain === 'category' && category.textContent !== 'Uncategorized') {
			categories.push(category.textContent);
		} else if (domain === 'post_tag') {
			categories.push(category.textContent); // Add tags to categories for simplicity
		}
	}

	// If no categories, add a default one
	if (categories.length === 0) {
		categories.push('Development');
	}

	// Get the slug
	const slugElement = item.getElementsByTagName('wp:post_name')[0];
	const slug = slugElement.textContent;

	// Create directory for year/month
	const yearMonthDir = path.join(blogOutputDir, year.toString(), month.toString());
	if (!fs.existsSync(yearMonthDir)) {
		fs.mkdirSync(yearMonthDir, { recursive: true });
	}

	// Create the output file path
	const outputFilePath = path.join(yearMonthDir, `${slug}.mdx`);

	// Extract first paragraph for excerpt (up to 150 chars)
	let excerpt = '';
	const firstParagraphMatch = content.match(/<p>(.*?)<\/p>/);
	if (firstParagraphMatch) {
		// Strip HTML from the excerpt
		excerpt = firstParagraphMatch[1].replace(/<[^>]*>/g, '');
		if (excerpt.length > 160) {
			excerpt = excerpt.substring(0, 157) + '...';
		}
	}

	// Handle [gist] shortcodes
	content = content.replace(
		/\[gist\s+https:\/\/gist\.github\.com\/([^\/]+)\/([^\]]+)\]/g,
		(match, user, gistId) => {
			return `<iframe src="https://gist.github.com/${user}/${gistId}.pibb" width="100%" frameborder="0"></iframe>`;
		}
	);

	// Handle [code] shortcodes
	content = content.replace(
		/\[code\s+language="([^"]+)"\]([\s\S]*?)\[\/code\]/g,
		(match, lang, code) => {
			return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
		}
	);

	// Handle [code] shortcodes without language
	content = content.replace(/\[code\]([\s\S]*?)\[\/code\]/g, (match, code) => {
		return `\n\`\`\`\n${code}\n\`\`\`\n`;
	});

	// Convert HTML to Markdown
	const markdownContent = turndownService.turndown(content);

	// Format date for frontmatter
	const formattedDate = `${year}-${month}-${day}`;
	const readableDate = new Date(formattedDate).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Create frontmatter
	const frontmatter = `---
layout: ../../../layouts/BlogLayout.astro
title: ${JSON.stringify(title)}
date: ${readableDate}
tags: ${JSON.stringify(categories)}
excerpt: ${JSON.stringify(excerpt)}
---

${markdownContent}`;

	// Write the MDX file
	fs.writeFileSync(outputFilePath, frontmatter);
	console.log(`Created ${outputFilePath}`);
}

console.log('WordPress to Astro migration complete!');
