---
title: Строки
description: Создание, обработка и преобразование строк.
slug: strings
order: 40
group: Типы данных
---

Строки используются для хранения и обработки текстовых данных.

## Строковый тип

Строки в PascalABC.NET имеют тип `string`.

```pascalabc
begin
  var s: string := 'PascalABC.NET';
  Println(s);
end.
```

## Символы строки

Строка состоит из символов типа `char`.

```pascalabc
begin
  var s := 'Pascalabc';
  var c: char := s[1];

  Println(c);
end.
```

**Результат:**

```text
P
```

## Длина строки

Свойство `Length` возвращает количество символов в строке.

```pascalabc
begin
  var s := 'Pascalabc';

  Println(s.Length);
end.
```

**Результат:**

```text
6
```

## Доступ к символу по индексу

По умолчанию символы строки нумеруются начиная с `1`.

```pascalabc
begin
  var s := 'Pascalabc';

  Println(s[1]);
  Println(s[3]);
end.
```

**Результат:**

```text
P
s
```

## Индексация с конца

Индекс `^1` обозначает последний символ строки, `^2` — предпоследний.

```pascalabc
begin
  var s := 'Pascalabc';

  Println(s[^1]);
  Println(s[^2]);
end.
```

**Результат:**

```text
l
a
```

## Нулевая индексация строк

Директива компилятора `{$zerobasedstrings}` включает нумерацию символов строки начиная с `0`.

```pascalabc
{$zerobasedstrings}

begin
  var s := 'Pascalabc';

  Println(s[0]);
  Println(s[1]);
end.
```

**Результат:**

```text
P
a
```

## Изменение символа строки

Символ строки можно изменить по его индексу.

```pascalabc
begin
  var s := 'Pascalabc';

  s[1] := 'p';

  Println(s);
end.
```

**Результат:**

```text
pascalabc
```

## Перебор символов строки

Цикл `foreach` позволяет последовательно перебрать все символы строки.

```pascalabc
begin
  var s := 'Pascalabc';

  foreach var c in s do
    Print(c);
end.
```

**Результат:**

```text
Pascalabc
```

## Конкатенация строк

Операция `+` соединяет строки.

```pascalabc
begin
  var s1 := 'Pascalabc';
  var s2 := 'ABC.NET';

  var s := s1 + s2;

  Println(s);
end.
```

**Результат:**

```text
PascalABC.NET
```

## Повторение строки

Операция `*` позволяет повторить строку несколько раз.

```pascalabc
begin
  var s := 'abc';

  Println(s * 3);
end.
```

**Результат:**

```text
abcabcabc
```

## Проверка вхождения символа

Операция `in` проверяет, содержится ли подстрока в строке.

```pascalabc
begin
  var s := 'PascalABC.NET';

  Println('ABC' in s);
  Println('z' in s);
end.
```

**Результат:**

```text
True
False
```

## Свойства символов

Для символов типа `char` можно проверять, является ли символ буквой, цифрой или буквой определённого регистра.

```pascalabc
begin
  var c: char := 'A';

  Println(c.IsLetter);
  Println(c.IsDigit);
  Println(c.IsUpper);
  Println(c.IsLower);
end.
```

**Результат:**

```text
True
False
True
False
```

## Изменение регистра строки

Методы `ToUpper` и `ToLower` преобразуют регистр всех букв строки.

```pascalabc
begin
  var s := 'PascalABC.NET';

  Println(s.ToUpper);
  Println(s.ToLower);
end.
```

**Результат:**

```text
PASCALABC.NET
pascalabc.net
```

## Подсчёт вхождений символа

Метод `CountOf` возвращает количество вхождений символа в строку.

```pascalabc
begin
  var s := 'abracadabra';

  Println(s.CountOf('a'));
end.
```

**Результат:**

```text
5
```

## Поиск подстроки

Функция `Pos` возвращает позицию первого вхождения подстроки.

```pascalabc
begin
  var s := 'PascalABC.NET';

  Println(Pos('ABC', s));
end.
```

**Результат:**

```text
7
```

## Замена подстроки

Метод `Replace` заменяет все вхождения одной подстроки другой.

```pascalabc
begin
  var s := 'one two one';

  s := s.Replace('one', 'three');

  Println(s);
end.
```

**Результат:**

```text
three two three
```

## Удаление части строки

Процедура `Delete` удаляет из строки указанное количество символов.

```pascalabc
begin
  var s := 'PascalABC.NET';

  Delete(s, 7, 3);

  Println(s);
end.
```

**Результат:**

```text
Pascalabc.NET
```

## Вставка в строку

Процедура `Insert` вставляет подстроку в заданную позицию.

```pascalabc
begin
  var s := 'Pascalabc.NET';

  Insert('ABC', s, 7);

  Println(s);
end.
```

**Результат:**

```text
PascalABC.NET
```

## Разбиение строки на слова

Метод `ToWords` разбивает текст на отдельные слова.

```pascalabc
begin
  var s := 'PascalABC NET is a programming language';

  var words := s.ToWords;

  words.Count.Println;
end.
```

**Результат:**

```text
6
```

## Преобразование числа и строки

Число можно преобразовать в строку, а строковое представление числа — обратно в число.

```pascalabc
begin
  var x: integer := 123;
  var s: string := x.ToString;
  var y: integer := s.ToInteger;

  Println(s);
  Println(y);
end.
```

**Результат:**

```text
123
123
```

