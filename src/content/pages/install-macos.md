---
title: Установка PascalABC.NET на macOS
description: Установка PascalABC.NET на macOS с помощью Visual Studio Code, расширения PascalABC.NET и .NET 10.
---

На macOS PascalABC.NET пока работает только в **Visual Studio Code** с расширением PascalABC.NET. Этот способ не требует Windows, Whisky, Wine или Mono.

В macOS доступны IntelliSense, диагностика ошибок, компиляция и запуск программ для целевой платформы **.NET 10**. Отладчик пока не поддерживается.

## Шаг 1. Установите Visual Studio Code

Скачайте и установите [Visual Studio Code для macOS](https://code.visualstudio.com/download).

## Шаг 2. Установите .NET 10

Для работы расширения необходима платформа [.NET 10.0](https://dotnet.microsoft.com/download/dotnet/10.0). На странице Microsoft выберите установщик для своей модели Mac.

## Шаг 3. Установите расширение PascalABC.NET

1. Скачайте файл [multitarget-pascalabc-net-0.5.1.vsix](https://pascalabc.net/downloads/VSCode/multitarget-pascalabc-net-0.5.1.vsix).
2. Запустите Visual Studio Code и откройте **View → Extensions**.
3. Нажмите кнопку **…** в строке **EXTENSIONS**.
4. Выберите **Install from VSIX…** и укажите скачанный файл.

После установки откройте файл с расширением `.pas`. Для компиляции и запуска в строке состояния должен быть выбран target **PascalABC.NET: .NET 10**.

[Подробнее о возможностях расширения PascalABC.NET →](/vscode/)

Все доступные дистрибутивы собраны на странице [скачивания PascalABC.NET](/ssyilki-dlya-skachivaniya/).
