import { codeToHtml } from 'shiki';
import language from './pascalabc.tmLanguage.json' with { type: 'json' };
import theme from './pascalabc-light-theme.json' with { type: 'json' };

export const pascalabcShikiConfig = {
  theme,
  langs: [language],
  wrap: true
};

export const highlightPascalABC = (code) => codeToHtml(code.trim(), {
  lang: language,
  theme
});
