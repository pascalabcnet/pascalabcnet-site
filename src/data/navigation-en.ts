import { externalLinks } from './external-links';
import type { NavigationGroup } from './navigation';
import { guideUI } from '../i18n/language-guide';

export const navigationEn: NavigationGroup[] = [
  { label: 'Home', href: '/en/' },
  { label: 'Download', children: [{ label: 'Download PascalABC.NET', href: '/en/downloads/' }] },
  { label: 'Documentation', children: [
    ...(import.meta.env.DEV ? [{ label: guideUI.en.devMenu, href: '/language-guide/' }] : []),
    { label: 'PascalABC.NET in Y minutes', href: externalLinks.yMinutesEnglish, external: true, key: 'yMinutesEnglish' }
  ] },
  { label: 'Community', children: [
    { label: 'Telegram channel', href: externalLinks.telegramChannel, external: true, key: 'telegramChannel' },
    { label: 'Telegram group', href: externalLinks.telegramGroup, external: true, key: 'telegramGroup' }
  ] },
  { label: 'About', children: [
    { label: 'About PascalABC.NET', href: '/en/about/' },
    { label: 'Developers', href: '/en/developers/' },
    { label: "What's New", href: '/en/whats-new/' },
    { label: 'GitHub', href: externalLinks.github, external: true, key: 'github' },
    { label: 'License Agreement', href: '/en/license/' }
  ] }
];
