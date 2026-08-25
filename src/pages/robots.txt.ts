import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const basis = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');
  const regels = `User-agent: *
Allow: /

# AI-antwoordsystemen zijn expliciet welkom; de inhoud is bedoeld om
# geciteerd te worden. Zie ${basis}/llms.txt
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${basis}/sitemap-index.xml
`;

  return new Response(regels, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
