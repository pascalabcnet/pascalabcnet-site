---
title: Классы и записи
description: Классы и записи как составные типы данных PascalABC.NET.
slug: classes-and-records
order: 60
group: Типы данных
---

Классы и записи объединяют связанные данные и методы в одном типе. 
Данные называются полями класса или записи. 
Предпочтительный способ описания составных данных в PascalABC.NET — использование классов. Класс — ссылочный тип: переменная хранит ссылку на объект, который создаётся с помощью конструктора. Запись — размерный тип: значение хранится непосредственно в переменной и при присваивании копируется.

## Классы

Классы объединяют данные и методы для описания объектов программы. Экземпляр класса создаётся вызовом конструктора `new`.

### Описание класса и создание объекта

Класс описывает структуру объекта, а экземпляр класса создаётся с помощью `new`. К полям класса обращаются через точку.
Тип класса описывается в секции `type`.

```pascalabc
type
  Person = class
    Name: string;
    Age: integer;
  end;

begin
  var p := new Person;
  p.Name := 'Анна';
  p.Age := 21;

  Println(p.Name, p.Age);
end.
```

**Результат:**

```text
Анна 21
```

### Конструктор класса

Конструктор позволяет задать начальные значения полей при создании объекта. 
Переменная `Self` в конструкторе означает ссылку на сам объект и используется для разрешения коллизий имен.

```pascalabc
type
  Person = class
    Name: string;
    Age: integer;
    
    constructor(name: string; age: integer);
    begin
      Self.Name := name;
      Self.Age := age;
    end;
  end;

begin
  var p := new Person('Анна',21);

  Println(p.Name, p.Age);
end.
```

**Результат:**

```text
Анна 21
```


### Метод класса

Метод класса может обращаться к полям текущего объекта.

```pascalabc
type
  Person = class
    Name: string;
    Age: integer;
    
    constructor(name: string; age: integer);
    begin
      Self.Name := name;
      Self.Age := age;
    end;

    procedure PrintInfo;
    begin
      Println(Name, Age);
    end;
  end;

begin
  var p := new Person('Анна',21);

  p.PrintInfo;
end.
```

**Результат:**

```text
Анна 21
```

### Автокласс

Модификатор `auto` при описании класса автоматически создаёт конструктор и позволяет компактно описывать классы, предназначенные прежде всего для хранения данных.
Стандартная процедура `Print` выводит для переменной автокласса все поля:

```pascalabc
type
  Person = auto class
    Name: string;
    Age: integer;
  end;

begin
  var p := new Person('Иванов',18);

  Print(p);
end.
```

**Результат:**

```text
(Иванов,18)
```

### Присваивание переменных классов

При присваивании переменной класса копируется ссылка, поэтому две переменные могут ссылаться на один объект.

```pascalabc
type
  Person = auto class
    Name: string;
    Age: integer;
  end;

begin
  var p1 := new Person('Анна',21);

  var p2 := p1;
  p2.Age := 22; // p1 и p2 ссылаются на один объект

  Println(p1.Age);
end.
```

**Результат:**

```text
22
```

### Сравнение объектов класса

Объекты класса сравниваются по ссылкам: равны две переменные, которые ссылаются на один и тот же объект.

```pascalabc
type
  Person = auto class
    Name: string;
    Age: integer;
  end;

begin
  var p1 := new Person('Анна',21);

  var p2 := p1;
  var p3 := new Person('Анна',21);

  Println(p1 = p2);
  Println(p1 = p3);
end.
```

**Результат:**

```text
True
False
```

### Значение `nil`

Переменной класса можно присвоить `nil`; в этом случае она не ссылается ни на какой объект.

```pascalabc
type
  Person = class
    Name: string;
    Age: integer;
  end;

begin
  var p: Person := nil;

  Println(p = nil);

  p := new Person;
  Println(p = nil);
end.
```

**Результат:**

```text
True
False
```



## Записи

Записи объединяют несколько связанных полей в один составной тип данных. Запись является размерным типом.
Для переменной типа запись не требуется вызов конструктора - память выделяется при описании переменной.

### Описание типа и создание записи

Тип записи описывается с помощью `record` в секции `type`

```pascalabc
type
  Person = record
    Name: string;
    Age: integer;
  end;

begin
  var p: Person;
  p.Name := 'Анна';
  p.Age := 21;

  Println(p);
end.
```

**Результат:**

```text
(Анна,21)
```

### Доступ и изменение полей

К полям записи обращаются через точку; значения полей можно читать и изменять.

```pascalabc
type
  Person = record
    Name: string;
    Age: integer;
  end;

begin
  var p: Person;
  p.Name := 'Анна';
  p.Age := 21;

  Println(p.Name, p.Age);

  p.Age := 22;
  Println(p);
end.
```

**Результат:**

```text
Анна 21
(Анна,22)
```

### Сравнение записей

Записи одного типа можно сравнивать на равенство: сравнение выполняется по значениям их полей.

```pascalabc
type
  Person = record
    Name: string;
    Age: integer;
  end;

begin
  var p1, p2: Person;

  p1.Name := 'Анна';
  p1.Age := 21;

  p2.Name := 'Анна';
  p2.Age := 21;

  Println(p1 = p2);

  p2.Age := 22;
  Println(p1 = p2);
end.
```

**Результат:**

```text
True
False
```

