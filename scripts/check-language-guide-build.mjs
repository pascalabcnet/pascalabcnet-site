import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
assert(existsSync(join(root, 'index.html')), `Build the production site before checking ${root}`);
const files = readdirSync(root, { recursive: true }).filter((path) => /\.(html|xml|json|js)$/i.test(path));
const forbidden = [/\/(?:en\/)?language-guide(?:\/|["'#?])/, /Language Guide \(new\)/, /data-language-guide-next/, /Тестовая страница новой ветки руководства/];
assert(!existsSync(join(root, 'language-guide')), 'Production contains a Language Guide directory');
assert(!existsSync(join(root, 'en', 'language-guide')), 'Production contains an English Language Guide directory');
for (const file of files) {
  const content = readFileSync(join(root, file), 'utf8');
  for (const pattern of forbidden) assert(!pattern.test(content), `${file} contains dev-only content: ${pattern}`);
}
const sitemaps = files.filter((file) => /sitemap.*\.xml$/i.test(file));
assert(sitemaps.length > 0, 'No XML sitemap found: cannot verify sitemap exclusion');
console.log(`PASS: ${files.length} production HTML/XML/JSON/JS files checked; no guide routes, menu, markup or sample text. ${sitemaps.length} sitemap files checked.`);
