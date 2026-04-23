---
name: blog-post
description: 'Create a new blog post MDX file in the correct dated directory with proper frontmatter. Use when writing a new blog post, publishing a technical article, sharing an opinion piece, or documenting a solution.'
argument-hint: "Topic or working title for the post (e.g. 'using Zod with SvelteKit forms')"
user-invocable: true
---

# New Blog Post

Create a new blog post MDX file for this portfolio.

## Arguments

`$ARGUMENTS` — the topic or working title for the post. If empty, ask the user what they want to write about.

## Instructions

### 1. Clarify the topic

If `$ARGUMENTS` is empty or vague, ask the user one focused question: what problem are they solving or what do they want to share? Don't ask multiple questions at once.

Once you have a clear topic, proceed.

### 2. Gather context

Before writing, ask the user for any missing details you need:

- Any specific code examples, libraries, or tools to feature?
- Is this a how-to, an opinion piece, or a lessons-learned post?
- Any strong opinions they want to express?

Only ask what you genuinely need — don't interrogate.

### 3. Create the file

**File path convention:** `src/pages/blog/YYYY/MM/kebab-case-slug.mdx`

Use today's date for YYYY and MM. Derive the kebab-case slug from the title (lowercase, hyphens, no special characters).

**Frontmatter:**

```
---
layout: ../../../../layouts/BlogLayout.astro
title: 'Post Title'
date: Month Day, Year
tags: ['tag1', 'tag2']
excerpt: 'One sentence that sells the post.'
---
```

The layout path `../../../../layouts/BlogLayout.astro` is always four levels up — double-check this is correct for the YYYY/MM depth.

### 4. Write the post

Write in **Dejan's voice** — here's what that means in practice:

**Tone:**

- Friendly and informal, like explaining something to a smart colleague over coffee
- Opinionated and direct — don't hedge everything, take a stance
- Honest about trade-offs and limitations, including your own ("I'm likely just scratching the surface here")
- Occasionally self-deprecating or wry ("Pretty nifty strategy if you ask me")
- No corporate speak, no filler phrases like "In conclusion, it is worth noting that..."
- Start with a strong real-world take early when relevant (for example: who currently has the best DX, where the trade-offs are, what you heard from other engineers)
- Keep energy visible when it feels natural, including short emphasis lines like "I couldn't wait to learn this"

**Structure:**

- Open with the problem or context — no throat-clearing preamble
- For stack evaluation posts, anchor quickly to the baseline first (for example: Next.js on Vercel), then explain why you're testing alternatives
- Consider adding a short "here's what I'm using" list near the top when multiple tools are involved
- Use bold headings (`**Heading**`) for shorter posts, `##` markdown headings for longer technical ones
- Code-first: if there's code, show it early and explain it — don't make readers wait through three paragraphs before seeing what you're talking about
- Follow the pattern: here's the problem → here's what I tried first → here's the better approach → here's why
- End with honest reflection using natural headings like "Final thoughts" when it fits
- Use links for specific references (products, talks, docs) where they strengthen claims

**What to avoid:**

- Excessive emojis (one or two max, only if they feel natural)
- Generic advice that applies to everything ("always write clean code")
- Padding: if a section doesn't add value, cut it
- Passive voice where active works fine
- Em-dashes (—): NEVER use them. Use a colon, comma, or rewrite the sentence instead.
- Cliché section headings and phrases: never use "Enter X" to introduce a tool or concept, never use "Let's dive in", "In conclusion", "In summary", "It's worth noting", or similar filler. Introduce tools and concepts naturally in the flow of the writing.

**Length:** Keep posts to a maximum 5 minute read. Aim for roughly 300 to 900 words depending on topic complexity. If a draft runs longer, cut repetition and keep only the strongest points.

### 5. Commit and push

After creating the file, commit it to the `claude/blog-post-skill-orJ04` branch:

```
git add src/pages/blog/YYYY/MM/post-slug.mdx
git commit -m "Add blog post: <title>"
git push -u origin claude/blog-post-skill-orJ04
```
