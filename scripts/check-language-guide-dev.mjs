import assert from 'node:assert/strict';
import { createGuideManifest } from '../src/lib/language-guide.ts';
import { readGuideDocuments } from '../tests/helpers/language-guide-corpus.mjs';

const guide = createGuideManifest(readGuideDocuments());

const origin = process.argv[2] ?? 'http://127.0.0.1:4321';
async function page(path) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
}
const home = await page('/');
assert(/<a\b[^>]*href="\/language-guide\/"[^>]*>/.test(home), 'Dev menu is missing');
assert(home.includes('https://pascalabc.net/downloads/pabcnethelp/index.htm'), 'Legacy help link must remain');
const entry = await fetch(new URL('/language-guide/', origin), { redirect: 'manual' });
assert.equal(entry.status, 302, 'Guide entry URL must redirect to the first topic');
assert.equal(entry.headers.get('location'), guide.topics[0].href, 'Guide entry URL has the wrong destination');
const contents = await page(guide.topics[0].href);
function checkSidebarOnly(html) {
  assert(!html.includes('guide-breadcrumbs'), 'Breadcrumbs must not be rendered');
  assert(!html.includes('guide-description'), 'SEO description must not be displayed as a subtitle');
  assert.match(html, /<meta name="description" content="[^"]+"/, 'SEO description must remain');
  assert.equal((html.match(/<ul class="guide-tree"/g) ?? []).length, 1, 'Expected a single sidebar tree');
  assert(!/<a\b[^>]*>\s*Оглавление\s*<\/a>/.test(html), 'Redundant contents link');
  assert(!html.includes('guide-tree-catalog'), 'Duplicate central contents tree');
  assert(html.includes('id="section-program"'), 'Sidebar section anchor missing');
}
checkSidebarOnly(contents);
assert(contents.includes('section-program'), 'Missing section anchor');
assert(!contents.includes('section-declarations'), 'Nested subsection must be absent');
assert(contents.includes(`href="${guide.topics[1].href}" rel="next"`));
for (const section of guide.sections) assert(contents.includes(`id="section-${section.id}"`));
assert(!contents.includes('PABCSystemUnit'), 'Generated help must not be included');
assert(!contents.includes('href="/language-guide/overview/"'), 'Removed overview must not appear in navigation');

const pages = guide.topics.map((topic) => [topic.id, topic.title]);
for (const [index, [topic, title]] of pages.entries()) {
  assert(contents.includes(`href="/language-guide/${topic}/"`) && contents.includes(title), `${topic}: missing from contents`);
  const html = await page(`/language-guide/${topic}/`);
  checkSidebarOnly(html);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${topic}: expected exactly one h1`);
  assert(html.includes('data-language-guide-next'), `${topic}: guide layout missing`);
  assert.equal(html.match(/<h1(?:\s[^>]*)?>([^<]+)<\/h1>/)?.[1], title, `${topic}: incorrect title`);
  assert(html.includes('charset="UTF-8"'), `${topic}: charset is missing`);
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
  if (/<h[23]\b/.test(article)) {
    assert(html.includes('guide-page-toc'), `${topic}: missing page headings navigation`);
    assert(html.indexOf('<nav class="guide-page-toc"') > html.indexOf('</article>'), `${topic}: page navigation must be outside and after the article`);
    assert(/class="[^"]*\bguide-layout-with-toc\b/.test(html), `${topic}: missing optional right column`);
    const toc = html.match(/<nav class="guide-page-toc"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
    const anchors = [...toc.matchAll(/href="#([^"]+)"/g)];
    assert(anchors.length > 0, `${topic}: missing heading links`);
    for (const [, id] of anchors) assert(html.includes(`id="${id}"`), `${topic}: heading link has no target`);
  } else {
    assert(!html.includes('<nav class="guide-page-toc"'), `${topic}: no right navigation for a page without headings`);
    assert(!/class="[^"]*\bguide-layout-with-toc\b/.test(html), `${topic}: no empty right column`);
  }
  if (['program-structure', 'variables'].includes(topic)) {
    assert(html.includes('data-language="pascalabc"'), `${topic}: custom PascalABC.NET highlighting is missing`);
  }
  if (topic === 'program-structure') {
    assert(article.includes('href="/language-guide/uses/"'), 'Cross-reference to uses is missing');
    assert(article.includes('href="/language-guide/short-program/"'), 'Link to the short program form is missing');
    assert(!article.includes('Тестовая страница'), 'Program structure must contain the reference text');
    assert.match(article, /<blockquote>\s*<h2[^>]*>Совместимость<\/h2>/, 'Compatibility section must be highlighted separately');
    assert.match(article, /<code><strong class="pascal-keyword">begin<\/strong><\/code>/, 'Inline Pascal keyword must be highlighted');
  }
  assert(html.includes(`href="https://pascalabc.net/language-guide/${topic}/"`), `${topic}: incorrect canonical`);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  if (index === 0) {
    assert(!html.includes('rel="prev"'), 'First topic must have no Previous');
  } else {
    assert(html.includes(`href="/language-guide/${pages[index - 1][0]}/" rel="prev"`), `${topic}: incorrect Previous`);
  }
  if (index === pages.length - 1) {
    assert(!html.includes('rel="next"'), 'Last topic must have no Next');
  } else {
    assert(html.includes(`href="/language-guide/${pages[index + 1][0]}/" rel="next"`), `${topic}: incorrect Next`);
  }
}
assert.equal((await fetch(new URL('/language-guide/not-a-topic/', origin))).status, 404);
assert.equal((await fetch(new URL('/language-guide/overview/', origin))).status, 404);
assert.equal((await fetch(new URL('/en/language-guide/', origin))).status, 404);
console.log(`PASS: ${pages.length} topic URLs, ${guide.sections.length} sections, metadata, sidebar, heading links, cross-reference to uses, Previous/Next across section boundaries, missing-topic 404 and no English pages.`);
