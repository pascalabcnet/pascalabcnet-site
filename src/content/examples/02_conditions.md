---
title: Условный оператор и оператор выбора
description: Ветвление программы с помощью if, case и логических выражений.
slug: conditions
order: 20
group: Основы языка
---

## Условный оператор `if`

Оператор `if` выполняет действие в зависимости от условия. 
Он имеет неполную форму — без `else`, и полную форму — с альтернативным действием в ветви `else`.

```pascalabc
begin
  var x := ReadInteger;

  if x > 0 then
    Println('Положительное число');
end.
```

## Полная форма условного оператора `if ... else`

Конструкция `if ... else` позволяет выбрать одно из двух действий.

```pascalabc
begin
  var x := ReadInteger;

  if x mod 2 = 0 then
    Println('Чётное число')
  else Println('Нечётное число');
end.
```


## Составное условие с `and` и диапазоны

Логические операции `and` и `or` позволяют объединять несколько условий в одно составное, а операция `in` — проверять принадлежность значения диапазону.

```pascalabc
begin
  var x := ReadInteger;

  if (x mod 2 = 0) and (x in 10..99) then
    Println('Двузначное чётное число');
end.
```

## Составное условие с `or`

Операция `or` позволяет выполнить действие, если истинно хотя бы одно из условий.

```pascalabc
begin
  var x := ReadInteger;

  if (x < 0) or (x > 100) then
    Println('Число вне диапазона 0..100');
end.
```

## Проверка `not in`

Конструкция `not in` позволяет проверить, что значение не принадлежит диапазону.

```pascalabc
begin
  var x := ReadInteger;

  if x not in 1..10 then
    Println('Число вне диапазона 1..10');
end.
```



## Цепочка условий `else if`

Цепочка `else if` позволяет поочерёдно проверять несколько условий и выполнить действие для первого выполненного условия. 
Если ни одно из условий не выполняется, то выполняется действие по последней ветке `else`.

```pascalabc
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

```pascalabc
begin
  var (a,b) := ReadInteger2;

  var max := if a > b then a else b;

  Println(max);
end.
```

## Максимум трёх чисел

Найдём максимум трёх чисел, последовательно сравнивая их с текущим максимальным значением.

```pascalabc
begin
  var (a,b,c) := ReadInteger3;
  var max := a;
  if b > max then max := b;
  if c > max then max := c;
  Println(max);
end.
```

## Выбор варианта с помощью оператора `case`

Оператор `case` удобен, когда нужно выбрать действие в зависимости от значения выражения.

```pascalabc
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

