---
title: Структура программы PascalABC.NET
description: Общая структура программы, раздел uses, раздел описаний и основной блок программы.
source: LangGuide/_ProgrStruct_Defs/index_progrstruct.html
---

# Структура программы PascalABC.NET

Программа содержит [ключевые слова](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/identifiers.html), [идентификаторы](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/identifiers.html), [комментарии](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/comments.html). Ключевые слова используются для выделения синтаксических конструкций. Идентификаторы являются именами объектов программы и не могут совпадать с ключевыми словами.

Программа на языке PascalABC.NET имеет следующий вид:

```text
раздел uses
раздел описаний
begin
  операторы
end.
```

[Раздел `uses`](https://pascalabc.net/downloads/pabcnethelp/LangGuide/Modules/uses.html) состоит из нескольких подряд идущих секций `uses`, каждая из которых начинается с ключевого слова `uses`, за которым следует список имён модулей и пространств имён .NET, перечисляемых через запятую. Например:

```pascalabc
uses GraphABC, Timers, System.Text;
```

Можно записать несколько секций `uses`, каждую на отдельной строке:

```pascalabc
uses GraphABC;
uses Timers;
uses System.Text;
```

Раздел описаний может включать следующие подразделы:

- [раздел описания переменных](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/vardef.html);
- [раздел описания констант](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/constdef.html);
- [раздел описания типов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/_ProgrStruct_Defs/typesdef.html);
- [раздел описания меток](labels.md);
- [раздел описания процедур и функций](https://pascalabc.net/downloads/pabcnethelp/LangGuide/ProcFunc/procdef.html).

Данные подразделы следуют друг за другом в произвольном порядке.

Далее следует [блок](https://pascalabc.net/downloads/pabcnethelp/LangGuide/Operators/beginend.html) `begin`/`end`, внутри которого находятся [операторы](https://pascalabc.net/downloads/pabcnethelp/LangGuide/Operators/index_statements.html), отделяемые один от другого символом «точка с запятой». Среди операторов может присутствовать [оператор описания переменной](https://pascalabc.net/downloads/pabcnethelp/LangGuide/Operators/var_statement.html), который позволяет описывать переменные внутри блока.

Раздел `uses` и раздел описаний могут отсутствовать. Например:

```pascalabc
begin
  var a,b: integer;
  (a,b) := ReadInteger2;
  var x := a/b;
  Println(x);
end.
```

Переменные `a` и `b` описаны с явным указанием типа `integer`. Тип переменной `x` определяется по выражению `a/b`.

Пример программы с подключением модуля:

```pascalabc
uses GraphABC;

begin
  var x := 100;
  var y := 100;
  var r := 50;
  Circle(x,y,r);
end.
```

Описания переменных до `begin` основной программы называются глобальными. Такие переменные используются, в частности, для хранения данных, общих для нескольких процедур и функций. С появлением внутриблочных описаний глобальные описания стали использоваться реже, но не являются устаревшими. При прочих равных следует предпочитать внутриблочные описания; если переменная должна быть доступна нескольким процедурам и функциям, её можно описать глобально.

Например:

```pascalabc
uses GraphWPF;

var x: integer;

procedure Draw := Circle(x,300,5);

begin
  x := 100;
  Draw;
end.
```

> ## Совместимость
>
> Для совместимости поддерживается необязательный **заголовок программы**, который указывается перед разделом `uses` и разделом описаний:
>
> ```text
> program имя программы;
> ```
>
> Заголовок задаёт имя программы. Например:
>
> ```pascalabc
> program MyProgram;
> ```

Программы без внешнего блока `begin`/`end`, начинающиеся с префикса `##`, описаны на отдельной странице [«Командный режим»](command-mode.md).
