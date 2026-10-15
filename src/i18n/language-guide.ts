import type { GuideSectionId } from '../data/language-guide';
import type { Locale } from './ui';

interface GuideUI {
  title: string;
  description: string;
  devMenu: string;
  devNotice: string;
  guideHome: string;
  contents: string;
  onThisPage: string;
  previous: string;
  next: string;
  related: string;
  readingNavigation: string;
  sections: Record<GuideSectionId, string>;
}

// UI translation is separate from document translations. No English pages yet.
export const guideUI: Record<Locale, GuideUI> = {
  ru: {
    title: 'Руководство по языку PascalABC.NET',
    description: 'Официальное руководство по языку PascalABC.NET.',
    devMenu: 'Руководство по языку',
    devNotice: 'Новая ветка руководства · локальная разработка · тестовые материалы',
    guideHome: 'Обзор руководства',
    contents: 'Оглавление',
    onThisPage: 'На этой странице',
    previous: 'Предыдущая',
    next: 'Следующая',
    related: 'См. также',
    readingNavigation: 'Порядок чтения',
    sections: {
      program: 'Структура программы',
      types: 'Типы данных',
      expressions: 'Выражения и операции',
      statements: 'Операторы',
      routines: 'Процедуры и функции',
      modules: 'Модули и библиотеки',
      classes: 'Классы',
      exceptions: 'Обработка исключений',
      interfaces: 'Интерфейсы',
      generics: 'Обобщенные типы',
      functional: 'Элементы функционального программирования',
      memory: 'Управление памятью',
      openmp: 'OpenMP',
      directives: 'Директивы компилятора'
    }
  },
  en: {
    title: 'PascalABC.NET Language Guide',
    description: 'Official PascalABC.NET language reference.',
    devMenu: 'Language Guide (new)',
    devNotice: 'New guide branch · local development · sample content',
    guideHome: 'Guide overview',
    contents: 'Contents',
    onThisPage: 'On this page',
    previous: 'Previous',
    next: 'Next',
    related: 'See also',
    readingNavigation: 'Reading order',
    sections: {
      program: 'Program structure',
      types: 'Data types',
      expressions: 'Expressions and operations',
      statements: 'Statements',
      routines: 'Procedures and functions',
      modules: 'Units and libraries',
      classes: 'Classes',
      exceptions: 'Exception handling',
      interfaces: 'Interfaces',
      generics: 'Generics',
      functional: 'Functional programming',
      memory: 'Memory management',
      openmp: 'OpenMP',
      directives: 'Compiler directives'
    }
  }
};
