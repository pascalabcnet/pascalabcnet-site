---
title: Списки
description: Динамические коллекции и основные операции со списками.
slug: lists
order: 120
group: Коллекции
---

Список (`List<T>`) похож на массив, но позволяет добавлять и удалять элементы, изменяя свой размер во время выполнения программы.

## Пустой список

Пустой список можно создать с помощью универсального инициализатора коллекции `[]`.

```pascalabc
begin
  var L: List<integer> := [];

  L.Println;
end.
````

## Создание списка из диапазона

Функция `Lst` позволяет создать список из диапазона значений.

```pascalabc
begin
  var L := Lst(1..10);

  L.Println;
end.
```

**Результат:**

```text
1 2 3 4 5 6 7 8 9 10
```

## Добавление элемента

Метод `Add` добавляет новый элемент в конец списка.

```pascalabc
begin
  var L: List<integer> := [];

  L.Add(3);
  L.Add(8);
  L.Add(5);

  L.Println;
end.
```

**Результат:**

```text
3 8 5
```

## Добавление нескольких элементов

Метод `AddRange` добавляет в список сразу несколько элементов.

```pascalabc
begin
  var L := Lst(10,20);

  L.AddRange([1,2,3]);

  L.Println;
end.
```

**Результат:**

```text
10 20 1 2 3
```

## Список делителей числа

Список удобно использовать, когда заранее неизвестно, сколько элементов будет найдено.

```pascalabc
function Divisors(n: integer): List<integer>;
begin
  Result := [];

  for var i := 1 to n do
    if n mod i = 0 then
      Result.Add(i);
end;

begin
  var L: List<integer> := Divisors(24);

  L.Println;
end.
```

**Результат:**

```text
1 2 3 4 6 8 12 24
```

## Доступ и изменение элементов

К элементам списка можно обращаться по индексу, а цикл `for` удобно использовать для их изменения.

```pascalabc
begin
  var L := Lst(1,2,3,4,5);

  for i := 0 to L.Count - 1 do
    L[i] *= 2;

  L.Println;
end.
```

**Результат:**

```text
2 4 6 8 10
```

## Перебор списка

Цикл `foreach` позволяет последовательно прочитать все элементы списка.

```pascalabc
begin
  var L := Lst(3,8,1,6);

  foreach var x in L do
    Print(x);
end.
```

**Результат:**

```text
3 8 1 6
```

## Поиск элемента

`IndexOf` возвращает индекс первого найденного элемента или `-1`, если элемента нет, а операция `in` проверяет его наличие.

```pascalabc
begin
  var L := Lst(3,8,1,6,4);

  Println(L.IndexOf(6));
  Println(L.IndexOf(10));

  Println(8 in L);
  Println(20 in L);
end.
```

**Результат:**

```text
3
-1
True
False
```

## Сумма, минимум и максимум

Для числового списка можно непосредственно вычислить сумму, минимальный и максимальный элементы.

```pascalabc
begin
  var L := Lst(7,2,9,4,5);

  Println(L.Sum);
  Println(L.Min);
  Println(L.Max);
end.
```

**Результат:**

```text
27
2
9
```

## Преобразование массива в список

Метод `ToList` преобразует массив в список.

```pascalabc
begin
  var a: array of integer := [3,8,1,6];

  var L: List<integer> := a.ToList;

  L.Println;
end.
```

**Результат:**

```text
3 8 1 6
```

## Преобразование списка в массив

Метод `ToArray` преобразует список в массив.

```pascalabc
begin
  var L: List<integer> := Lst(3,8,1,6);

  var a: array of integer := L.ToArray;

  a.Println;
end.
```

**Результат:**

```text
3 8 1 6
```

## Вставка и удаление элементов

Методы `Insert`, `Remove` и `RemoveAt` позволяют вставлять и удалять элементы списка.

```pascalabc
begin
  var L := Lst(10,20,30,40);

  L.Insert(1,15);
  L.Remove(30);
  L.RemoveAt(0);

  L.Println;
end.
```

**Результат:**

```text
15 20 40
```
