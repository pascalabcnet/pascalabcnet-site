---
title: Условия
description: Ветвление программы с помощью if, case и логических выражений.
slug: conditions
order: 20
group: Основы языка
---

Условия позволяют выбирать действие в зависимости от данных программы.

## Условие `if`

Оператор `if` выполняет действие только при выполнении заданного условия.

```pascal
begin
  var x := ReadInteger;

  if x > 0 then
    Println('Положительное число');
end.
```

## Составные условия и диапазоны

Логические операции позволяют объединять несколько условий, а `in` — проверять принадлежность значения диапазону.

```pascal
begin
  var x := ReadInteger;

  if (x mod 2 = 0) and (x in 10..99) then
    Println('Двузначное чётное число');
end.
```

## Составное условие с `or`

Операция `or` позволяет выполнить действие, если истинно хотя бы одно из условий.

```pascal
begin
  var x := ReadInteger;

  if (x < 0) or (x > 100) then
    Println('Число вне диапазона 0..100');
end.
```

## Проверка `not in`

Конструкция `not in` позволяет проверить, что значение не принадлежит диапазону.

```pascal
begin
  var x := ReadInteger;

  if x not in 1..10 then
    Println('Число вне диапазона 1..10');
end.
```


## Условие `if ... else`

Конструкция `if ... else` позволяет выбрать одно из двух действий.

```pascal
begin
  var x := ReadInteger;

  if x mod 2 = 0 then
    Println('Чётное число')
  else Println('Нечётное число');
end.
```

## Цепочка условий `else if`

Цепочка `else if` позволяет последовательно проверить несколько условий.

```pascal
begin
  var x := ReadInteger;

  if x > 0 then
    Println('Положительное число')
  else if x < 0 then
    Println('Отрицательное число')
  else Println('Ноль');
end.
```

## Условная операция

Условная операция позволяет выбрать одно из двух значений непосредственно в выражении.

```pascal
begin
  var (a,b) := ReadInteger2;

  var maximum := a > b ? a : b;

  Println(maximum);
end.
```

## Максимум трёх чисел

Найдём максимум трёх чисел, последовательно сравнивая их с текущим максимальным значением.

```pascal
begin
  var (a,b,c) := ReadInteger3;
  var maximum := a;
  if b > maximum then maximum := b;
  if c > maximum then maximum := c;
  Println(maximum);
end.
```

## Выбор с помощью оператора `case`

`case` удобен, когда одна переменная сравнивается с несколькими значениями.

```pascal
begin
  var day := ReadInteger;
  case day of
    1: Println('Понедельник');
    2: Println('Вторник');
    3: Println('Среда');
    4: Println('Четверг');
    5: Println('Пятница');
    6,7: Println('Выходной');
  else
    Println('Нет такого дня');
  end;
end.
```

