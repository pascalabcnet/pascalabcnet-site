export const externalLinks = {
  help: 'https://pascalabc.net/downloads/pabcnethelp/index.htm',
  yMinutes: 'https://pascalabc.miraheze.org/wiki/Learn_PascalABC.NET_in_Y_minutes',
  yMinutesEnglish: 'https://pascalabc.miraheze.org/wiki/Learn_PascalABC.NET_in_Y_minutes_English',
  github: 'https://github.com/pascalabcnet/pascalabcnet',
  ege: 'https://pascalabcnet.github.io/mydoc_for_EGE.html',
  articlesAndExamples: 'https://pascalabcnet.github.io/',
  wiki: 'https://pascalabc.miraheze.org',
  olympiadProblems: 'https://pascalabcnet.github.io/olymp_index.html',
  mlPascalABC: 'https://pascalabcnet.github.io/ai/',
  vscode: null, // TODO: точный URL расширения VS Code
  telegramChannel: 'https://t.me/pascalabc_official',
  telegramGroup: 'https://t.me/PABCofficial',
  maxChannel: 'https://max.ru/channel_pabc_official',
  maxGroup: 'https://max.ru/join/D28ks-E4Olzc7BN7mVlAqhNr-NXbgijzaRnGNQ9FXZQ'
} as const;

export type ExternalLinkKey = keyof typeof externalLinks;
