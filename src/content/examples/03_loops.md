---
title: Циклы
description: Повторение действий с помощью for, while, repeat, foreach и loop.
slug: loops
order: 30
group: Основы языка
---

В PascalABC.NET доступны классические циклы Паскаля и короткие современные конструкции.

## Короткий цикл loop

Цикл `loop` повторяет действие заданное число раз.

```pascalabc
begin
  loop 5 do
    Println('PascalABC.NET');
end.
```

## Цикл for

Цикл `for` использует счетчик, котоый увеличивается всякий раз на 1.

```pascalabc
begin
  for var i := 1 to 10 do
    Print(i * i);
end.
```

## Цикл for с шагом

В цикле `for` можно использовать шаг

```pascalabc
begin
  for var i := 10 to 20 step 2 do
    Print(i * i);
end.
```

## Обратный отсчёт

Можно двигаться в противоположном направлении - счетчик цикла уменьшается на 1.

```pascalabc
begin
  for var i := 10 downto 1 do
    Print(i);
  Println('Старт!');
end.
```

или

```pascalabc
begin
  for var i := 10 to 1 step -1 do
    Print(i);
  Println('Старт!');
end.
```


## Цикл while

Цикл выполняется, пока условие остаётся истинным. Здесь выводятся цифры числа начиная с последней.

```pascalabc
begin
  var n := ReadInteger;
  while n > 0 do
  begin
    Print(n mod 10);
    n := n div 10;
  end;
end.
```

## Цикл repeat

Цикл `repeat` выполняется до наступления определенного условия - например, ввода заданного пароля

```pascalabc
begin
  var password: string;
  repeat
    password := ReadString('Пароль:');
  until password = 'pascal';
  Println('Доступ разрешён');
end.
```

