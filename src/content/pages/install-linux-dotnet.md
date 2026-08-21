---
title: Установка PascalABC.NET в Linux для .NET 10
description: Инструкция по установке версии PascalABC.NET для .NET 10 в Linux.
---

В Linux PascalABC.NET для **.NET 10** можно использовать двумя способами:

- как расширение для Visual Studio Code с IntelliSense;
- как консольный компилятор.

Для обоих вариантов на компьютере должна быть установлена платформа **.NET 10**.

## Visual Studio Code

Установите расширение PascalABC.NET по [инструкции для Visual Studio Code](/vscode). В строке состояния VS Code будет отображаться только target **PascalABC.NET: .NET 10**.

В Linux расширение предоставляет IntelliSense, подсказки по коду, сведения о типах, отображение ошибок, компиляцию и запуск программ, а также подсветку синтаксиса. 

## Консольный компилятор

1. [Скачайте архив PascalABC.NET Console для .NET 10](https://pascalabc.net/downloads/PascalABCNET-Console-net10.zip).
2. Распакуйте архив в отдельную папку.
3. Откройте терминал в этой папке.
4. Создайте в этой папке файл `a.pas` со следующим содержимым:

```pascalabc
begin
  Print('Hello PascalABC.NET 4.0!');
end.
```

5. Скомпилируйте программу `a.pas`:

```bash
dotnet pabcnetc.dll a.pas
```

После успешной компиляции будет создан файл `a.exe`. Запустите его командой:

```bash
dotnet a.exe
```

Все установочные файлы также собраны на общей [странице скачивания PascalABC.NET](/ssyilki-dlya-skachivaniya).

Для старой версии PascalABC.NET под Mono сохранена [отдельная инструкция](/install-linux-mono).

[Вернуться к выбору версии](/install-linux).
