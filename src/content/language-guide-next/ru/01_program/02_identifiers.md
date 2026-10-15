---
topicId: identifiers
locale: ru
title: Идентификаторы и ключевые слова
description: Идентификаторы и ключевые слова языка PascalABC.NET.
keywords:
  - Ключевые слова
---

Идентификаторы и ключевые слова

Идентификаторы служат в качестве имен программ, модулей, процедур, функций, типов, переменных и констант. Идентификатором считается любая последовательность латинских букв или цифр, начинающаяся с буквы. Буквой считается также символ подчеркивания `"_"`.

Например, `a1`, `_h`, `b123` - идентификаторы, а `1a` - нет.

С каждым идентификатором связана [область действия идентификатора](/language-guide/scope/).

Следующие слова являются ***ключевыми***, служат для оформления конструкций языка и не могут использоваться как идентификаторы:

`and array as auto begin case class const constructor destructor div do downto else end event except extensionmethod file finalization finally for foreach function goto if implementation in inherited initialization interface is label lock loop mod nil not of operator or procedure program property raise record repeat sealed set sequence shl shr sizeof template then to try type typeof until uses using var where while with xor`

Ряд слов является ***контекстно ключевыми*** (они являются ключевыми только в некотором контексте):

`abstract default external forward internal on overload override params private protected public read reintroduce unit virtual write step index`

Контекстно ключевые слова могут использоваться в качестве имен.

Некоторые ключевые слова совпадают с важнейшими именами платформы.NET. Поэтому в **PascalABC.NET** предусмотрена возможность использовать эти имена без конфликтов с ключевыми словами.

Первый способ состоит в использовании квалифицированного имени. Например:

```pascalabc
var a: System.Array;
```

В этом контексте имя `System.Array` является именем платформы .NET, и конфликта с ключевым словом `array` нет.

Второй способ состоит в использовании специального символа `&` перед именем. В этом случае имя может совпадать с ключевым словом. Например:

```pascalabc
uses System;
var a: &Array;
```
