---
topicId: constants
locale: ru
title: Описание констант
description: Объявление констант в программах на языке PascalABC.NET.
keywords:
  - const
---

Раздел описания именованных констант начинается со служебного слова `const`, после которого следуют элементы описания вида

```pascalabc
имя_константы = значение;

или

имя_константы : тип = значение;
```

Например:

```pascalabc
const
  Pi = 3.14;
  Count = 10;
  Name = 'Mike';
  DigitsSet = ['0'..'9'];
  Arr: array of integer = (1,3,5,7,9);
  Rec: record name: string; age: integer end = (name: 'Иванов'; age: 23);
  Arr2: array of real = ((1,2),(3,4));
```
