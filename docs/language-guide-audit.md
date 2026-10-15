# Аудит старого Language Guide

Отчёт создан автоматически скриптом `scripts/audit-language-guide.mjs`.

## Общая картина

- Содержательных HTML-страниц: **253**.
- Страниц Language Guide: **248**.
- Страниц Common: **5**.
- Автоматически сформированных страниц PABCSystemUnit: **73** (на этом этапе отложены).
- Страниц для ручного содержательного аудита: **180**.
- Ручных страниц без `<title>` и `<h1>`: **0**.
- Внутренних ссылок на отсутствующие HTML-страницы: **8**.
- Битых ссылок вне автоматически сформированного раздела: **3**.
- Внешних ссылок: **57**.
- Фрагментов `<code>` и `<pre>`: **4978**.
- Все исходные страницы прочитаны как Windows-1251; каталоги `_vti_cnf` исключены.

## Разделы

| Источник | Раздел | Тип | Страниц | Слов | Фрагментов кода | Битых ссылок |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Common | `(root)` | ручной | 5 | 3833 | 59 | 3 |
| LangGuide | `_ProgrStruct_Defs` | ручной | 8 | 1726 | 126 | 0 |
| LangGuide | `(root)` | ручной | 1 | 239 | 0 | 0 |
| LangGuide | `Classes` | ручной | 22 | 6343 | 312 | 0 |
| LangGuide | `CompilerDirectives` | ручной | 1 | 358 | 2 | 0 |
| LangGuide | `ExceptionHandling` | ручной | 5 | 1093 | 85 | 0 |
| LangGuide | `FuncProgramming` | ручной | 42 | 6335 | 293 | 0 |
| LangGuide | `Generics` | ручной | 5 | 1208 | 59 | 0 |
| LangGuide | `Interfaces` | ручной | 2 | 535 | 23 | 0 |
| LangGuide | `MemoryManagement` | ручной | 1 | 163 | 4 | 0 |
| LangGuide | `Modules` | ручной | 7 | 1780 | 120 | 0 |
| LangGuide | `OpenMP` | ручной | 5 | 1430 | 30 | 0 |
| LangGuide | `Operations_Expressions` | ручной | 18 | 3628 | 596 | 0 |
| LangGuide | `Operators` | ручной | 24 | 4211 | 437 | 0 |
| LangGuide | `PABCSystemUnit` | генерируемый — отложен | 73 | 26713 | 2165 | 5 |
| LangGuide | `ProcFunc` | ручной | 10 | 2133 | 116 | 0 |
| LangGuide | `Types` | ручной | 24 | 8719 | 551 | 0 |

## Пилотный раздел: структура программы и объявления

| Страница | Заголовок | Слов | Код | Входящих ссылок | Битых ссылок |
| --- | --- | ---: | ---: | ---: | ---: |
| `_ProgrStruct_Defs/comments.html` | Комментарии | 76 | 9 | 1 | 0 |
| `_ProgrStruct_Defs/constdef.html` | Описание констант | 70 | 10 | 1 | 0 |
| `_ProgrStruct_Defs/identifiers.html` | Идентификаторы и ключевые слова | 255 | 13 | 2 | 0 |
| `_ProgrStruct_Defs/index_progrstruct.html` | Структура программы: обзор | 324 | 19 | 2 | 0 |
| `_ProgrStruct_Defs/labeldef.html` | Описание меток | 40 | 2 | 1 | 0 |
| `_ProgrStruct_Defs/scope.html` | Область действия идентификатора | 504 | 27 | 3 | 0 |
| `_ProgrStruct_Defs/typesdef.html` | Описание типов | 255 | 14 | 1 | 0 |
| `_ProgrStruct_Defs/vardef.html` | Описание переменных | 202 | 32 | 3 | 0 |

## Битые ссылки на страницы

Показаны первые 8 ссылок. Полный список находится в JSON-отчёте.

| Исходная страница | Ссылка |
| --- | --- |
| `LangGuide/PABCSystemUnit/Old/common.htm` | `../Types/review.htm` |
| `LangGuide/PABCSystemUnit/Old/common.htm` | `../Types/review.htm` |
| `LangGuide/PABCSystemUnit/Old/common.htm` | `../Types/review.htm` |
| `LangGuide/PABCSystemUnit/Old/common.htm` | `../Types/review.htm` |
| `LangGuide/PABCSystemUnit/_main.html` | `Files\Subroutines for matrix generation.html` |
| `Common/AdvantagePABC.html` | `../PABCUnits/GraphWPF/index.html` |
| `Common/AdvantagePABC.html` | `../PABCUnits/WPFObjects/index.html` |
| `Common/AdvantagePABC.html` | `../PABCUnits/Graph3D/index.html` |

## Как повторить аудит

```powershell
node scripts/audit-language-guide.mjs --lang-guide "D:\PABC_GIT\PABCNetHelp\LangGuide" --common "D:\PABC_GIT\PABCNetHelp\Common"
```

Подробные сведения по каждой странице записаны в `docs/language-guide-audit.json`.
