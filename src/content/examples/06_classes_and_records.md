---
title: Классы и записи
description: Классы и записи как составные типы данных PascalABC.NET.
slug: classes-and-records
order: 60
group: Типы данных
---

Классы и записи объединяют связанные данные и методы в одном типе. Данные, хранящиеся в объекте класса или записи, называются полями.

В PascalABC.NET для описания составных данных обычно используются классы. Класс — **ссылочный тип**, а запись — **значимый тип**: при присваивании класс копирует ссылку на объект, а запись — само значение.

## Классы

Классы объединяют данные и методы для описания объектов программы.

### Описание класса и создание объекта

Тип класса описывается с помощью `class` в секции `type`. Экземпляр класса создаётся с помощью `new`, а к его полям обращаются через точку.

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
Переменная `Self` в конструкторе обозначает текущий объект и позволяет отличать его поля от одноимённых параметров конструктора.

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

Модификатор `auto` автоматически создаёт конструктор и позволяет компактно описывать классы, предназначенные прежде всего для хранения данных.
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

При присваивании переменной класса копируется ссылка на объект, а не сам объект. Поэтому две переменные могут ссылаться на один объект.

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

По умолчанию объекты класса сравниваются по ссылкам: две переменные равны, если они ссылаются на один и тот же объект.

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

Записи объединяют несколько связанных полей в один составной тип данных. Запись является значимым типом.
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

### Метод записи

Запись, как и класс, может содержать методы.

```pascalabc
type
  Point = record
    X, Y: real;
    
    // Расстояние до начала координат
    function Distance := Sqrt(X * X + Y * Y);
  end;

begin
  var p: Point;
  p.X := 3;
  p.Y := 4;
  Println(p.Distance); 
end.
```

### Присваивание записей

При присваивании записи копируется её значение. Поэтому изменение одной переменной не изменяет другую.

```pascalabc
type
  Person = record
    Name: string;
    Age: integer;
  end;

begin
  var p1: Person;
  p1.Name := 'Анна';
  p1.Age := 21;

  var p2 := p1;
  p2.Age := 22;

  Println(p1.Age);
  Println(p2.Age);
end.
```

**Результат:**

```text
21
22
```

### Сравнение записей

Записи одного типа можно сравнивать на равенство. При сравнении сопоставляются значения их полей.

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

