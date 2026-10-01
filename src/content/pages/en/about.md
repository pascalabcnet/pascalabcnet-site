---
title: About PascalABC.NET
description: "PascalABC.NET is a modern, statically typed programming language for .NET: its design principles, language features, development tools, and applications."
---

## What is PascalABC.NET?

PascalABC.NET is a modern, statically typed, general-purpose programming language and programming system for the .NET platform.

It builds on the Pascal tradition, retaining its clear syntax and core principles while extending them with modern language constructs and the capabilities of the .NET platform. Today, PascalABC.NET is developed as an independent language, substantially different from both classic Pascal and Delphi.

With PascalABC.NET, you can write a first program in just a few lines, study algorithms and data structures, learn object-oriented and functional programming, solve competitive programming problems, use .NET libraries, build applications, analyze data, and experiment with machine-learning methods.

This breadth reflects the original idea behind PascalABC.NET: **to make modern programming approachable while creating a complete and versatile language**.

## Why PascalABC.NET was created

There is often a gap between taking the first steps in programming and building complex software: simple tools are no longer sufficient, while mastering professional languages requires dealing with numerous technical details.

PascalABC.NET was created so that this path could be followed within a single language environment: from first programs and classical algorithms to modern abstractions, .NET libraries, and complex software projects.

The language is statically typed and compiled: the compiler detects many errors before a program is run, while compiled code provides efficient execution.

At the core of PascalABC.NET is a balance of **simplicity, early error detection, expressive power, and performance**.

The language evolves through continuous feedback from both teaching practice and real-world use. For many years, new constructs, libraries, and approaches have been tested in courses at different levels and in practical work—from first programs and classical algorithms to competitive programming, data processing, and application development. This experience shapes the language's clarity and consistency without limiting its range of use.

## Language design principles

### From algorithms to modern abstractions

PascalABC.NET makes it possible to move naturally from classical algorithmic programming to higher-level data processing while retaining an understanding of the underlying operations.

Suppose an array contains several words and we need their lengths. The operation can first be expressed as a loop:

```pascalabc
var words := ['cold','white','bad','angry','ripe'];
foreach var word in words do
  Print(word.Length);
```

The same task can be written with `Select` and a lambda expression:

```pascalabc
words.Select(word -> word.Length).Print;
```

These are two representations of the same operation at different levels of abstraction. Once a learner understands the loop, `Select` becomes a concise expression of familiar behavior rather than a hidden mechanism.

Operations can then be composed naturally. To find the shortest word length, add `.Min`:

```pascalabc
words.Select(word -> word.Length).Min
```

The path works in both directions: a library operation can also be explored by implementing the algorithm behind it. This supports different ways of teaching and learning the same concept.

### Static typing and early error detection

PascalABC.NET checks syntax, types, scopes, calls, and other semantic rules before a program starts.

```pascalabc
var n := 10;
n := 'abc';
```

Here `n` has the type `integer`, inferred from its initial value. Assigning a string to it is therefore rejected by the compiler before execution.

Type inference avoids unnecessary repetition, but it does not make variables dynamically typed. Explicit declarations and inferred types coexist, allowing code to be as explicit as the task requires.

The concepts learned in PascalABC.NET—types, functions, scopes, classes, interfaces, generics, and lambda expressions—transfer directly to many other modern programming languages.

### Explicit when useful, concise when clear

A variable type can be written explicitly:

```pascalabc
var n: integer := 10;
```

or inferred by the compiler:

```pascalabc
var n := 10;
```

Both declarations create a statically typed variable. The explicit form is useful when the type is important to the explanation or design; inference is useful when repeating it would only add noise.

Likewise, an expression can be written as a compact chain:

```pascalabc
var sum := a.Where(x -> x in 2..5).Sum;
```

or divided into named steps:

```pascalabc
var filtered := a.Where(x -> x in 2..5);
var sum := filtered.Sum;
```

PascalABC.NET does not pursue brevity for its own sake. Its goal is **concise code that preserves structure and readability**.

### Multiple programming paradigms

Programs can be written in [procedural, object-based, object-oriented, and functional styles](https://pascalabcnet.github.io/mydoc_progr_styles.html), or combine these approaches.

The language supports classes, inheritance, interfaces, polymorphism, generic classes and routines, operator overloading, exceptions, extension methods, lambda expressions, and other modern programming tools.

This makes it possible to use one language for explicit algorithms with loops and conditions, object models, and functional processing of sequences.

## Origins and evolution

PascalABC.NET has been developed as an independent language since **2007**.

Its syntactic foundation is connected to Pascal and Object Pascal, while C# had a substantial influence on its architecture. Ideas from Python, Kotlin, Java, Haskell, and other languages have also been adapted where they improve clarity and expressive power.

The language does not simply reproduce features from elsewhere. New constructs are evaluated by how well they help people understand, express, and maintain programs.

Some features appeared in PascalABC.NET long before they became common in other languages of the Pascal family. For example, declaring a variable directly in a loop header has been supported since 2007:

```pascalabc
for var i := 1 to 10 do
```

Block-scoped declarations, type inference, extended loops, ranges, tuples, extension methods, lambda expressions, and sequences now form a distinctive PascalABC.NET programming style.

PascalABC.NET is therefore best understood as **an independent modern language with Pascal-like syntax**, rather than as a compatibility implementation of an older Pascal dialect.

## Where PascalABC.NET can be used

### Learning modern programming

PascalABC.NET supports a gradual path from first programs to advanced concepts without requiring a change of language at every stage. Its readable syntax, static type system, concise constructs, and compiler diagnostics make the relationship between source code and program behavior easier to follow.

The programming system includes examples, automated assessment tools, unit testing support, and the [Programming Taskbook](http://www.ptaskbook.com/) collection of programming exercises.

Because the language is not restricted to beginner-level constructs, the same environment can later be used for data structures, object-oriented design, functional programming, generic algorithms, and .NET libraries.

### Scientific and computational work

As a general-purpose .NET language, PascalABC.NET can be used for data processing, numerical computation, modeling, and computational experiments.

[ML PascalABC.NET](https://pascalabcnet.github.io/ai/) is a machine-learning and data-analysis library without external dependencies. It includes tools for tabular data, linear algebra, statistics, visualization, and machine-learning algorithms.

The modern PascalABC.NET compiler supports **.NET 10**, providing access to current .NET libraries and APIs on Windows, Linux, and macOS.

### Application development

PascalABC.NET combines a compact source notation with static checking, compiled performance, and access to the .NET platform. It can be used for command-line tools, educational software, data-processing utilities, prototypes, and general application development.

The language's multi-paradigm design allows a project to begin with straightforward procedural code and evolve toward generic, object-oriented, or functional structures when needed.

## .NET platform and development tools

PascalABC.NET is both a language and a complete programming system.

The PascalABC.NET IDE is designed for a quick start while providing practical development features: code completion, code hints, automatic formatting, error diagnostics, program examples, automated assessment, and unit testing.

The [PascalABC.NET extension for Visual Studio Code](/en/vscode/) provides IntelliSense, error reporting, compilation, and program execution.

Two compiler options are available:

- a .NET Framework 4.7.2 compiler for Windows and for Linux through Mono;
- the modern PascalABC.NET compiler for .NET 10, supporting Windows, Linux, and macOS.

This allows developers to choose between the dedicated PascalABC.NET IDE and a familiar cross-platform Visual Studio Code workflow.

## Development and community

PascalABC.NET is distributed under the LGPL free software license. The language, compilers, libraries, and development tools continue to evolve, with feedback from educators, learners, researchers, and developers informing the project.

The IDE and compiler diagnostics support multiple interface languages. Programs may use Unicode identifiers and names from different writing systems.

Project source code is available on [GitHub](https://github.com/pascalabcnet), and users can follow development or ask questions through the project's community channels.
