export type Locale = 'ru' | 'en';

export const ui = {
  ru: {
    menu: 'Меню', navigation: 'Главная навигация', homeLabel: 'PascalABC.NET — главная',
    subtitle: 'Современное программирование на языке Паскаль', external: 'откроется в новой вкладке',
    language: 'Язык сайта', footer: '© 2007–2026 PascalABC.NET · Южный федеральный университет'
  },
  en: {
    menu: 'Menu', navigation: 'Main navigation', homeLabel: 'PascalABC.NET — Home',
    subtitle: 'Modern programming in Pascal', external: 'opens in a new tab',
    language: 'Site language', footer: '© 2007–2026 PascalABC.NET · Southern Federal University'
  }
} as const;
