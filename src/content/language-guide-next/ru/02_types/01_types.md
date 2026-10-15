---
topicId: types
locale: ru
title: "Типы данных"
description: "Типы данных. Руководство по языку PascalABC.NET."
keywords:
  - Структурированные типы
  - Порядковые типы
---

Типы в **PascalABC.NET** подразделяются на простые, структурированные, типы [указателей](/language-guide/pointers/), [процедурные](/language-guide/procedural-types/) типы и [последовательности](/language-guide/sequences/).

К ***простым*** относятся [целые](/language-guide/integer-types/) и [вещественные](/language-guide/real-types/) типы, [логический](/language-guide/boolean/), [символьный](/language-guide/char/), [перечислимый](/language-guide/enum-and-subrange-types/) и [диапазонный](/language-guide/enum-and-subrange-types/) тип.

Тип данных называется ***структурированным***, если в одной переменной этого типа может содержаться множество значений.

К******структурированным типам относятся [массивы](/language-guide/arrays/), [строки](/language-guide/strings/), [записи](/language-guide/records/), [кортежи](/language-guide/tuples/), [множества](/language-guide/sets/), [файлы](/language-guide/file-types/) и [классы](/language-guide/classes/).

Особым типом данных является [последовательность](/language-guide/sequences/), которая хранит по-существу алгоритм получения данных последовательности один за другим.

Все простые типы, кроме вещественного, называются ***порядковыми***. Только значения этих типов могут быть индексами статических массивов и параметрами цикла `for`. Кроме того, для порядковых типов используются функции `Ord`, `Pred` и `Succ`, а также процедуры `Inc` и `Dec`.

Все типы, кроме типов указателей, являются производными от типа `Object`. Каждый тип в **PascalABC.NET** имеет [отображение на тип.NET](/language-guide/dotnet-types/). Тип указателя принадлежит к неуправляемому коду и моделируется типом `void*`.

Большинство типов в **PascalABC.NET** подразделяются на размерные, ссылочные и типы указателей. Сравнение размерных и ссылочных типов дано [здесь](/language-guide/value-and-reference-types/).

Кроме того, в PascalABC.NET имеется несколько типов, унаследованных от Delphi Object Pascal, которые трудно отнести к размерному или ссылочному типу. Это [статические массивы](/language-guide/static-arrays/), [множества](/language-guide/sets/), [размерные строки](/language-guide/short-strings/) и [файлы](/language-guide/file-types/). По представлению в памяти они относятся к ссылочному типу, но по поведению - к размерному.
