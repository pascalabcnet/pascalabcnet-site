---
topicId: sequences
locale: ru
title: "Последовательности"
description: "Последовательности. Руководство по языку PascalABC.NET."
keywords:
  - sequence
---

Последовательность - это набор данных, которые можно перебрать один за другим в некотором порядке. К разновидностям последовательностей относятся одномерные динамические массивы **array of** T, списки List<T>, двусвязные списки LinkedList<T>, множества HashSet<T> и SortedSet<T>.

Тип последовательности конструируется следующим образом:

```pascalabc
sequence of тип элементов
```

Последовательности доступны **только на чтение**. Если требуется изменить последовательность, то генерируется и возвращается новая последовательность.

Тип **sequence** **of** T является синонимом типа.NET System.Collections.Generic.IEnumerable<T>, а последовательность - синонимом объекта типа, поддерживающего интерфейс System.Collections.Generic.IEnumerable<T>.

## Инициализация последовательности

Последовательность инициализируется с помощью [стандартных функций](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Subroutines%20for%20sequence%20generation.html) Seq, SeqGen, SeqFill, SeqWhile, SeqRandom, SeqRandomReal, ReadSeqInteger, ReadSeqReal, ReadSeqString. Например:

```pascalabc
var s: sequence of integer;
s := Seq(1,3,5);
s.Println;
s := SeqGen(1,x->x*2,10);
writeln(s);
```

## Хранение последовательности

Последовательность **не хранится целиком в памяти**. Элементы последовательности генерируются алгоритмически и возвращаются по одному при обходе.

Таким образом, в коде

```pascalabc
var s := SeqFill(1,10000000);
writeln(s.Sum());
```

основное время выполнения будет занимать вторая строка, а выполнение первой строки будет сводиться лишь к запоминанию алгоритма генерации последовательности в переменной s.

## Соединение последовательностей

Две последовательности одного типа могут быть соединены операцией +, при этом вторая последовательность дописывается в конец первой. Например:

```pascalabc
Seq(1,2,3) + Seq(5,6,7)
Seq(1,2,3) + Arr(5,6,7)
```

Кроме того, к последовательности некоторого типа можно присоединить операцией + значение этого типа как первый или последний элемент последовательности, например:

```pascalabc
Seq(1,2,3) + 5
3 + Seq(5,6,7)
3 + Seq(5,6,7) + 9
```

Операция + является сокращённым вариантом операции [Concat](https://pascalabc.net/downloads/pabcnethelp/LangGuide/FuncProgramming/Files/Concat.html).

Для последовательностей доступна также операция умножения на число:

```pascalabc
Seq(1,2,3) * 3
```

означает повторение последовательности 1 2 3 три раза: 1 2 3 1 2 3 1 2 3

## Цикл по последовательности

Элементы последовательности можно обойти с помощью цикла **foreach**:

```pascalabc
foreach var x in s do
  if x>2 then
    Print(x);
```

## Совместимость по присваиванию

Переменной типа "последовательность" с элементами типа T можно присвоить одномерный массив**array of** T, список List<T>, двусвязный список LinkedList<T>, множество HashSet<T> или SortedSet<T>, а также объект любого класса, поддерживающего интерфейс `System.Collections.Generic.IEnumerable<T>`.

## Стандартные подпрограммы и методы

Для последовательностей доступны:

- [Методы обработки последовательностей](/language-guide/sequence-methods/)
- [Подпрограммы для генерации последовательностей](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Subroutines%20for%20sequence%20generation.html)
- [Подпрограммы для генерации бесконечных последовательностей](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Infinite%20sequences.html)
- [Методы расширения для последовательностей](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Extension%20methods%20for%20sequence%20of%20T.html)
