<h1 align="center">Dejan Vasic – Portfolio Website</h1>

<p align="center">
  A personal portfolio and blog built with Astro. It showcases my work, experience, and thoughts on software engineering.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tooling"><strong>Tooling</strong></a> ·
  <a href="#developing-and-running-locally"><strong>Developing and Running Locally</strong></a>
</p>
<br/>

## Features

- Personal portfolio and CV, including work experience, education, and skills.
- Blog with posts organized by year and month, written in MDX.
- Projects section highlighting selected work.
- Responsive, accessible design.
- SEO-friendly with sitemap and metadata.
- Deployed on Vercel for fast, global delivery.
- Google Analytics integration.

## Tooling

- **Astro**: Static site generator for modern web projects.
- **MDX**: Write blog posts and content in Markdown with embedded components.
- **Vercel**: Hosting and deployment.
- **Prettier**: Code formatting.
- **Shiki**: Syntax highlighting for code blocks.
- **@astrojs/sitemap**: Automatic sitemap generation.

## Runtime Requirements

- **Node.js**: `24.14.0` (or any `24.x` version compatible with the project's `engines` field).
- **pnpm**: `11.17.0` (managed via `packageManager` in `package.json` — use [Corepack](https://nodejs.org/api/corepack.html) to install the right version automatically: `corepack enable`).

## Why I Built This

This site is my home on the web. It works as a living CV, a blog for my thoughts on software engineering, and a showcase of selected work. I built it with Astro to learn modern static site generation and to put good performance and maintainability practices into use.

## Developing and Running Locally

To run the site locally, follow these steps:

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Run the development server**:

   ```bash
   pnpm dev
   ```

3. **Preview the site**:
   - Open [http://localhost:3366](http://localhost:3366) in your browser.

4. **Format code** (optional):

   ```bash
   pnpm format
   ```

## Deploying

The site is deployed on Vercel. To deploy your own version, connect the repository to Vercel and set up the project. No special environment variables are required for a basic portfolio/blog.

---

This project is a labor of love and a way to share my work and ideas with the world. Feedback and contributions are welcome!
