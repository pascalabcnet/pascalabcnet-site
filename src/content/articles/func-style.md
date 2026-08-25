---
title: "Функциональное программирование в PascalABC.NET: лямбды и последовательности"
displayTitle: Зарисовки в функциональном стиле
description: "Функциональный стиль в PascalABC.NET: лямбда-выражения, методы расширения, преобразования последовательностей и передача функций как параметров."

category: Язык PascalABC.NET

tags:
  - функциональное программирование
  - лямбда-выражения
  - методы расширения
  - extensionmethod
  - Select
  - последовательности
  - функции
  - PascalABC.NET

legacyUrls:
  - /stati-po-pascalabc-net/osobennosti-yazika/26-zarisovki-v-funktsionalnom-stile
draft: false
date: 2018-10-28
---

PascalABC.NET не является функциональным языком, однако многие идеи функционального программирования в нем реализуются вполне естественно. В языке есть **лямбда-выражения, методы расширения, операции над последовательностями и цепочки вызовов**.

Рассмотрим это на примере алгоритма из [задачи 74 проекта Эйлера](http://projecteuler.net/index.php?section=problems&id=74).

Каждый следующий член цепочки получается из предыдущего как сумма факториалов его цифр:

```text
1! + 6! + 9! = 363601
```

Например:

```text
169 → 363601 → 1454 → 169
```

## Преобразование числа в цифры

Сначала напишем метод расширения для типа `integer`, возвращающий массив его цифр:

```pascalabc
function ToDigits(Self: integer): array of integer; extensionmethod;
begin
  Result := Self.ToString.Select(ch -> ch.ToDigit).ToArray;
end;
```

Теперь можно написать:

```pascalabc
var a := 145.ToDigits;
a.Println;
```

Результат:

```text
1 4 5
```

Метод `ToDigits` выглядит как обычный метод типа `integer`, хотя на самом деле это функция с параметром `Self`, помеченная директивой `extensionmethod`.

## Факториал

Определим функцию факториала:

```pascalabc
function Fact(n: integer): integer;
begin
  Result := 1;
  for var i := 1 to n do
    Result *= i;
end;
```

Теперь сумму факториалов цифр числа можно записать очень компактно:

```pascalabc
var n := 145;
Println(n.ToDigits.Select(d -> Fact(d)).Sum);
```

Результат:

```text
145
```

поскольку

```text
145 = 1! + 4! + 5!
```

Разберем выражение:

```pascalabc
n.ToDigits.Select(d -> Fact(d)).Sum
```

Сначала

```pascalabc
n.ToDigits
```

преобразует число в массив цифр.

Затем

```pascalabc
.Select(d -> Fact(d))
```

заменяет каждую цифру ее факториалом.

Наконец,

```pascalabc
.Sum
```

складывает полученные значения.

Раньше для такого кода пришлось бы самостоятельно писать методы вроде `Map` и `Sum`. В современном PascalABC.NET эти операции уже есть.

## Следующий элемент цепочки

Оформим вычисление следующего элемента цепочки отдельной функцией:

```pascalabc
function Next(n: integer): integer;
begin
  Result := n.ToDigits.Select(d -> Fact(d)).Sum;
end;
```

Проверим:

```pascalabc
Println(Next(169));
```

Получим:

```text
363601
```

## Построение цепочки

Теперь напишем метод расширения, который строит первые `n` элементов цепочки по заданной функции перехода:

```pascalabc
function TakeBy(Self: integer; f: integer -> integer; n: integer): array of integer; extensionmethod;
begin
  Result := new integer[n];
  Result[0] := Self;
  for var i := 1 to n-1 do
    Result[i] := f(Result[i-1]);
end;
```

Функция перехода передается в параметре:

```pascalabc
f: integer -> integer
```

То есть `f` получает целое число и возвращает целое число.

Теперь исходная задача решается так:

```pascalabc
169.TakeBy(Next,4).Println;
```

Результат:

```text
169 363601 1454 169
```

## Лямбда вместо отдельной функции

Отдельная функция `Next` здесь необязательна. Ее можно заменить лямбда-выражением:

```pascalabc
169.TakeBy(
  n -> n.ToDigits.Select(d -> Fact(d)).Sum,
  4
).Println;
```

Получим тот же результат:

```text
169 363601 1454 169
```

Весь алгоритм перехода к следующему элементу теперь находится непосредственно в месте использования:

```pascalabc
n -> n.ToDigits.Select(d -> Fact(d)).Sum
```

Это функция, которая получает число `n` и возвращает сумму факториалов его цифр.

## Что здесь функционального

В этом небольшом примере используются сразу несколько характерных идей функционального стиля.

### Функции можно передавать как параметры

Метод `TakeBy` получает функцию:

```pascalabc
function TakeBy(Self: integer; f: integer -> integer; n: integer): array of integer; extensionmethod;
```

и применяет ее для получения каждого следующего элемента:

```pascalabc
Result[i] := f(Result[i-1]);
```

В качестве такой функции можно передать как обычную функцию:

```pascalabc
169.TakeBy(Next,4)
```

так и лямбда-выражение:

```pascalabc
169.TakeBy(n -> n.ToDigits.Select(d -> Fact(d)).Sum,4)
```

### Последовательности можно преобразовывать без явных циклов

Вместо цикла, вычисляющего факториал каждой цифры, используется:

```pascalabc
n.ToDigits.Select(d -> Fact(d))
```

Метод `Select` применяет указанное преобразование к каждому элементу последовательности.

### Операции можно объединять в цепочки

Выражение

```pascalabc
n.ToDigits.Select(d -> Fact(d)).Sum
```

читается практически слева направо:

1. получить цифры числа;
2. заменить каждую цифру ее факториалом;
3. сложить результаты.

### Методы расширения позволяют дополнять существующие типы

Мы определили обычную функцию:

```pascalabc
function ToDigits(Self: integer): array of integer; extensionmethod;
```

но благодаря `extensionmethod` можем вызывать ее в точечной форме:

```pascalabc
145.ToDigits
```

Точно так же функция

```pascalabc
function TakeBy(Self: integer; f: integer -> integer; n: integer): array of integer; extensionmethod;
```

вызывается как метод целого числа:

```pascalabc
169.TakeBy(Next,4)
```

В результате код становится компактным и хорошо читается в виде последовательности преобразований.

PascalABC.NET остается прежде всего императивным языком, но лямбда-выражения, методы расширения и операции над последовательностями позволяют во многих задачах использовать удобный **функциональный стиль**.
