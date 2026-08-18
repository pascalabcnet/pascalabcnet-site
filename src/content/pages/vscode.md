---
title: PascalABC.NET для Visual Studio Code
description: Официальное расширение PascalABC.NET для Visual Studio Code с IntelliSense, компиляцией и запуском программ.
slug: vscode
---

Официальное расширение позволяет полноценно работать с PascalABC.NET в **Visual Studio Code**.

## Скачать расширение

Расширение можно скачать на [общей странице загрузок PascalABC.NET](/ssyilki-dlya-skachivaniya) или непосредственно в формате VSIX:

[Скачать расширение PascalABC.NET 0.4.0 для VS Code →](https://pascalabc.net/downloads/VSCode/pascalabc-net-0.4.0.vsix)

## Установка в Visual Studio Code

1. Скачайте файл `pascalabc-net-0.4.0.vsix`.
2. В Visual Studio Code откройте **View → Extensions**.
3. Нажмите кнопку **…** в строке **EXTENSIONS**.
4. Выберите пункт **Install from VSIX…**.
5. Укажите скачанный файл расширения.

<figure class="vscode-install-shot">
  <img src="/images/vscode/install-from-vsix.png" alt="Команда Install from VSIX в меню Extensions программы Visual Studio Code" width="3840" height="2200" loading="lazy">
</figure>

## Возможности расширения

Расширение использует специальный Language Server, связанный с семантическим анализатором PascalABC.NET, и предоставляет:

- подсказки по коду;
- completion членов после точки;
- Hover-информацию о типах и элементах программы;
- Signature Help для процедур, функций и методов;
- отображение ошибок компиляции;
- компиляцию и запуск программ;
- выбор целевой платформы **.NET Framework 4.7.2 или .NET 10**.

<div class="vscode-interface-notes">
  <figure>
    <img class="vscode-editor-actions" src="/images/vscode/editor-actions.png" alt="Кнопки запуска, компиляции, создания, открытия и сохранения файла" width="287" height="57" loading="lazy">
    <figcaption>Справа вверху находятся кнопки запуска, компиляции, создания нового <code>.pas</code>-файла, открытия и сохранения файла.</figcaption>
  </figure>
  <figure>
    <img class="vscode-compiler-target" src="/images/vscode/compiler-target.png" alt="Кнопка выбора target PascalABC.NET .NET 10" width="339" height="44" loading="lazy">
    <figcaption>Справа внизу, в строке состояния, находится кнопка выбора target компилятора: .NET Framework 4.7.2 или .NET 10.</figcaption>
  </figure>
</div>

<figure class="release-shot">
  <img src="/images/whats-new/pascalabcnet-4-vscode.png" alt="PascalABC.NET в Visual Studio Code: выбор target .NET 10, IntelliSense и запущенная программа" width="3840" height="2159" loading="lazy">
</figure>

[Подробнее о PascalABC.NET 4.0 →](/whats-new/pascalabcnet-4.0)
