---
topicId: type-declarations
locale: ru
title: Описание типов
description: Объявление именованных типов в PascalABC.NET.
keywords:
  - type
---

*Раздел описания типов* начинается со служебного слова `type`, после которого следуют строки вида

```pascalabc
имя типа = тип;
```

Например,

```pascalabc
type
  arr10 = array [1..10] of integer;
  myint = integer;
   pinteger = ^integer;
  IntFunc = function(x: integer): integer;
```

Обычно описание используется для составных типов (статические массивы, процедурные переменные, записи, классы) чтобы дать имя сложному типу. Если для типа определена [именная эквивалентность типов](/language-guide/type-compatibility/), это единственный способ передать переменные этого типа в подпрограмму.

Описание типов для классов использовать обязательно:

```pascalabc
type
  A = class
    i: integer;
     constructor Create(ii: integer);
     begin
       i:=ii;
     end;
   end;
```

Если описание типа используется просто для того чтобы заменить одно имя на другое, то такие типы называются *синонимами типов*:

```pascalabc
type
  int = integer;
  double = real;
```

Описания типов могут быть обобщёнными, т.е. включать параметры-типы в угловых скобках после имени типа.

```pascalabc
type
  Dict<K,V> = Dictionary<K,V>;
  Arr<T> = array of T;
```

Использование такого типа с конкретным параметром-типом называется *инстанцированием* типа:

```pascalabc
var
  a: Arr<integer>;
  d: Dict<string,integer>;
```

При описании рекурсивных структур данных указатель на тип может фигурировать раньше описания самого типа в определении другого типа:

```pascalabc
type
  PNode = ^TNode;
   TNode = record
     data: integer;
     next: PNode;
   end;
```

При этом важно, чтобы определения обоих типов находились в одном разделе `type`.

В отличие от Delphi Object Pascal следующее рекурсивное описание верно:

```pascalabc
type
  TNode = record
     data: integer;
     next: ^TNode;
   end;
```

Отметим, что для ссылочных типов (классов) разрешается описание поля с типом, совпадающим с типом текущего класса:

```pascalabc
type
  Node = class
     data: integer;
     next: Node;
   end;
```
