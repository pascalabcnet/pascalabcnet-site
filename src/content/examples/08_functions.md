---
title: Процедуры и функции
description: Создание подпрограмм, параметры и возвращаемые значения.
slug: functions
order: 80
group: Подпрограммы
---

Процедуры и функции позволяют выделять повторяющиеся действия в самостоятельные подпрограммы.
Они могут иметь параметры и вызываться с различными аргументами.

## Процедура с параметрами

Параметры позволяют передавать процедуре данные при вызове.

```pascalabc
procedure PrintSum(a,b: integer);
begin
  Println(a + b);
end;

begin
  PrintSum(3,5);
end.
````

**Результат:**

```text
8
```

## Параметры-переменные

Параметр с `var` позволяет процедуре изменять значение переданной переменной.

```pascalabc
procedure Inc2(var x: integer);
begin
  x += 2;
end;

begin
  var a := 5;

  Inc2(a);

  Println(a);
end.
```

**Результат:**

```text
7
```

## Функция и `Result`

Значение, возвращаемое функцией, можно задавать с помощью переменной `Result` внутри функции.

```pascalabc
function SumArray(a: array of integer): integer;
begin
  Result := 0;
  foreach var x in a do
    Result += x;
end;

begin
  var a := [3, 8, 1, 6, 4];

  Println(SumArray(a));
end.
```

**Результат:**

```text
22
```

## Короткая функция

Если результат функции задаётся одним выражением, функцию можно записать в сокращённой форме.

```pascalabc
function Square(x: real) := x * x;

begin
  Println(Square(5));
end.
```

## Досрочный выход из функции

Оператор `exit` позволяет сразу завершить функцию и вернуть найденное значение.
В примере - обобщенная функция с типовым параметром T, который выводится при вызове функции.

```pascalabc
function IndexOf<T>(a: array of T; value: T): integer;
begin
  for var i := 0 to a.Length - 1 do
    if a[i] = value then
      exit(i);
  exit(-1);
end;

begin
  var a := [3, 8, 1, 6, 4];

  Println(IndexOf(a,6));
  Println(IndexOf(a,10));
end.
````

**Результат:**

```text
3
-1
```


**Результат:**

```text
25
```

## Объект класса как параметр

Объекты классов передаются по ссылке, поэтому процедура может изменить поля переданного объекта.

```pascalabc
type
  Person = auto class
    Name: string;
    Age: integer;
  end;

procedure IncAge(p: Person);
begin
  p.Age += 1;
end;

begin
  var p := new Person('Анна',21);

  IncAge(p);

  Println(p);
end.
```

**Результат:**

```text
(Анна,22)
```

## Параметры по умолчанию и именованные аргументы

Параметры могут иметь значения по умолчанию, а при вызове вместо таких параметров можно использовать именованные аргументы в любом порядке.

```pascalabc
procedure PrintPerson(name: string; age: integer := 18; city: string := 'Москва');
begin
  Println(name, age, city);
end;

begin
  PrintPerson('Анна');
  PrintPerson('Борис', age := 20);
  PrintPerson('Вера', city := 'Ростов-на-Дону');
end.
```

**Результат:**

```text
Анна 18 Москва
Борис 20 Москва
Вера 18 Ростов-на-Дону
```

## Функция, возвращающая кортеж

Кортеж позволяет функции вернуть сразу несколько значений.

```pascalabc
function MinMax(a,b: integer) :=
  if a < b then (a,b) else (b,a);

begin
  var (a,b) := ReadInteger2;
  var (minimum,maximum) := MinMax(a,b);

  Println(minimum,maximum);
end.
```

Если введены числа:

```text
8 3
```

**Результат:**

```text
3 8
```

