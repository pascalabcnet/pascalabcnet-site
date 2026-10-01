---
title: Списки
description: Динамические коллекции и основные операции со списками.
slug: lists
order: 120
group: Коллекции
---

Список `List<T>` похож на массив, но позволяет добавлять и удалять элементы, изменяя свой размер во время выполнения программы.

## Пустой список

Пустой список можно создать с помощью универсального инициализатора коллекции `[]`.

```pascalabc
begin
  var L: List<integer> := [];

  L.Println;
end.
````

## Создание списка из диапазона

Функция `Lst` создаёт список из диапазона значений.

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

## Количество элементов

Свойство `Count` содержит количество элементов списка.

```pascalabc
begin
  var L := Lst(10,20,30,40);

  Println(L.Count);
end.
```

**Результат:**

```
4
```

## Доступ и изменение элементов

К элементам списка можно обращаться по индексу. Цикл `for` удобно использовать, когда нужен индекс элемента или требуется изменять элементы списка.

```pascalabc
begin
  var L := Lst(1,2,3,4,5);

  for var i := 0 to L.Count - 1 do
    L[i] *= 2;

  L.Println;
end.
```

**Результат:**

```text
2 4 6 8 10
```

## Перебор списка

Цикл `foreach` используется для последовательного перебора всех элементов списка.

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

Операция `in` проверяет, содержится ли элемент в списке, а `IndexOf` возвращает индекс первого найденного элемента или `-1`, если такого элемента нет.

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

## Копирование списка

Функция `Copy` создаёт независимую копию списка. При обычном присваивании две переменные ссылаются на один и тот же список.

```pascalabc
begin
  var L1 := Lst(10,20,30);
  var L2 := Copy(L1);
  var L3 := L1;

  L2[0] := 100;
  L3[1] := 200;

  L1.Println;
  L2.Println;
  L3.Println;
end.
```

**Результат:**

```text
10 200 30
100 20 30
10 200 30
```

## Очистка списка

Метод `Clear` удаляет все элементы списка.

```pascalabc
begin
  var L := Lst(1,2,3,4);

  L.Clear;

  Println(L.Count);
  L.Println;
end.
```

**Результат:**

```
0
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

