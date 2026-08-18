---
title: Текстовые файлы
description: Чтение, запись и обработка файлов.
slug: files
order: 170
group: Работа с данными
---

Файлы позволяют сохранять данные между запусками программы и обрабатывать внешнюю информацию.

Текстовый файл хранит данные в виде текста, разбитого на строки. В PascalABC.NET файл можно открыть для чтения, записи или добавления данных, после чего работать с ним через методы файловой переменной.

## Открытие файла для чтения

Функция `OpenRead` открывает текстовый файл для чтения, а метод `Close` закрывает его после работы.

Пусть файл `input.txt` содержит:

```text
PascalABC.NET
```

```pascalabc
begin
  var f := OpenRead('input.txt');

  Println(f.ReadlnString);

  f.Close;
end.
```

**Результат:**

```text
PascalABC.NET
```

## Чтение данных разных типов

Методы `ReadInteger`, `ReadReal` и `ReadWord` считывают данные из текстового файла сразу в нужном типе.

Пусть файл `data.txt` содержит:

```text
25 3.14 Pascal
```

```pascalabc
begin
  var f := OpenRead('data.txt');

  var n := f.ReadInteger;
  var x := f.ReadReal;
  var s := f.ReadWord;

  f.Close;

  Println(n, x, s);
end.
```

**Результат:**

```text
25 3.14 Pascal
```

## Чтение файла до конца

Свойство `Eof` позволяет организовать цикл чтения строк до конца файла.

Пусть файл `input.txt` содержит:

```text
Первая строка
Вторая строка
Третья строка
```

```pascalabc
begin
  var f := OpenRead('input.txt');

  while not f.Eof do
    Println(f.ReadlnString);

  f.Close;
end.
```

**Результат:**

```text
Первая строка
Вторая строка
Третья строка
```

## Обработка чисел из файла

Последовательное чтение удобно использовать, когда файл содержит заранее неизвестное количество значений.

Пусть файл `numbers.txt` содержит:

```text
10 20 5 7 8
```

```pascalabc
begin
  var f := OpenRead('numbers.txt');
  var sum := 0;

  while not f.Eof do
    sum += f.ReadInteger;

  f.Close;

  Println(sum);
end.
```

**Результат:**

```text
50
```

## Открытие файла для записи

Функция `OpenWrite` создаёт новый файл или очищает существующий, а методы `Write` и `Writeln` записывают в него данные.

```pascalabc
begin
  var f := OpenWrite('output.txt');

  f.Write('PascalABC.NET ');
  f.Writeln(2026);
  f.Writeln('Программирование');

  f.Close;
end.
```

**Содержимое файла `output.txt`:**

```text
PascalABC.NET 2026
Программирование
```

## Запись с разделением пробелами

Методы `Print` и `Println` записывают несколько значений, автоматически разделяя их пробелами.

```pascalabc
begin
  var f := OpenWrite('students.txt');

  f.Println('Анна', 21, 4.5);
  f.Println('Борис', 19, 4.2);

  f.Close;
end.
```

**Содержимое файла `students.txt`:**

```text
Анна 21 4.5
Борис 19 4.2
```

## Добавление в конец файла

Функция `OpenAppend` открывает существующий файл для добавления новых данных в его конец.

```pascalabc
begin
  var f := OpenWrite('log.txt');
  f.Println('Запуск программы');
  f.Close;

  f := OpenAppend('log.txt');
  f.Println('Завершение программы');
  f.Close;
end.
```

**Содержимое файла `log.txt`:**

```text
Запуск программы
Завершение программы
```

## Имя, переименование и удаление файла

Свойство `Name` возвращает имя файла, а методы `Rename` и `Erase` позволяют переименовать и удалить закрытый файл.

```pascalabc
begin
  var f := OpenWrite('old.txt');

  f.Println('Текст');
  Println(f.Name);

  f.Close;

  f.Rename('new.txt');
  f.Erase;
end.
```

**Результат:**

```text
old.txt
```

При переименовании и удалении файлов файловая переменная может быть недоступна. В этом случае лучше воспользоваться внешними процедурами
`DeleteFile` и `RenameFile`:

```pascalabc
  DeleteFile('old.txt')
  RenameFile('new.txt','old.txt');
end.
```

## Кодировка файла

При открытии текстового файла можно явно указать кодировку, например `Encoding.UTF8`.

```pascalabc
begin
  var f := OpenWrite('text.txt', Encoding.UTF8);

  f.Println('Привет, PascalABC.NET!');
  f.Close;

  f := OpenRead('text.txt', Encoding.UTF8);

  Println(f.ReadlnString);
  f.Close;
end.
```

**Результат:**

```text
Привет, PascalABC.NET!
```

## Чтение всего файла

Функция `ReadAllText` читает всё содержимое текстового файла в одну строку и автоматически закрывает файл.

Пусть файл `input.txt` содержит:

```text
Первая строка
Вторая строка
```

```pascalabc
begin
  var text := ReadAllText('input.txt');

  Print(text);
end.
```

**Результат:**

```text
Первая строка
Вторая строка
```

## Запись всего текста

Функция `WriteAllText` записывает строку в файл, не требуя явно открывать и закрывать его.

```pascalabc
begin
  var text := 'Hello, PascalABC.NET!';

  WriteAllText('output.txt', text);
end.
```

**Содержимое файла `output.txt`:**

```text
Hello, PascalABC.NET!
```

## Чтение всех строк в массив

Функция `ReadAllLines` открывает файл, читает все строки файла и возвращает `array of string`, затем закрывает файл.

Пусть файл `colors.txt` содержит:

```text
red
green
blue
```

```pascalabc
begin
  var lines := ReadAllLines('colors.txt');

  lines.Println;
end.
```

**Результат:**

```text
red green blue
```

## Запись массива строк

Функция `WriteLines` ооткрывает файл, записывает в него элементы массива строк — каждый элемент в отдельную строку, затем закрывает файл.

```pascalabc
begin
  var lines := ['red', 'green', 'blue'];

  WriteLines('colors.txt', lines);
end.
```

**Содержимое файла `colors.txt`:**

```text
red
green
blue
```

## Чтение строк как последовательности

Функция `ReadLines` возвращает строки файла как `sequence of string` - в отличие от `ReadAllLines` строки не хранятся в памяти одновременно, а считывается сторка за строкой
К результату можно применять методы последовательностей.

Пусть файл `numbers.txt` содержит:

```text
one
two
three
four
```

```pascalabc
begin
  var lines := ReadLines('numbers.txt');

  lines.Where(s -> s.Length > 3).PrintLines;
end.
```

**Результат:**

```text
three
four
```

## Запись последовательности строк

Функция `WriteLines` записывает в файл строки из `sequence of string`.

```pascalabc
begin
  var lines: sequence of string := ['Pascal', 'Python', 'C#'];

  WriteLines('languages.txt', lines);
end.
```

**Содержимое файла `languages.txt`:**

```text
Pascal
Python
C#
```

## Фильтрация строк файла

`ReadLines` и `WriteLines` позволяют обработать большой текстовый файл как последовательность, не загружая все его строки в массив.

Пусть файл `input.txt` содержит:

```text
PascalABC.NET
Python
Pascal
C#
PascalABC.NET и .NET
```

```pascalabc
begin
  var lines := ReadLines('input.txt')
    .Where(s -> 'Pascal' in s);

  WriteLines('output.txt', lines);
end.
```

**Содержимое файла `output.txt`:**

```text
PascalABC.NET
Pascal
PascalABC.NET и .NET
```

## Частоты слов в файле

Текст файла можно разбить на слова и подсчитать количество появлений каждого слова.

Пусть файл `words.txt` содержит:

```text
one two one three two one
```

```pascalabc
begin
  var text := ReadAllText('words.txt');

  text.ToWords(AllDelimiters)
    .EachCount
    .PrintLines;
end.
```

**Результат:**

```text
(one,3)
(two,2)
(three,1)
```
