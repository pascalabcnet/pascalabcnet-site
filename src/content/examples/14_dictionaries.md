---
title: Словари
description: Хранение и поиск значений по ключу.
slug: dictionaries
order: 140
group: Коллекции
---

Словарь `Dictionary<TKey,TValue>` хранит пары «ключ — значение» и позволяет быстро получать значение по ключу.

## Словарь «слово — перевод»

Словарь удобно использовать для хранения соответствий, например перевода слов.

```pascalabc
begin
  var d := Dict(
    'cat' to 'кот',
    'dog' to 'собака',
    'book' to 'книга'
  );

  Println(d['cat']);
  Println(d['book']);
end.
```

**Результат:**

```text
кот
книга
```

## Пустой словарь

Пустой словарь можно создать с помощью универсального инициализатора коллекции `[]`, явно указав тип ключа и значения.

```pascalabc
begin
  var d: Dictionary<string,integer> := [];

  Print(d);
end.
```

**Результат:**

```text
{}
```

## Добавление и изменение значения

Присваивание по новому ключу добавляет пару в словарь, а по существующему ключу изменяет его значение.

```pascalabc
begin
  var d: Dictionary<string,integer> := [];

  d['Анна'] := 1;
  d['Борис'] := 3;

  d['Анна'] += 1;

  Println(d);
  d.Println;
end.
```

**Результат:**

```text
{(Анна,2),(Борис,3)}
(Анна,2) (Борис,3)
```

Внешний `Print` выводит словарь в `{}` как набор пар «ключ — значение», а метод `Print` выводит пары через пробел.

## Поиск ключа

Операция `in` позволяет проверить, имеется ли заданный ключ в словаре.

```pascalabc
begin
  var d := Dict(
    'Анна' to 20,
    'Борис' to 18,
    'Вера' to 21
  );

  Println('Анна' in d);
  Println('Олег' in d);
end.
```

**Результат:**

```text
True
False
```

## Удаление элемента

Метод `Remove` удаляет из словаря пару с заданным ключом.

```pascalabc
begin
  var d := Dict(
    'Анна' to 20,
    'Борис' to 18,
    'Вера' to 21
  );

  d.Remove('Борис');

  Println('Борис' in d);
end.
```

**Результат:**

```text
False
```

## Количество пар

Свойство `Count` возвращает количество пар «ключ — значение» в словаре.

```pascalabc
begin
  var d := Dict(
    'Анна' to 20,
    'Борис' to 18,
    'Вера' to 21
  );

  Println(d.Count);
end.
```

**Результат:**

```text
3
```

## Ключи и значения

Свойства `Keys` и `Values` позволяют отдельно получить все ключи и все значения словаря.

```pascalabc
begin
  var d := Dict(
    'Анна' to 20,
    'Борис' to 18,
    'Вера' to 21
  );

  d.Keys.Println;
  d.Values.Println;

  Println(d.Values.Max);
end.
```

**Результат:**

```text
Анна Борис Вера
20 18 21
21
```

## Перебор словаря

Цикл `foreach` позволяет перебрать все пары «ключ — значение» словаря.

```pascalabc
begin
  var d := Dict(
    'cat' to 'кот',
    'dog' to 'собака',
    'book' to 'книга'
  );

  foreach var p in d do
    Println($'{p.Key} — {p.Value}');
end.
```

**Результат:**

```text
cat — кот
dog — собака
book — книга
```

## Подсчёт частот

Словарь удобно использовать для подсчёта количества появлений каждого элемента.

```pascalabc
begin
  var a := [3,1,2,3,2,3,1];
  var d: Dictionary<integer,integer> := [];

  foreach var x in a do
    if x in d then
      d[x] += 1
    else d[x] := 1;

  Print(d);
end.
```

Ту же задачу можно решить готовой операцией `EachCount`.

```pascalabc
begin
  var a := [3,1,2,3,2,3,1];

  var d: Dictionary<integer,integer> := a.EachCount;

  Print(d);
end.
```

## Словарь массивов

Значением словаря может быть массив; например, для каждого студента можно хранить его оценки.

```pascalabc
begin
  var studentGrades: Dictionary<string,array of integer> := Dict(
    'Иван' to    [5,4,4,3],
    'Мария' to   [4,4,5,5],
    'Алексей' to [3,3,4,4],
    'Ольга' to   [5,5,5,4]
  );

  foreach var p in studentGrades do
    Println($'{p.Key}: {p.Value.Average:f2}');
end.
```

**Результат:**

```text
Иван: 4.00
Мария: 4.50
Алексей: 3.50
Ольга: 4.75
```
