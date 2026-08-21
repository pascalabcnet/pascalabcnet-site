import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
  const escape = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]!);
  const items = articles.map(item => `<item><title>${escape(item.data.title)}</title><link>https://pascalabc.net/articles/${item.id}/</link><guid>https://pascalabc.net/articles/${item.id}/</guid>${item.data.date ? `<pubDate>${item.data.date.toUTCString()}</pubDate>` : ''}<description>${escape(item.data.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Статьи PascalABC.NET</title><link>https://pascalabc.net/articles/</link><description>Авторские статьи о PascalABC.NET и обучении программированию</description><language>ru</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
