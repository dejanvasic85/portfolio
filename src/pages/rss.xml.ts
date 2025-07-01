import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

interface BlogPost {
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
  };
}

export async function GET(context: APIContext) {
  // Get all blog posts
  const allPosts = await import.meta.glob<BlogPost>('./blog/**/*.mdx', { eager: true });
  
  // Convert to array and sort by date
  const posts = Object.entries(allPosts)
    .map(([path, post]) => ({
      ...post.frontmatter,
      url: path
        .replace('./blog/', '/blog/')
        .replace('/index.mdx', '/')
        .replace('.mdx', '/'),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return rss({
    title: 'Dejan Vasic - Blog',
    description: 'Thoughts on software engineering, leadership, and technology.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.date),
      description: post.excerpt,
      link: post.url,
      categories: post.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
}
