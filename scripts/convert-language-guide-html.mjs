import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse } from 'parse5';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultHelpRoot = resolve(projectRoot, '../PABC_GIT/PABCNetHelp');
const mappingFile = resolve(projectRoot, 'docs/language-guide-legacy-map.json');

const normalizePath = (value) => value.replaceAll('\\', '/').replace(/^\.\//, '');

function descendants(node) {
  return node.childNodes ?? [];
}

function findElement(node, tagName) {
  if (node.tagName === tagName) return node;
  for (const child of descendants(node)) {
    const found = findElement(child, tagName);
    if (found) return found;
  }
}

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value;
}

function plainText(node) {
  if (node.nodeName === '#text') return node.value;
  if (node.tagName === 'br') return '\n';
  return descendants(node).map(plainText).join('');
}

function findElements(node, tagName, found = []) {
  if (node.tagName === tagName) found.push(node);
  for (const child of descendants(node)) findElements(child, tagName, found);
  return found;
}

function inlineCode(node, context) {
  const value = plainText(node).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const delimiter = value.includes('`') ? '``' : '`';
  const code = `${delimiter}${value}${delimiter}`;
  const links = findElements(node, 'a');
  if (links.length === 1 && normalizeInline(plainText(links[0])) === value) {
    return `[${code}](${context.resolveLink(attribute(links[0], 'href'))})`;
  }
  return code;
}

function normalizeInline(value) {
  return value.replace(/\u00a0/g, ' ').replace(/[\t\r\n ]+/g, ' ').replace(/ +([,.;:!?])/g, '$1').trim();
}

function hasDescendant(node, tagName) {
  return node.tagName === tagName || descendants(node).some((child) => hasDescendant(child, tagName));
}

function renderInline(node, context) {
  if (node.nodeName === '#text') return node.value;
  if (node.tagName === 'br') return ' ';
  if (node.tagName === 'code') return inlineCode(node, context);

  const content = descendants(node).map((child) => renderInline(child, context)).join('');
  if ((node.tagName === 'strong' || node.tagName === 'b') && !hasDescendant(node, 'code')) return `**${normalizeInline(content)}**`;
  if ((node.tagName === 'em' || node.tagName === 'i') && !hasDescendant(node, 'code')) return `*${normalizeInline(content)}*`;
  if (node.tagName === 'a') {
    const href = attribute(node, 'href');
    if (!href) return content;
    return `[${normalizeInline(content)}](${context.resolveLink(href)})`;
  }
  return content;
}

function codeText(node) {
  if (node.nodeName === '#text') {
    if (/^[\t\r\n ]*$/.test(node.value)) return /[\r\n\t]/.test(node.value) ? '' : ' ';
    return node.value
      .replace(/^[\t\r\n ]+/, (space) => /[\r\n\t]/.test(space) ? ' ' : space)
      .replace(/[\t\r\n ]+$/, (space) => /[\r\n\t]/.test(space) ? ' ' : space)
      .replace(/[\t\r\n ]+/g, ' ');
  }
  if (node.tagName === 'br') return '\n';
  const value = descendants(node).map(codeText).join('');
  return node.tagName === 'p' ? `${value}\n` : value;
}

function renderCodeBlock(node) {
  let lines = codeText(node).replace(/\u00a0/g, ' ').split('\n').map((line) => line.replace(/\s+$/g, ''));
  while (lines[0]?.trim() === '') lines.shift();
  while (lines.at(-1)?.trim() === '') lines.pop();
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length);
  const commonIndent = indents.length ? Math.min(...indents) : 0;
  lines = lines.map((line) => line.slice(commonIndent));
  return `\`\`\`pascalabc\n${lines.join('\n')}\n\`\`\``;
}

function renderList(node, context, ordered = false) {
  let index = 0;
  return descendants(node).filter((child) => child.tagName === 'li').map((item) => {
    index += 1;
    return `${ordered ? `${index}.` : '-'} ${normalizeInline(renderInline(item, context))}`;
  }).join('\n');
}

function renderBlocks(node, context) {
  const blocks = [];
  for (const child of descendants(node)) {
    if (child.nodeName === '#text') {
      const text = normalizeInline(child.value);
      if (text) blocks.push(text);
      continue;
    }
    if (child.tagName === 'h1') continue;
    if (child.tagName === 'h2' || child.tagName === 'h3') {
      blocks.push(`${child.tagName === 'h2' ? '##' : '###'} ${normalizeInline(plainText(child))}`);
    } else if (child.tagName === 'p') {
      const text = normalizeInline(renderInline(child, context));
      if (text && text !== '&nbsp;') blocks.push(text);
    } else if (child.tagName === 'blockquote') {
      blocks.push(renderCodeBlock(child));
    } else if (child.tagName === 'ul' || child.tagName === 'ol') {
      blocks.push(renderList(child, context, child.tagName === 'ol'));
    } else if (!['script', 'style', 'object'].includes(child.tagName)) {
      blocks.push(...renderBlocks(child, context));
    }
  }
  return blocks.filter(Boolean);
}

function createSourceIndex(mapping) {
  const sourceIndex = new Map();
  for (const topic of mapping.topics) {
    for (const source of topic.legacySources) sourceIndex.set(normalizePath(source).toLowerCase(), topic.topicId);
  }
  for (const source of mapping.additionalSources) sourceIndex.set(normalizePath(source.source).toLowerCase(), source.topicId);
  return sourceIndex;
}

function legacyHelpUrl(relativeSource) {
  let decoded = relativeSource;
  try { decoded = decodeURI(relativeSource); } catch { /* retain malformed legacy escape */ }
  return `https://pascalabc.net/downloads/pabcnethelp/${encodeURI(decoded)}`;
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^(---\r?\n[\s\S]*?\r?\n---)\r?\n/);
  if (!match) throw new Error('Destination Markdown has no frontmatter');
  return match[1];
}

function yamlScalar(value) {
  return /^[\p{L}\p{N}_. -]+$/u.test(value) && !/^(?:true|false|null|yes|no|on|off)$/i.test(value)
    ? value
    : JSON.stringify(value);
}

function withKeywords(frontmatter, keywords) {
  let normalized = frontmatter.replaceAll('\r\n', '\n');
  normalized = normalized.replace(/\nkeywords:(?: \[\])?\n(?:  -[^\n]*\n)*/g, '\n');
  const keywordYaml = keywords.length
    ? `keywords:\n${keywords.map((keyword) => `  - ${yamlScalar(keyword)}`).join('\n')}\n`
    : 'keywords: []\n';
  return normalized.replace(/\n---$/, `\n${keywordYaml}---`);
}

export function convertLegacyHtml(htmlBytes, { source, sourceRoot = defaultHelpRoot, mapping, destinationMarkdown }) {
  const html = new TextDecoder('windows-1251', { fatal: true }).decode(htmlBytes);
  const document = parse(html);
  const body = findElement(document, 'body');
  if (!body) throw new Error(`${source}: body not found`);
  const keywords = [...new Set(findElements(document, 'param')
    .filter((node) => attribute(node, 'name')?.toLowerCase() === 'keyword')
    .map((node) => attribute(node, 'value')?.trim())
    .filter(Boolean))];

  const sourceIndex = createSourceIndex(mapping);
  const normalizedSource = normalizePath(source);
  const resolveLink = (href) => {
    if (/^(?:https?:|mailto:|#)/i.test(href)) return href;
    const [pathPart, fragment] = href.split('#', 2);
    const resolved = normalizePath(resolve(dirname(resolve(sourceRoot, normalizedSource)), pathPart));
    const relativeSource = normalizePath(relative(sourceRoot, resolved));
    const topicId = sourceIndex.get(relativeSource.toLowerCase());
    if (topicId) return `/language-guide/${topicId}/${fragment ? `#${fragment}` : ''}`;
    return `${legacyHelpUrl(relativeSource)}${fragment ? `#${fragment}` : ''}`;
  };

  const blocks = renderBlocks(body, { resolveLink });
  if (!blocks.length) throw new Error(`${source}: no content converted`);
  return `${withKeywords(parseFrontmatter(destinationMarkdown), keywords)}\n\n${blocks.join('\n\n')}\n`;
}

export function convertTopics(topicIds, { helpRoot = defaultHelpRoot, write = true } = {}) {
  const mapping = JSON.parse(readFileSync(mappingFile, 'utf8'));
  const wanted = new Set(topicIds);
  const converted = [];
  for (const topic of mapping.topics) {
    if (!wanted.has(topic.topicId)) continue;
    if (topic.legacySources.length !== 1) throw new Error(`${topic.topicId}: expected exactly one legacy source`);
    const source = topic.legacySources[0];
    const destination = resolve(projectRoot, topic.file);
    const destinationMarkdown = readFileSync(destination, 'utf8');
    const markdown = convertLegacyHtml(readFileSync(resolve(helpRoot, source)), {
      source,
      sourceRoot: helpRoot,
      mapping,
      destinationMarkdown
    });
    converted.push({ topicId: topic.topicId, source, destination, markdown, unchanged: markdown === destinationMarkdown });
  }
  const missing = [...wanted].filter((id) => !converted.some((item) => item.topicId === id));
  if (missing.length) throw new Error(`Unknown topicId: ${missing.join(', ')}`);
  if (write) for (const result of converted) writeFileSync(result.destination, result.markdown, 'utf8');
  return converted;
}

function usage() {
  return 'Usage: node scripts/convert-language-guide-html.mjs [--check] [--help-root PATH] TOPIC_ID...';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  let write = true;
  let helpRoot = defaultHelpRoot;
  const topicIds = [];
  while (args.length) {
    const value = args.shift();
    if (value === '--check') write = false;
    else if (value === '--help-root') helpRoot = resolve(args.shift() ?? '');
    else if (value === '--help') { console.log(usage()); process.exit(0); }
    else topicIds.push(value);
  }
  if (!topicIds.length) throw new Error(usage());
  const results = convertTopics(topicIds, { helpRoot, write });
  if (!write) {
    const stale = results.filter((result) => !result.unchanged);
    if (stale.length) throw new Error(`Generated Markdown differs: ${stale.map((item) => item.topicId).join(', ')}`);
  }
  for (const result of results) {
    console.log(`${write ? 'Converted' : 'Checked'} ${result.topicId}: ${normalizePath(relative(projectRoot, result.destination))}`);
  }
}
