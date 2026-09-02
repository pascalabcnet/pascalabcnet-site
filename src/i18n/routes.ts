import type { Locale } from './ui';

const pairs: Record<string, string> = {
  '/': '/en/',
  '/about/': '/en/about/',
  '/downloads/': '/en/downloads/',
  '/developers/': '/en/developers/',
  '/license/': '/en/license/',
  '/vscode/': '/en/vscode/',
  '/whats-new/': '/en/whats-new/',
  '/whats-new/pascalabcnet-4.0/': '/en/whats-new/pascalabcnet-4.0/'
};
const switchAliases: Record<string, string> = {
  '/ssyilki-dlya-skachivaniya/': '/en/downloads/'
};

const slash = (path: string) => path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;

export function localeRoute(pathname: string, locale: Locale) {
  const path = slash(pathname);
  if (locale === 'ru') return pairs[path] ?? switchAliases[path] ?? '/en/';
  return Object.entries(pairs).find(([, en]) => en === path)?.[0] ?? '/';
}

export function alternates(pathname: string) {
  const path = slash(pathname);
  if (pairs[path]) return { ru: path, en: pairs[path] };
  const ru = Object.entries(pairs).find(([, en]) => en === path)?.[0];
  return ru ? { ru, en: path } : null;
}
