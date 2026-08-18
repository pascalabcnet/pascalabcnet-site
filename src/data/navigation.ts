import { externalLinks, type ExternalLinkKey } from './external-links';

type InternalItem = { label: string; href: string; external?: false };
type ExternalItem = { label: string; href: string | null; external: true; key: ExternalLinkKey };
export type NavigationItem = InternalItem | ExternalItem;
export type NavigationGroup = { label: string; href?: string; children?: NavigationItem[] };

const external = (label: string, key: ExternalLinkKey): ExternalItem => ({ label, key, href: externalLinks[key], external: true });

export const navigation: NavigationGroup[] = [
  { label: 'Главная', href: '/' },
  { label: 'Скачать', children: [
    { label: 'Скачать PascalABC.NET', href: '/ssyilki-dlya-skachivaniya' },
    { label: 'Установка в Linux', href: '/install-linux' },
    { label: 'Установка на macOS', href: '/install-macos' }
  ]},
  { label: 'Документация', children: [
    external('Справочник по языку', 'help'), external('PascalABC.NET in Y minutes', 'yMinutes'),
    { label: 'Примеры кода', href: '/examples' }, { label: 'Скриншоты', href: '/screenshots' },
    external('Статьи', 'articlesAndExamples'), external('Wiki', 'wiki')
  ]},
  { label: 'Обучение', children: [
    external('Библиотека ML PascalABC.NET', 'mlPascalABC'),
    { label: 'Курсы на Stepik', href: '/stepik' }, { label: 'Олимпиада PascalABC.NET', href: '/olympiads' },
    external('Олимпиадные задачи', 'olympiadProblems'), external('PascalABC.NET и ЕГЭ', 'ege'),
    { label: 'Книги', href: '/books' }
  ]},
  { label: 'Сообщество', children: [
    external('Telegram-канал', 'telegramChannel'), external('Telegram-группа', 'telegramGroup'),
    external('MAX-канал', 'maxChannel'), external('MAX-группа', 'maxGroup')
  ]},
  { label: 'О проекте', children: [
    { label: 'Разработчики', href: '/developers' }, { label: 'Что нового', href: '/whats-new' },
    { label: 'Конференции', href: '/conferences' }, { label: 'Доклады и публикации', href: '/publications' },
    external('GitHub', 'github'), { label: 'Лицензионное соглашение', href: '/license' }
  ]}
];
