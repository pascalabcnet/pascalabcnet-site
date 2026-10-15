import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createGuideManifest as buildGuideManifest, guideHref, guideNeighbours } from '../src/lib/language-guide.ts';
import { guideReadingOrder } from '../src/data/language-guide.ts';
import { guideUI } from '../src/i18n/language-guide.ts';
import { readGuideDocuments } from './helpers/language-guide-corpus.mjs';

// Small fixtures exercise the model independently of the growing real corpus.
const fixtureOrder = ['program-structure', 'variables'];
const fixtureNavigation = [{ id: 'program', topics: fixtureOrder }];
const createGuideManifest = (documents, locale = 'ru', navigation = fixtureNavigation, order = fixtureOrder) =>
  buildGuideManifest(documents, locale, navigation, order);

const document = (topicId, locale = 'ru', title = topicId) => ({
  id: `arbitrary/folder/${topicId}`,
  data: { topicId, locale, title, description: `${title}: description` }
});
const entries = [document('program-structure'), document('variables')];

test('the expanded guide retains the agreed program topics in a two-level tree', () => {
  const guide = buildGuideManifest(guideReadingOrder.map((id) => document(id)));
  assert.equal(guide.sections.length, 14);
  assert.equal(guide.sections[0].id, 'program');
  const expected = ['program-structure', 'identifiers', 'comments', 'variables', 'constants', 'type-declarations', 'labels', 'scope', 'short-program'];
  assert.deepEqual(guide.sections[0].topics.map((topic) => topic.id), expected);
  assert.deepEqual(guide.topics.slice(0, expected.length).map((topic) => topic.id), expected);
});

test('every configured topic has UTF-8 Markdown and every section has localized UI labels', () => {
  const documents = readGuideDocuments();
  const guide = buildGuideManifest(documents);
  assert.equal(guide.topics.length, 132);
  assert(!guide.topics.some((topic) => topic.id === 'overview'));
  assert(documents.every((entry) => entry.data.locale === 'ru'), 'No English content in this phase');
  for (const section of guide.sections) {
    assert(guideUI.ru.sections[section.id]);
    assert(guideUI.en.sections[section.id]);
    assert(section.topics.length > 0);
    for (const topic of section.topics) {
      assert.match(topic.entry.id, /^ru\/\d{2}_[^/]+\/\d{2}[a-z]?_/);
      const neutralPath = topic.entry.id.replace(/(^ru\/|\/)\d{2}[a-z]?_/g, '$1');
      assert.equal(neutralPath, `ru/${section.id}/${topic.id}.md`);
      assert(!/^# /m.test(topic.entry.body), `${topic.id}: layout owns h1`);
    }
  }
});

test('editorial source mapping covers the corpus but excludes generated help', () => {
  const mapping = JSON.parse(readFileSync(new URL('../docs/language-guide-legacy-map.json', import.meta.url), 'utf8'));
  const documents = readGuideDocuments();
  const ids = new Set(documents.map((doc) => doc.data.topicId));
  assert.equal(mapping.topics.length, ids.size);
  assert.equal(new Set(mapping.topics.map((topic) => topic.topicId)).size, ids.size);
  const sources = new Set();
  for (const topic of mapping.topics) {
    assert(ids.has(topic.topicId));
    const document = documents.find((entry) => entry.data.topicId === topic.topicId);
    assert.equal(topic.file, `src/content/language-guide-next/${document.id}`);
    for (const source of topic.legacySources) {
      assert(!/PABCSystemUnit|PABCUnits|FuncProgramming\/Files/.test(source));
      assert(!sources.has(source), `${source}: duplicate mapping`);
      sources.add(source);
    }
  }
  for (const alias of mapping.additionalSources) assert(ids.has(alias.topicId));
  assert.deepEqual(mapping.topics.find((topic) => topic.topicId === 'uses').legacySources, ['LangGuide/Modules/uses.html']);
});

test('cross-links point to stable existing topic URLs', () => {
  const documents = readGuideDocuments();
  const ids = new Set(documents.map((doc) => doc.data.topicId));
  for (const document of documents) {
    for (const [, id] of document.body.matchAll(/\]\(\/language-guide\/([a-z0-9-]+)\//g)) {
      assert(ids.has(id), `${document.id}: broken topic link to ${id}`);
    }
  }
  assert(documents.find((doc) => doc.data.topicId === 'program-structure').body.includes('](/language-guide/uses/)'));
});

test('URLs use the neutral ID, not titles, paths or chapter order', () => {
  const renamed = entries.map((entry, index) => ({
    ...entry,
    id: `ru/01_program/${index === 0 ? '02a' : '01'}_${entry.data.topicId}.md`,
    data: { ...entry.data, title: 'Новое название' }
  }));
  const guide = createGuideManifest(renamed);
  assert.deepEqual(guide.topics.map((topic) => topic.href), ['/language-guide/program-structure/', '/language-guide/variables/']);
  assert.equal(guideHref(), '/language-guide/');
  assert.throws(() => guideHref('../escape'));
});

test('two-level navigation and reading order are independent; topics have one section', () => {
  const guide = createGuideManifest(entries, 'ru', undefined, ['variables', 'program-structure']);
  assert.equal(guide.sections[0].topics[0].id, 'program-structure');
  assert.equal(guide.topics[0].id, 'variables');
  assert.equal(guide.topics[0].sectionId, 'program');
  const first = guideNeighbours(guide, 'variables');
  assert.equal(first.previous, undefined);
  assert.equal(first.next.id, 'program-structure');
  const last = guideNeighbours(guide, 'program-structure');
  assert.equal(last.previous.id, 'variables');
  assert.equal(last.next, undefined);
  assert.equal(guideNeighbours(guide).next.id, 'variables');
});

test('the same IDs pair translated documents without using Russian titles', () => {
  const guide = createGuideManifest([...entries, document('program-structure', 'en', 'Program structure'), document('variables', 'en', 'Variables')], 'en');
  assert.equal(guide.topics[0].title, 'Program structure');
  assert.equal(guide.topics[0].href, '/en/language-guide/program-structure/');
  assert.equal(guide.rootHref, '/en/language-guide/');
});

test('duplicate localized IDs cannot silently overwrite pages', () => {
  assert.throws(() => createGuideManifest([...entries, document('variables')]), /Duplicate Language Guide topic/);
});

test('navigation and reading order must cover the corpus exactly once', () => {
  assert.throws(() => createGuideManifest([entries[0]]), /Missing Language Guide document/);
  assert.throws(() => createGuideManifest([...entries, document('arrays')]), /missing from navigation/);
  assert.throws(() => createGuideManifest(entries, 'ru', undefined, ['variables']), /missing from reading order/);
  assert.throws(() => createGuideManifest(entries, 'ru', undefined, ['variables', 'variables']), /Duplicate reading-order/);
  assert.throws(() => createGuideManifest(entries, 'ru', undefined, ['missing']), /Unknown reading-order/);
  assert.throws(() => createGuideManifest(entries, 'ru', [{ id: 'program', topics: ['variables', 'variables'] }]), /Duplicate navigation/);
  assert.throws(() => guideNeighbours(createGuideManifest(entries), 'missing'), /Unknown Language Guide topic/);
});

test('nested sections and duplicate section IDs are rejected', () => {
  assert.throws(() => createGuideManifest(entries, 'ru', [
    { id: 'program', topics: [{ id: 'nested', topics: ['variables'] }] }
  ]), /only two levels/);
  assert.throws(() => createGuideManifest(entries, 'ru', [
    { id: 'program', topics: ['program-structure'] },
    { id: 'program', topics: ['variables'] }
  ]), /Duplicate Language Guide section/);
});
