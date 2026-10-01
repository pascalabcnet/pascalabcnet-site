---
title: Процедуры и функции
description: Создание подпрограмм, параметры и возвращаемые значения.
slug: functions
order: 80
group: Подпрограммы
---

Процедуры и функции позволяют выделять повторяющиеся действия и вычисления в самостоятельные именованные подпрограммы.
Они могут принимать параметры и вызываться с различными аргументами.

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

Возвращаемое значение функции задаётся с помощью переменной `Result`.

```pascalabc
function Square(x: integer): integer;
begin
  Result := x * x;
end;

function SumArray(a: array of integer): integer;
begin
  Result := 0;
  foreach var x in a do
    Result += x;
end;

begin
  Println(Square(5));

  var a := [3, 8, 1, 6, 4];

  Println(SumArray(a));
end.
```

**Результат:**

```text
25
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

**Результат:**

```text
25
```

## Оператор `exit` и досрочный выход из функции

Оператор `exit` позволяет сразу завершить функцию и вернуть найденное значение.

```pascalabc
function IndexOf(a: array of integer; value: integer): integer;
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


## Параметры по умолчанию и именованные аргументы

Параметры могут иметь значения по умолчанию. Именованные аргументы позволяют явно указывать параметры при вызове и передавать их в произвольном порядке.

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
  var (min,max) := MinMax(a,b);

  Println(min,max);
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

## Обобщённая функция

Обобщённая функция может работать со значениями разных типов. Типовой параметр `T` определяется автоматически при вызове.

```pascalabc
function First<T>(a: array of T): T;
begin
  Result := a[0];
end;

begin
  var a := [10, 20, 30];
  var s := ['red', 'green', 'blue'];

  Println(First(a));
  Println(First(s));
end.
```

Результат:

```
10
red
```