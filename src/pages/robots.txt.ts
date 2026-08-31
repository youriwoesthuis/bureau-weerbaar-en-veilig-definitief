import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const basis = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');
  const regels = `User-agent: *
Allow: /

# AI-antwoordsystemen zijn expliciet welkom; de inhoud is bedoeld om
# geciteerd te worden. Zie ${basis}/llms.txt
# Trainingsdata-crawlers én live-antwoordbots: ChatGPT-User en OAI-SearchBot
# zijn de bots die ChatGPT gebruikt terwijl iemand zoekt — GPTBot alleen
# verzamelt trainingsdata. Bingbot voedt Copilot.
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Amazonbot
User-agent: Bingbot
Allow: /

Sitemap: ${basis}/sitemap-index.xml
`;

  return new Response(regels, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
