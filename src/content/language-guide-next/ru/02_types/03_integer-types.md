---
topicId: integer-types
locale: ru
title: "Целые типы"
description: "Целые типы. Руководство по языку PascalABC.NET."
keywords:
  - integer
  - byte
  - shortint
  - smallint
  - uint64
  - int64
  - word
  - longword
  - longint
  - cardinal
  - BigInteger
  - ToString
  - Parse
  - TryParse
  - MinValue
  - MaxValue
  - MaxInt64
  - MaxInt
  - MaxSmallInt
  - MaxShortInt
  - MaxByte
  - MaxWord
  - MaxLongWord
  - MaxUInt64
---

Ниже приводится таблица целых типов, содержащая также их размер и диапазон допустимых значений.

Тип

Размер, байт

Диапазон значений

shortint

1

-128..127

smallint

2

-32768..32767

integer

,

longint

4

-2147483648..2147483647

int64

8

-9223372036854775808..9223372036854775807

byte

1

0..255

word

2

0..65535

longword

,

cardinal

4

0..4294967295

uint64

8

0..18446744073709551615

BigInteger

переменный

неограниченный

Типы `integer` и `longint`, а также `longword` и `cardinal` являются синонимами.

Максимальные значения для каждого целого типа определены как внешние [стандартные константы](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Standard%20constants.html): `MaxInt64`, `MaxInt`, `MaxSmallInt`, `MaxShortInt`, `MaxUInt64`, `MaxLongWord`, `MaxWord`, `MaxByte`.

Для каждого целого типа `T` кроме `BigInteger` определены следующие константы как статические члены:

```pascalabc
T.MinValue - константа, представляющая минимальное значение типа T;
T.MaxValue - константа, представляющая максимальное значение типа T;
```

Для каждого целого типа `T` определены статические функции:

```pascalabc
T.Parse(s) - функция, конвертирующая строковое представление числа в значение типа T. Если преобразование невозможно, то генерируется исключение;
T.TryParse(s,res) - функция, конвертирующая строковое представление числа в значение типа T и записывающая его в переменную res. Если преобразование возможно, то возвращается значение True, в противном случае - False.
```

Кроме того, для `T` определена экземплярная функция `ToString`, возвращающая строковое представление переменной данного типа.

Константы целого типа могут представляться как в десятичной, так и в шестнадцатеричной форме, перед шестнадцатеричной константой ставится знак $:

```pascalabc
25   3456   $FFFF
```
