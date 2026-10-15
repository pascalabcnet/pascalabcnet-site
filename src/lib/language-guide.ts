import { guideNavigation, guideReadingOrder, type GuideSection, type GuideSectionId } from '../data/language-guide.ts';
import type { Locale } from '../i18n/ui.ts';

export interface GuideDocument {
  data: { topicId: string; locale: Locale; title: string; description: string };
}

export interface GuideTopic<T extends GuideDocument = GuideDocument> {
  id: string;
  href: string;
  title: string;
  description: string;
  sectionId: GuideSectionId;
  entry: T;
}

export interface GuideGroup<T extends GuideDocument = GuideDocument> {
  id: GuideSectionId;
  topics: GuideTopic<T>[];
}

export interface GuideManifest<T extends GuideDocument = GuideDocument> {
  locale: Locale;
  rootHref: string;
  sections: GuideGroup<T>[];
  topics: GuideTopic<T>[];
}

export function guideHref(topicId?: string, locale: Locale = 'ru') {
  if (topicId && !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(topicId)) {
    throw new Error(`Invalid Language Guide topic ID: ${topicId}`);
  }
  return `${locale === 'en' ? '/en' : ''}/language-guide/${topicId ? `${topicId}/` : ''}`;
}

/** Pure content model, reusable by routes, tests and a future offline/book exporter. */
export function createGuideManifest<T extends GuideDocument>(
  documents: readonly T[],
  locale: Locale = 'ru',
  navigation: readonly GuideSection[] = guideNavigation,
  readingOrder: readonly string[] = guideReadingOrder
): GuideManifest<T> {
  const byId = new Map<string, T>();
  for (const entry of documents.filter((document) => document.data.locale === locale)) {
    const id = entry.data.topicId;
    guideHref(id, locale);
    if (byId.has(id)) throw new Error(`Duplicate Language Guide topic: ${locale}/${id}`);
    byId.set(id, entry);
  }

  const topics = new Map<string, GuideTopic<T>>();
  const sectionIds = new Set<string>();
  const sections = navigation.map((section): GuideGroup<T> => {
    if (!Array.isArray(section.topics) || section.topics.some((id) => typeof id !== 'string')) {
      throw new Error('Language Guide navigation supports only two levels: sections with topic IDs.');
    }
    if (sectionIds.has(section.id)) throw new Error(`Duplicate Language Guide section: ${section.id}`);
    sectionIds.add(section.id);
    return {
      id: section.id,
      topics: section.topics.map((id) => {
        const entry = byId.get(id);
        if (!entry) throw new Error(`Missing Language Guide document: ${locale}/${id}`);
        if (topics.has(id)) throw new Error(`Duplicate navigation topic: ${id}`);
        const topic = {
          id,
          href: guideHref(id, locale),
          title: entry.data.title,
          description: entry.data.description,
          sectionId: section.id,
          entry
        };
        topics.set(id, topic);
        return topic;
      })
    };
  });
  for (const id of byId.keys()) {
    if (!topics.has(id)) throw new Error(`Language Guide topic missing from navigation: ${id}`);
  }
  const seen = new Set<string>();
  const orderedTopics = readingOrder.map((id) => {
    if (seen.has(id)) throw new Error(`Duplicate reading-order topic: ${id}`);
    seen.add(id);
    const topic = topics.get(id);
    if (!topic) throw new Error(`Unknown reading-order topic: ${id}`);
    return topic;
  });
  for (const id of topics.keys()) {
    if (!seen.has(id)) throw new Error(`Language Guide topic missing from reading order: ${id}`);
  }
  return { locale, rootHref: guideHref(undefined, locale), sections, topics: orderedTopics };
}

export function guideNeighbours<T extends GuideDocument>(manifest: GuideManifest<T>, topicId?: string) {
  if (!topicId) return { previous: undefined, next: manifest.topics[0] };
  const index = manifest.topics.findIndex((topic) => topic.id === topicId);
  if (index < 0) throw new Error(`Unknown Language Guide topic: ${topicId}`);
  return { previous: manifest.topics[index - 1], next: manifest.topics[index + 1] };
}
