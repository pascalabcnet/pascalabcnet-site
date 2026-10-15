---
title: "PriorityQueue in PascalABC.NET: a .NET 10 Priority Queue"
displayTitle: "PriorityQueue in PascalABC.NET: a .NET 10 Priority Queue"
description: "Learn to use .NET PriorityQueue in PascalABC.NET: enqueue tasks, retrieve the smallest priority first, handle ties, and understand common applications."
category: .NET and Libraries
tags:
  - PriorityQueue
  - priority queue
  - data structures
  - algorithms
  - .NET 10
  - PascalABC.NET
draft: false
date: 2026-10-15
---

The **PascalABC.NET compiler for .NET 10** gives you direct access to the modern .NET standard library. One useful example is [`PriorityQueue<TElement,TPriority>`](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.priorityqueue-2?view=net-10.0) from `System.Collections.Generic`.

This tutorial shows how to use a priority queue in Pascal, with a complete PascalABC.NET example. It requires the **.NET 10 target**, not .NET Framework 4.7.2. You can select .NET 10 in the **Program** menu of [Net10Pack for Windows](/en/downloads/#net10pack), or use the [PascalABC.NET extension for VS Code](/en/vscode/).

## What is a priority queue?

A regular queue follows the rule **first in, first out (FIFO)**. A priority queue selects the next element by its priority rather than by its arrival time. By default, .NET's `PriorityQueue` removes the element with the **smallest priority value** first.

Consider a queue of tasks. We will use smaller numbers for more urgent tasks:

```pascalabc
uses System.Collections.Generic;

begin
  var tasks := new PriorityQueue<string,integer>;

  tasks.Enqueue('Create a backup',3);
  tasks.Enqueue('Handle an urgent request',1);
  tasks.Enqueue('Generate a report',2);

  while tasks.Count > 0 do
    Println(tasks.Dequeue);
end.
```

Output:

```text
Handle an urgent request
Generate a report
Create a backup
```

## Element type and priority type

In the declaration

```pascalabc
PriorityQueue<string,integer>
```

`string` is the type of the elements, and `integer` is the type of their priorities. Other types can be used as well, provided the queue has a suitable way to compare priorities.

The `Enqueue` method adds an element together with its priority:

```pascalabc
tasks.Enqueue('Handle an urgent request',1);
```

Calling `Dequeue` removes and returns the element with the **smallest priority value**. The urgent request with priority `1` is therefore returned first, followed by the report with priority `2` and the backup with priority `3`, even though the backup was added first.

Task names do not affect this order: the queue compares only the priorities. Smaller numbers mean greater urgency because that is the convention we chose for this example.

## Why use a task queue?

In a running system, tasks may arrive faster than they can be completed. For example, a service might receive user requests while also preparing reports and backups. If everything is processed in arrival order, an urgent request has to wait behind less important work.

A priority queue lets a worker select **the most urgent waiting task** when it becomes available. A new urgent task can arrive later than other tasks but still be selected before them. This is useful for assigning support requests or choosing background jobs to process.

`PriorityQueue` does not execute tasks or interrupt work that has already started. It only stores elements and determines which one to remove next. Our example stores task names, so it simply prints them in priority order. A real application would perform the corresponding operation after removing a task.

If urgent tasks arrive continuously, lower-priority tasks may wait indefinitely. This is known as **starvation**. A real scheduling policy may also need to account for waiting time rather than relying solely on the initial priority.

## Main PriorityQueue operations

- `Enqueue(element, priority)` adds an element with the specified priority.
- `Dequeue` removes and returns the element with the smallest priority value.
- `Peek` returns the next element without removing it.
- `Count` gives the current number of elements.
- `TryDequeue` attempts to remove an element and retrieve both the element and its priority, returning whether it succeeded.

`Dequeue` and `Peek` throw an exception if the queue is empty. The loop in our example checks `Count` before removing an element; `TryDequeue` is another way to handle an empty queue safely.

If several elements have equal priorities, `PriorityQueue` **does not guarantee FIFO order** among them. When insertion order matters, include an insertion counter as a tie-breaker in the priority and use a comparison that considers both parts.

## Where are priority queues used?

Typical applications include:

- finding shortest paths in graphs, for example with Dijkstra's algorithm;
- scheduling tasks;
- discrete-event simulation;
- processing requests with different levels of urgency.

For a complete algorithmic example, continue with [Dijkstra's Algorithm in PascalABC.NET](/en/articles/dijkstra/). It uses vertex numbers as queue elements and tentative distances as priorities.

`PriorityQueue` illustrates how PascalABC.NET can use modern .NET library classes directly, without implementing every data structure from scratch.
