import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'parse5';

// Run after a production build; npm run test:articles builds before running these checks.
const readPage = path => readFileSync(`dist${path}index.html`, 'utf8');
const walk = node => [node, ...(node.childNodes ?? []).flatMap(walk)];
const attr = (node, key) => node.attrs?.find(attribute => attribute.name === key)?.value;
const hasClass = (node, name) => (attr(node, 'class') ?? '').split(' ').includes(name);
const text = node => node.value ?? (node.childNodes ?? []).map(text).join('');
const articlePaths = ['priorityqueue-dotnet10', 'dijkstra'];
const sharedPaths = ['', 'category/algorithms/', 'category/dotnet/', ...articlePaths.map(path => `${path}/`)];

test('English archive and categories contain only the matching translated articles', () => {
  for (const [path, expected] of [
    ['/en/articles/', 2],
    ['/en/articles/category/algorithms/', 1],
    ['/en/articles/category/dotnet/', 1],
  ]) {
    const nodes = walk(parse(readPage(path)));
    assert.equal(attr(nodes.find(node => node.tagName === 'html'), 'lang'), 'en');
    assert.equal(nodes.filter(node => node.tagName === 'article').length, expected);
    const filters = nodes.find(node => hasClass(node, 'article-filters'));
    const links = walk(filters).filter(node => node.tagName === 'a');
    assert.equal(links.length, 3);
    assert.equal(links.filter(node => attr(node, 'aria-current') === 'page').length, 1);
    for (const link of links) assert(existsSync(`dist${attr(link, 'href')}index.html`));
    if (path.includes('algorithms')) assert(nodes.some(node => node.tagName === 'h2' && text(node).includes('Dijkstra')));
    if (path.includes('dotnet')) assert(nodes.some(node => node.tagName === 'h2' && text(node).includes('PriorityQueue')));
  }
});

test('translated pages have self-canonicals, reciprocal hreflang and sitemap entries', () => {
  const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
  for (const suffix of sharedPaths) {
    const ru = `https://pascalabc.net/articles/${suffix}`;
    const en = `https://pascalabc.net/en/articles/${suffix}`;
    for (const [locale, url, path] of [['ru', ru, `/articles/${suffix}`], ['en', en, `/en/articles/${suffix}`]]) {
      const nodes = walk(parse(readPage(path)));
      assert.equal(attr(nodes.find(node => node.tagName === 'html'), 'lang'), locale);
      assert.equal(attr(nodes.find(node => attr(node, 'rel') === 'canonical'), 'href'), url);
      for (const [language, href] of [['ru', ru], ['en', en]]) {
        assert(nodes.some(node => attr(node, 'hreflang') === language && attr(node, 'href') === href));
      }
      assert(sitemap.includes(`<loc>${url}</loc>`));
    }
  }
});

test('English articles contain crawlable code, cross-links and accurate structured data', () => {
  for (const slug of articlePaths) {
    const nodes = walk(parse(readPage(`/en/articles/${slug}/`)));
    assert.equal(nodes.filter(node => node.tagName === 'h1').length, 1);
    assert(nodes.some(node => node.tagName === 'pre' && text(node).includes('uses System.Collections.Generic;')));
    assert(nodes.some(node => attr(node, 'name') === 'description' && attr(node, 'content').length > 80));
    assert(!nodes.some(node => attr(node, 'name') === 'robots' && attr(node, 'content')?.includes('noindex')));
    const other = articlePaths.find(other => other !== slug);
    assert(nodes.some(node => node.tagName === 'a' && attr(node, 'href') === `/en/articles/${other}/`));
    const structured = nodes.find(node => attr(node, 'type') === 'application/ld+json');
    const [article, breadcrumbs] = JSON.parse(text(structured));
    assert.equal(article['@type'], 'BlogPosting');
    assert.equal(article.inLanguage, 'en');
    assert.equal(article.mainEntityOfPage, `https://pascalabc.net/en/articles/${slug}/`);
    assert.equal(breadcrumbs['@type'], 'BreadcrumbList');
    for (const crumb of breadcrumbs.itemListElement) {
      assert(existsSync(`dist${new URL(crumb.item).pathname}index.html`));
    }
  }
});

test('English Dijkstra retains the original program and statically rendered TeX', () => {
  const en = walk(parse(readPage('/en/articles/dijkstra/')));
  const ru = walk(parse(readPage('/articles/dijkstra/')));
  const fullProgram = nodes => text(nodes.find(node => node.tagName === 'pre' && text(node).includes('var edges := [')));
  assert.equal(fullProgram(en), fullProgram(ru));
  assert(en.some(node => node.tagName === 'math'));
  assert(en.some(node => hasClass(node, 'katex-display')));
  assert(!en.some(node => hasClass(node, 'katex-error')));
  for (const node of en.filter(node => attr(node, 'rel') === 'stylesheet')) {
    assert(existsSync(`dist${attr(node, 'href')}`));
  }
});

test('English main navigation links to Articles and the Russian archive is preserved', () => {
  const home = walk(parse(readPage('/en/')));
  assert(home.some(node => node.tagName === 'a' && attr(node, 'href') === '/en/articles/' && text(node) === 'Articles'));
  const ru = walk(parse(readPage('/articles/')));
  assert.equal(text(ru.find(node => node.tagName === 'h1')), 'Статьи');
  assert(ru.some(node => node.tagName === 'a' && attr(node, 'href') === '/articles/dijkstra/'));
});
