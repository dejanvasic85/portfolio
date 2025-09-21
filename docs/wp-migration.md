# WordPress to Astro Migration

This project includes a script to migrate WordPress blog posts to Astro MDX files with a year/month folder structure.

## How It Works

The migration process:

1. Parses the WordPress export XML file (`data/softwareengineeringnotebook.WordPress.2025-04-28.xml`)
2. Extracts post data (title, date, content, categories/tags)
3. Organizes posts into year/month folders (e.g., `blog/2015/02/post-slug.mdx`)
4. Converts HTML content to Markdown format
5. Handles WordPress shortcodes like `[gist]` and `[code]`
6. Creates frontmatter with metadata (title, date, tags, excerpt)

## Running the Migration

1. Install dependencies:

```bash
npm install
```

2. Run the migration script:

```bash
npm run migrate-wp
```

3. Check the generated files in `src/pages/blog/` directory

## Notes

- The script creates a frontmatter section in each MDX file with:
  - layout: Points to BlogLayout.astro
  - title: The original post title
  - date: Formatted date (Month Day, Year)
  - tags: Array of categories and tags
  - excerpt: First paragraph or first 160 characters

- Blog listing page (`src/pages/blog/index.astro`) shows all posts sorted by date

- Each post is rendered using the `BlogLayout.astro` component

## Customization

If you need to adjust the migration:

- Edit the `wp-to-astro.cjs` file to modify how content is processed
- Update the WordPress XML file path if needed
- Customize the frontmatter format to match your design requirements
