---
title: "Dijkstra's Algorithm in PascalABC.NET with PriorityQueue"
displayTitle: "Dijkstra's Algorithm in PascalABC.NET"
description: "Find shortest paths in PascalABC.NET using .NET 10 PriorityQueue. Complete Dijkstra implementation with adjacency lists, edge relaxation, and complexity analysis."
category: Algorithms
tags:
  - Dijkstra's algorithm
  - shortest paths
  - graphs
  - adjacency lists
  - PriorityQueue
  - .NET 10
  - PascalABC.NET
draft: false
date: 2026-10-15
---

**Dijkstra's algorithm finds shortest paths from a starting vertex to all reachable vertices in a graph with non-negative edge weights.** In this PascalABC.NET tutorial, we implement it using adjacency lists and the .NET `PriorityQueue` introduced in our [priority queue tutorial](/en/articles/priorityqueue-dotnet10/).

An edge weight can represent distance, travel time, cost, or network latency: a non-negative quantity that adds up along a path and needs to be minimized. This makes the algorithm useful in navigation, logistics, computer networks, and game maps.

The example requires **PascalABC.NET targeting .NET 10**. `PriorityQueue` is part of modern .NET but is not available in .NET Framework 4.7.2. For Windows, you can use [Net10Pack](/en/downloads/#net10pack); the [VS Code extension](/en/vscode/) also supports the .NET 10 target.

## How Dijkstra's algorithm works

Let `start` be the starting vertex. For each vertex `v`, `dist[v]` stores the **shortest distance found so far** from `start` to `v`. Until a vertex is processed, its tentative distance may still improve.

Initially, only the distance from the starting vertex to itself is known:

$$
\operatorname{dist}[\mathrm{start}] = 0, \qquad
\operatorname{dist}[v] = +\infty \quad (v \ne \mathrm{start}).
$$

At each step, select the unprocessed vertex with the smallest known distance and examine its outgoing edges. Suppose an edge of weight `w` leads from `u` to `v`. If

$$
\operatorname{dist}[u] + w < \operatorname{dist}[v],
$$

then reaching `v` through `u` improves its distance. Update that distance and add a new queue entry:

```pascalabc
if dist[u] + w < dist[v] then
begin
  dist[v] := dist[u] + w;
  q.Enqueue(v,dist[v])
end
```

This operation is called **edge relaxation**. `PriorityQueue` provides an efficient way to select the vertex with the smallest tentative distance: the vertex number is the element, and the distance is its priority.

## Complete PascalABC.NET implementation

Consider an undirected graph with six vertices numbered from `0` to `5`. The program runs Dijkstra's algorithm from vertex `0` and computes **the shortest distance to every vertex**. It does not reconstruct the routes themselves.

```pascalabc
uses System.Collections.Generic;

begin
  var n := 6;

  var edges := [
    (0,1,7), (0,2,9), (0,5,14),
    (1,2,10), (1,3,15),
    (2,3,12), (2,5,2),
    (3,4,6), (4,5,9)
  ];

  var graph := ArrGen(n,i -> new List<(integer,integer)>);

  foreach var (u,v,w) in edges do
  begin
    graph[u].Add((v,w));
    graph[v].Add((u,w))
  end;

  var start := 0;

  var dist := ArrFill(n,integer.MaxValue);
  var used := new boolean[n];
  dist[start] := 0;

  var q := new PriorityQueue<integer,integer>;
  q.Enqueue(start,0);

  while q.Count > 0 do
  begin
    var u := q.Dequeue;

    if used[u] then
      continue;

    used[u] := True;

    foreach var (v,w) in graph[u] do
      if dist[u] + w < dist[v] then
      begin
        dist[v] := dist[u] + w;
        q.Enqueue(v,dist[v])
      end
  end;

  dist.Println
end.
```

## Representing the graph with adjacency lists

For each vertex, `graph` stores a list of pairs containing a neighboring vertex and an edge weight. `ArrGen` creates a separate list for each vertex.

For example, the triple `(2,5,2)` in `edges` connects vertices `2` and `5` with an edge of weight `2`. Because the graph is undirected, each edge is added to both vertices' lists.

For a directed graph, keep only `graph[u].Add((v,w))`, which adds the edge in its specified direction.

## Output and shortest distances

The program prints:

```text
0 7 9 21 20 11
```

The array positions correspond to vertices `0` through `5`:

| Vertex | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| Distance | 0 | 7 | 9 | 21 | 20 | 11 |

The shortest distance from `0` to `1` is $7$, to `2` is $9$, and to `5` is $11$. Although the direct edge $0 \to 5$ has weight $14$, the path $0 \to 2 \to 5$ is shorter:

$$
9 + 2 = 11 < 14.
$$

The shortest distance to vertex `4` is $20$, along the path $0 \to 2 \to 5 \to 4$:

$$
9 + 2 + 9 = 20.
$$

One run therefore computes the shortest distances from the selected starting vertex to **all vertices**, rather than finding only the nearest vertex or one predetermined route.

## Why use PriorityQueue?

Without a priority queue, we could scan all unprocessed vertices at every step to find the one with the smallest `dist`. That requires a linear search. For sparse graphs, `PriorityQueue` makes this selection more efficient: `Dequeue` removes the entry with the smallest priority, representing the smallest distance.

There is an important detail: if a path of length $20$ is found for a vertex and a shorter path of length $15$ is found later, the vertex is simply added to the queue again with the new priority. The old entry remains in the queue.

This happens in our example. Vertex `5` is first enqueued with distance $14$, then enqueued again with distance $11$ after vertex `2` is processed. The entry with priority $11$ is removed before the entry with priority $14$.

The `used` array ensures that **each vertex is processed only once**, skipping all later entries for it:

```pascalabc
if used[u] then
  continue;
```

When a vertex is removed from the queue for the first time, its shortest distance is final. It has the smallest tentative distance among unprocessed vertices; continuing a path through other unprocessed vertices cannot produce a shorter distance, because all edge weights are non-negative. We then mark the vertex as processed and examine its outgoing edges once.

## Limitations and common pitfalls

**Edge weights must be non-negative.** Zero weights are allowed; negative weights invalidate the correctness argument for Dijkstra's algorithm.

The program uses `integer.MaxValue` as a sentinel for infinity. If a vertex cannot be reached from `start`, its distance remains equal to this value. Only vertices with a known finite distance enter the queue, so the infinity sentinel is never used in addition.

The `integer` type is sufficient for our small example. With large weights or long paths, however, `dist[u] + w` can overflow. Use a wider type such as `int64` for **both distances and queue priorities**, and ensure that sums fit in that type. All finite distances must be smaller than the chosen infinity sentinel.

The program returns distances, not the actual paths. To reconstruct a path, also store the predecessor of `v` whenever relaxing an edge improves `dist[v]`.

## Time and space complexity

Let $V$ be the number of vertices and $E$ the number of edges. In this implementation, vertices may be enqueued more than once, so the queue can contain $O(E)$ entries. Including array initialization, the time complexity is

$$
O\bigl(V + E\log(E + 2)\bigr).
$$

For a simple graph without parallel edges, this is usually expressed in the familiar form

$$
O\bigl((V + E)\log V\bigr).
$$

The adjacency lists, arrays, and queue use $O(V + E)$ space. This approach is particularly useful for large sparse graphs.

For more on the queue operations used here, see [PriorityQueue in PascalABC.NET: a .NET 10 Priority Queue](/en/articles/priorityqueue-dotnet10/).
