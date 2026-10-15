import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../../src/content/language-guide-next/', import.meta.url));

// Fixture reader for simple one-line frontmatter, not a general YAML loader.
// Astro remains responsible for the actual schema and Markdown rendering.
export function readGuideDocuments() {
  return readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.md')).map((file) => {
    const raw = readFileSync(resolve(root, file), 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    assert(match, `${file}: expected UTF-8 frontmatter`);
    const data = {};
    for (const key of ['topicId', 'locale', 'title', 'description']) {
      const value = match[1].match(new RegExp(`^${key}: (.+)$`, 'm'))?.[1].trim();
      assert(value, `${file}: missing ${key}`);
      data[key] = value.startsWith('"') ? JSON.parse(value)
        : value.startsWith("'") ? value.slice(1, -1).replaceAll("''", "'") : value;
    }
    return { id: file.replaceAll('\\', '/'), data, body: match[2] };
  });
}
