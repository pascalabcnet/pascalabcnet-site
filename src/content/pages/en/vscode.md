---
title: PascalABC.NET for VS Code
description: PascalABC.NET extension for Visual Studio Code.
slug: en/vscode
translationStatus: translated
---

The official extension provides full-featured PascalABC.NET support in **Visual Studio Code**.

## Download the Extension

You can download the extension from the [PascalABC.NET downloads page](/en/downloads) or directly as a VSIX file:

[Download PascalABC.NET Extension 0.5.1 for VS Code →](https://pascalabc.net/downloads/VSCode/multitarget-pascalabc-net-0.5.1.vsix)

## Installation in Visual Studio Code

The extension requires [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0).

1. Download the `multitarget-pascalabc-net-0.5.1.vsix` file.
2. In Visual Studio Code, open **View → Extensions**.
3. Click the **…** button in the **EXTENSIONS** header.
4. Select **Install from VSIX…**.
5. Select the downloaded extension file.

<figure class="vscode-install-shot">
  <img src="/images/vscode/install-from-vsix.png" alt="Install from VSIX command in the Visual Studio Code Extensions menu" width="3840" height="2200" loading="lazy">
</figure>

## Extension Features

The extension uses a dedicated Language Server integrated with the PascalABC.NET semantic analyzer and provides:

- code suggestions;
- member completion after a dot;
- Hover information about types and program elements;
- Signature Help for procedures, functions, and methods;
- display of compilation errors;
- program compilation and execution;
- selection of the target platform: **.NET Framework 4.7.2 or .NET 10**.

**IntelliSense**, including code suggestions, type information, Signature Help, and error reporting, works on Windows, Linux, and macOS.

> **Linux and macOS:** program compilation and execution are available for the **.NET 10** target. The **.NET Framework 4.7.2** target is supported only on Windows. On macOS, PascalABC.NET currently works only through Visual Studio Code, without debugger support.

<div class="vscode-interface-notes">
  <figure>
    <img class="vscode-editor-actions" src="/images/vscode/editor-actions.png" alt="Buttons for running, compiling, creating, opening, and saving a file" width="287" height="57" loading="lazy">
    <figcaption>In the upper-right corner are buttons for running and compiling the program, creating a new <code>.pas</code> file, opening a file, and saving a file.</figcaption>
  </figure>
  <figure>
    <img class="vscode-compiler-target" src="/images/vscode/compiler-target.png" alt="PascalABC.NET .NET 10 target selection button" width="339" height="44" loading="lazy">
    <figcaption>In the lower-right corner of the status bar is the compiler target selection button: .NET Framework 4.7.2 or .NET 10.</figcaption>
  </figure>
</div>

<figure class="release-shot">
  <img src="/images/whats-new/pascalabcnet-4-vscode.png" alt="PascalABC.NET in Visual Studio Code: .NET 10 target selection, IntelliSense, and a running program" width="3840" height="2159" loading="lazy">
</figure>

[Learn more about PascalABC.NET 4.0 →](/en/whats-new/pascalabcnet-4.0)
