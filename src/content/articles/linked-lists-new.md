---
title: Связные списки - новый стиль 
description: "Сравнение указателей и ссылок в PascalABC.NET на примере односвязных списков: вставка, удаление, поиск, обход и автоматическая сборка мусора."

category: Язык PascalABC.NET

tags:
  - односвязные списки
  - динамические структуры данных
  - ссылки
  - указатели
  - классы
  - сборка мусора
  - linked list
  - PascalABC.NET
    
legacyUrls:
  - /stati-po-pascalabc-net/osobennosti-yazika/18-svyaznye-spiski-novyj-stil
draft: false
date: 2019-03-30

---

Динамические структуры данных, к которым относятся односвязные и двусвязные списки, традиционно излагаются в теме «Указатели». С другой стороны, в языке **PascalABC.NET** переменные класса являются ссылками на объекты, выделяемыми в динамической памяти, и являются по существу скрытыми указателями. Поэтому заманчиво рассказать основные операции со списками, используя ссылки вместо указателей. Остроты ощущений добавляет тот факт, что в **PascalABC.NET** для объектов производится автоматическая *сборка мусора*, поэтому освобождаемую память не надо возвращать явно.

Рассмотрим основные операции с линейными односвязными списками и приведем реализацию для указателей (слева) и ссылок (справа). Всюду считается, что переменная `p` имеет тип `PNode` для указателей и `Node` для ссылок.

## 1. Предварительные описания

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">type
  PNode = ^Node;

  Node = record
    data: integer;
    next: PNode;
  end;

function NewNode(data: integer; next: PNode): PNode;
begin
  New(Result);
  Result^.data := data;
  Result^.next := next;
end;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">type
  Node = class
    data: integer;
    next: Node;

    constructor (d: integer; n: Node);
    begin
      data := d;
      next := n;
    end;
  end;</code></pre>

</td>
</tr>
</table>

Реализация с указателями — явно более «многословная». К тому же функция `NewNode` является внешней, и связь ее с типом `PNode` определяется только близостью к нему в тексте программы.

## 2. Вставка элемента со значением `x` в начало списка, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p := NewNode(x,p);</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p := new Node(x,p);</code></pre>

</td>
</tr>
</table>

Почти одинаково. Во втором случае вызывается конструктор класса `Node`, возвращающий ссылку на созданный объект.

## 3. Удаление элемента из начала непустого списка, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">var t := p;
p := t^.next;
Dispose(t);</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p := p.next;</code></pre>

</td>
</tr>
</table>

Здесь на компактности записи решения со ссылками сказывается сборка мусора — на первый элемент больше никто не указывает, поэтому память, им занимаемая, будет освобождена при следующей сборке мусора.

## 4. Вставка элемента со значением `x` после текущего, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p^.next := NewNode(x,p^.next);</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p.next := new Node(x,p.next);</code></pre>

</td>
</tr>
</table>

Одно и то же. Только `^` не надо ставить — красота! *Ссылка — это разыменованный указатель.* Шапочки вовсе не нужны!

## 5. Удаление элемента, следующего за текущим, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">var t := p^.next;
if t&lt;&gt;nil then
begin
  p^.next := t^.next;
  Dispose(t);
end;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">if p.next&lt;&gt;nil then
  p.next := p.next.next;</code></pre>

</td>
</tr>
</table>

В указатель на следующий записать адрес элемента, следующего за следующим. Опять-таки, во втором случае на удаляемый узел никто больше не указывает, поэтому память под него будет освобождена при следующей сборке мусора.

## 6. Вставка элемента со значением `x` перед текущим, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p^.next := NewNode(p^.data,p^.next);
p^.data := x;
p := p^.next;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p.next := new Node(p.data,p.next);
p.data := x;
p := p.next;</code></pre>

</td>
</tr>
</table>

Трюк. Вставляем после текущего элемента его копию, после чего меняем в текущем элементе значение на `x`. Решения равноценны.

## 7. Удаление текущего элемента, на который указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">var t := p^.next;
p^ := t^;
Dispose(t);</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p.data := p.next.data;
p.next := p.next.next;</code></pre>

</td>
</tr>
</table>

Элемент, следующий за текущим, должен существовать. В случае указателей мы можем скопировать оба поля за одно присваивание: `p^ := t^`. Но и это не помогает — код со ссылками все равно короче!

## 8. Вывод списка, на первый элемент которого указывает `p`

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">while p&lt;&gt;nil do
begin
  Print(p^.data);
  p := p^.next;
end;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">while p&lt;&gt;nil do
begin
  Print(p.data);
  p := p.next;
end;</code></pre>

</td>
</tr>
</table>

Равноценные решения.

## 9. Поиск элемента со значением `x`

На первый элемент списка указывает `p`.

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">while (p&lt;&gt;nil) and (p^.data&lt;&gt;x) do
  p := p^.next;

var found := p&lt;&gt;nil;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">while (p&lt;&gt;nil) and (p.data&lt;&gt;x) do
  p := p.next;

var found := p&lt;&gt;nil;</code></pre>

</td>
</tr>
</table>

Равноценные решения. Шапочек справа — нет.

## 10. Разрушение списка

<table>
<tr>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">while p&lt;&gt;nil do
begin
  var t := p;
  p := p^.next;
  Dispose(t);
end;</code></pre>

</td>
<td width="50%" valign="top">

<pre><code class="language-pascalabc">p := nil;</code></pre>

</td>
</tr>
</table>

Вот здесь — все преимущества сборки мусора. Присвоил указателю на первый узел списка нулевое значение — и все узлы стали недоступны. При следующей сборке мусора они будут собраны.

