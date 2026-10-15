import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

const DEFAULT_OUTPUT = 'docs/language-guide-audit';
const PAGE_EXTENSIONS = new Set(['.htm', '.html']);
const GENERATED_SECTIONS = new Set(['LangGuide/PABCSystemUnit']);

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith('--')) continue;
    const key = argument.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`Expected a value after --${key}`);
    result[key] = value;
    index += 1;
  }
  return result;
}

function walk(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.name.toLowerCase() === '_vti_cnf') continue;
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (entry.isFile() && PAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) files.push(fullPath);
  }
  return files;
}

function decodeHtml(filePath) {
  return new TextDecoder('windows-1251').decode(readFileSync(filePath));
}

function decodeEntities(value) {
  const named = new Map([
    ['amp', '&'], ['lt', '<'], ['gt', '>'], ['quot', '"'], ['apos', "'"], ['nbsp', ' '],
    ['laquo', '«'], ['raquo', '»'], ['ndash', '–'], ['mdash', '—'], ['hellip', '…'],
  ]);
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named.get(name.toLowerCase()) ?? match);
}

function plainText(value) {
  return decodeEntities(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html, expression) {
  const match = expression.exec(html);
  return match ? plainText(match[1]) : '';
}

function normalizeRelativePath(root, filePath) {
  return relative(root, filePath).split(sep).join('/');
}

function getSection(relativePath) {
  const parts = relativePath.split('/');
  return parts.length > 1 ? parts[0] : '(root)';
}

function extractLinks(html) {
  const links = [];
  const expression = /<a\b[^>]*?href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(expression)) {
    links.push({ href: decodeEntities(match[1] ?? match[2] ?? match[3] ?? '').trim(), text: plainText(match[4]) });
  }
  return links;
}

function classifyLink(pagePath, href, knownFiles) {
  if (!href || href.startsWith('#')) return { kind: 'anchor' };
  if (/^(?:https?:|mailto:|ftp:|javascript:)/i.test(href)) return { kind: 'external' };

  const pathPart = href.split('#', 1)[0].split('?', 1)[0];
  let decodedPath = pathPart;
  try { decodedPath = decodeURIComponent(pathPart); } catch { /* Keep malformed paths for reporting. */ }
  const targetPath = resolve(dirname(pagePath), decodedPath.replaceAll('/', sep));
  if (!PAGE_EXTENSIONS.has(extname(targetPath).toLowerCase())) return { kind: 'asset', targetPath };

  return knownFiles.has(targetPath.toLowerCase())
    ? { kind: 'page', targetPath }
    : { kind: 'broken-page', targetPath };
}

function pageId(sourceName, relativePath) {
  return `${sourceName}/${relativePath}`;
}

function markdownTable(rows) {
  return rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
}

function buildMarkdown(report) {
  const sectionRows = report.sections.map((section) => [
    section.source,
    `\`${section.name}\``,
    section.generated ? 'генерируемый — отложен' : 'ручной',
    String(section.pages),
    String(section.words),
    String(section.codeFragments),
    String(section.brokenLinks),
  ]);
  const brokenRows = report.brokenLinks.slice(0, 100).map((link) => [
    `\`${link.page}\``,
    `\`${link.href.replaceAll('|', '\\|')}\``,
  ]);
  const pilotRows = report.pages
    .filter((page) => page.source === 'LangGuide' && page.section === '_ProgrStruct_Defs')
    .map((page) => [
      `\`${page.relativePath}\``,
      page.pageHeading || '—',
      String(page.words),
      String(page.codeFragments),
      String(page.incomingLinks),
      String(page.brokenLinks.length),
    ]);

  return `# Аудит старого Language Guide

Отчёт создан автоматически скриптом \`scripts/audit-language-guide.mjs\`.

## Общая картина

- Содержательных HTML-страниц: **${report.summary.pages}**.
- Страниц Language Guide: **${report.summary.langGuidePages}**.
- Страниц Common: **${report.summary.commonPages}**.
- Автоматически сформированных страниц PABCSystemUnit: **${report.summary.generatedPages}** (на этом этапе отложены).
- Страниц для ручного содержательного аудита: **${report.summary.manualPages}**.
- Ручных страниц без \`<title>\` и \`<h1>\`: **${report.summary.manualPagesWithoutPageHeading}**.
- Внутренних ссылок на отсутствующие HTML-страницы: **${report.summary.brokenPageLinks}**.
- Битых ссылок вне автоматически сформированного раздела: **${report.summary.manualBrokenPageLinks}**.
- Внешних ссылок: **${report.summary.externalLinks}**.
- Фрагментов \`<code>\` и \`<pre>\`: **${report.summary.codeFragments}**.
- Все исходные страницы прочитаны как Windows-1251; каталоги \`_vti_cnf\` исключены.

## Разделы

| Источник | Раздел | Тип | Страниц | Слов | Фрагментов кода | Битых ссылок |
| --- | --- | --- | ---: | ---: | ---: | ---: |
${markdownTable(sectionRows)}

## Пилотный раздел: структура программы и объявления

| Страница | Заголовок | Слов | Код | Входящих ссылок | Битых ссылок |
| --- | --- | ---: | ---: | ---: | ---: |
${markdownTable(pilotRows)}

## Битые ссылки на страницы

${brokenRows.length ? `Показаны первые ${brokenRows.length} ссылок. Полный список находится в JSON-отчёте.\n\n| Исходная страница | Ссылка |\n| --- | --- |\n${markdownTable(brokenRows)}` : 'Не обнаружены.'}

## Как повторить аудит

\`\`\`powershell
node scripts/audit-language-guide.mjs --lang-guide "D:\\PABC_GIT\\PABCNetHelp\\LangGuide" --common "D:\\PABC_GIT\\PABCNetHelp\\Common"
\`\`\`

Подробные сведения по каждой странице записаны в \`docs/language-guide-audit.json\`.
`;
}

const args = parseArgs(process.argv.slice(2));
if (!args['lang-guide'] || !args.common) {
  throw new Error('Usage: node scripts/audit-language-guide.mjs --lang-guide <path> --common <path> [--output <path-without-extension>]');
}

const roots = [
  { name: 'LangGuide', path: resolve(args['lang-guide']) },
  { name: 'Common', path: resolve(args.common) },
];
for (const root of roots) {
  if (!existsSync(root.path) || !statSync(root.path).isDirectory()) throw new Error(`Directory not found: ${root.path}`);
}

const sourceFiles = roots.flatMap((root) => walk(root.path).map((filePath) => ({ root, filePath })));
const knownFiles = new Set(sourceFiles.map(({ filePath }) => filePath.toLowerCase()));
const sourceByPath = new Map(sourceFiles.map((source) => [source.filePath.toLowerCase(), source]));

const pages = sourceFiles.map(({ root, filePath }) => {
  const html = decodeHtml(filePath);
  const relativePath = normalizeRelativePath(root.path, filePath);
  const section = getSection(relativePath);
  const links = extractLinks(html).map((link) => ({ ...link, ...classifyLink(filePath, link.href, knownFiles) }));
  const bodyText = plainText((/<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html) ?? ['', html])[1]);
  const codeFragments = (html.match(/<(?:code|pre)\b/gi) ?? []).length;

  return {
    id: pageId(root.name, relativePath),
    source: root.name,
    relativePath,
    section,
    title: firstMatch(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i),
    heading: firstMatch(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i),
    generated: GENERATED_SECTIONS.has(`${root.name}/${section}`),
    words: bodyText ? bodyText.split(/\s+/u).length : 0,
    codeFragments,
    links: links.map(({ targetPath, ...link }) => {
      const targetSource = targetPath ? sourceByPath.get(targetPath.toLowerCase()) : undefined;
      return {
        ...link,
        ...(targetPath ? { target: targetSource
          ? pageId(targetSource.root.name, normalizeRelativePath(targetSource.root.path, targetSource.filePath))
          : targetPath } : {}),
      };
    }),
    brokenLinks: links.filter((link) => link.kind === 'broken-page').map((link) => link.href),
    incomingLinks: 0,
    legacyMarkup: {
      oleObject: /application\/x-oleobject/i.test(html),
      fontTags: (html.match(/<font\b/gi) ?? []).length,
      inlineStyles: (html.match(/\sstyle\s*=/gi) ?? []).length,
    },
  };
});

for (const page of pages) page.pageHeading = page.title || page.heading;

const pageById = new Map(pages.map((page) => [page.id, page]));
for (const page of pages) {
  for (const link of page.links.filter((item) => item.kind === 'page')) {
    const targetPage = pageById.get(link.target);
    if (targetPage) targetPage.incomingLinks += 1;
  }
}

const sectionMap = new Map();
for (const page of pages) {
  const key = `${page.source}/${page.section}`;
  const section = sectionMap.get(key) ?? {
    source: page.source,
    name: page.section,
    generated: page.generated,
    pages: 0,
    words: 0,
    codeFragments: 0,
    brokenLinks: 0,
  };
  section.pages += 1;
  section.words += page.words;
  section.codeFragments += page.codeFragments;
  section.brokenLinks += page.brokenLinks.length;
  sectionMap.set(key, section);
}

const brokenLinks = pages.flatMap((page) => page.brokenLinks.map((href) => ({ page: page.id, href })));
const report = {
  generatedAt: new Date().toISOString(),
  roots: Object.fromEntries(roots.map((root) => [root.name, root.path])),
  summary: {
    pages: pages.length,
    langGuidePages: pages.filter((page) => page.source === 'LangGuide').length,
    commonPages: pages.filter((page) => page.source === 'Common').length,
    generatedPages: pages.filter((page) => page.generated).length,
    manualPages: pages.filter((page) => !page.generated).length,
    manualPagesWithoutPageHeading: pages.filter((page) => !page.generated && !page.pageHeading).length,
    brokenPageLinks: brokenLinks.length,
    manualBrokenPageLinks: pages
      .filter((page) => !page.generated)
      .reduce((sum, page) => sum + page.brokenLinks.length, 0),
    externalLinks: pages.reduce((sum, page) => sum + page.links.filter((link) => link.kind === 'external').length, 0),
    codeFragments: pages.reduce((sum, page) => sum + page.codeFragments, 0),
  },
  sections: [...sectionMap.values()].sort((left, right) => `${left.source}/${left.name}`.localeCompare(`${right.source}/${right.name}`, 'en')),
  brokenLinks,
  pages: pages.sort((left, right) => left.id.localeCompare(right.id, 'en')),
};

const outputBase = resolve(args.output ?? DEFAULT_OUTPUT);
mkdirSync(dirname(outputBase), { recursive: true });
writeFileSync(`${outputBase}.json`, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
writeFileSync(`${outputBase}.md`, buildMarkdown(report), 'utf8');

console.log(`Audited ${report.summary.pages} pages.`);
console.log(`Broken page links: ${report.summary.brokenPageLinks}.`);
console.log(`Reports: ${outputBase}.md, ${outputBase}.json`);
