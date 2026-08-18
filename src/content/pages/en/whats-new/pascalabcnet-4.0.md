---
title: PascalABC.NET 4.0
description: Новое поколение PascalABC.NET с поддержкой .NET Framework 4.7.2 и .NET 10.
slug: en/whats-new/pascalabcnet-4.0
---

**PascalABC.NET 4.0 is the new generation of the PascalABC.NET programming system.**

The key changes in version 4.0 are **multitarget support for .NET Framework 4.7.2 and .NET 10**, the official **PascalABC.NET extension for Visual Studio Code with IntelliSense**, and the new **ML PascalABC.NET** library for data analysis and machine learning.

Version 4.0 preserves continuity with PascalABC.NET 3.x while significantly expanding the platform and tooling capabilities of the system.

## Multitarget: .NET Framework 4.7.2 + .NET 10

PascalABC.NET 4.0 introduces support for two target platforms:

**.NET Framework 4.7.2** — the classic PascalABC.NET platform used by the main development environment and the existing library ecosystem.

**.NET 10** — the modern .NET platform with an up-to-date runtime and standard library.

Users can choose the target platform depending on the task while keeping the same language and familiar programming model.

### Modern .NET Capabilities

Supporting .NET 10 required a substantial redesign of the compiler backend.

The new target includes support for **managed references and ref-like types**, which are required for full compatibility with modern .NET APIs:

- ref-return values;
- ref-like types;
- `Span<T>` and `ReadOnlySpan<T>`;
- working with memory ranges without creating unnecessary copies.

For example, `Span<T>` makes it possible to represent a portion of an array or another contiguous memory block without allocating a new array. This is important for modern high-performance .NET APIs.

As a result, PascalABC.NET programs can directly use modern libraries and features of the .NET 10 platform.

## PascalABC.NET for Visual Studio Code

An official extension for **Visual Studio Code** has been created for PascalABC.NET 4.0.

The extension uses a dedicated Language Server integrated with the PascalABC.NET semantic analyzer and provides:

- code suggestions;
- member completion after a dot;
- Hover information about types and program elements;
- Signature Help for procedures, functions, and methods;
- display of compilation errors;
- program compilation and execution;
- support for **.NET Framework 4.7.2 and .NET 10**.

This means PascalABC.NET can now be used as a full-featured development environment not only in its own IDE, but also in Visual Studio Code.

<figure class="release-shot">
  <img src="/images/whats-new/pascalabcnet-4-vscode.png" alt="PascalABC.NET in Visual Studio Code: .NET 10 target selection, IntelliSense, and a running program" width="3840" height="2159" loading="lazy">
</figure>

[PascalABC.NET for Visual Studio Code →](/en/vscode)

## ML PascalABC.NET

**ML PascalABC.NET** is a new library for data analysis and classical machine learning in PascalABC.NET.

It provides a unified set of tools for the complete data workflow:

**data loading → preprocessing → model training → evaluation → visualization**

The library is implemented specifically for PascalABC.NET and does not require external machine learning libraries.

### Working with Data

`DataFrameABC` provides typed data tables and core operations:

- CSV loading;
- data selection and filtering;
- grouping;
- table joins;
- descriptive statistics;
- data conversion for machine learning algorithms.

### Data Preprocessing

ML PascalABC.NET includes preprocessing tools for:

- filling missing values;
- scaling numerical features;
- encoding categorical features;
- One-Hot Encoding;
- PCA;
- building sequences of transformations using pipelines.

### Machine Learning

The library includes major classical machine learning algorithms for:

- regression;
- classification;
- clustering.

These include linear and logistic models, kNN, decision trees, Random Forest, Gradient Boosting, K-Means, and DBSCAN.

It also includes evaluation metrics, cross-validation, and model validation tools.

### Linear Algebra

ML PascalABC.NET includes its own numerical core with vectors and matrices, linear system solvers, and major matrix decompositions.

### Datasets

The library is distributed with ready-to-use datasets for educational examples and experiments:

- `iris.csv` — the classic Iris dataset;
- `mnist_small.csv` — a compact version of the MNIST handwritten digit dataset;
- `moscow_housing.csv` — Moscow housing data;
- `russian_cities.csv` — data on Russian cities;
- `titanic_ru.csv` — a Russian-language version of the Titanic dataset;
- `used_cars_price.csv` — used car price data.

The last four datasets particularly emphasize the educational focus of the library: examples can be built not only on traditional English-language datasets, but also on familiar Russian real-world domains.

**[ML PascalABC.NET Website →](https://pascalabcnet.github.io/ai/)**

## Why 4.0

The version number 4.0 reflects not a single change in the language syntax, but a **transition of the entire PascalABC.NET system to a new generation**.

Three major areas were introduced in one release:

**Multitarget**  
.NET Framework 4.7.2 + .NET 10.

**Visual Studio Code**  
A new full-featured PascalABC.NET development environment with semantic IntelliSense.

**Machine Learning**  
A native library for data analysis and classical machine learning.

At the same time, PascalABC.NET 4.0 preserves compatibility and continuity with the existing PascalABC.NET language and its educational materials.

> **PascalABC.NET 4.0 combines the simplicity of modern Pascal, the mature .NET Framework environment, and the capabilities of the modern .NET 10 platform.**