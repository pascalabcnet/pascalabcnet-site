---
title: Установка PascalABC.NET на macOS
description: Пошаговая установка PascalABC.NET на компьютеры Mac с процессором ARM при помощи Whisky.
---

Инструкция предназначена для установки PascalABC.NET на компьютеры Mac с процессором ARM. Для запуска Windows-версии PascalABC.NET используется Whisky.

## Шаг 1. Установка Xcode Command Line Tools

**Xcode Command Line Tools** предоставляет инструменты командной строки, необходимые для дальнейшей установки.

1. Откройте приложение **Терминал** на Mac. Его можно найти через поиск или в папке «Программы».
2. Введите команду и нажмите Enter:

```bash
xcode-select --install
```

Дождитесь завершения установки.

## Шаг 2. Установка Homebrew

**Homebrew** — менеджер пакетов, который упрощает установку программ в macOS.

Если Homebrew ещё не установлен, выполните в Терминале следующие команды по очереди:

```bash
curl -fsSL -o install.sh https://raw.githubusercontent.com/Homebrew/install/master/install.sh
/bin/bash install.sh
```

После установки добавьте Homebrew в системный путь. Откройте файл настроек оболочки Zsh:

```bash
nano ~/.zshrc
```

Перейдите на пустую строку и добавьте:

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

Сохраните изменения сочетанием Control + X, нажмите Y для подтверждения, затем Enter.

Если вместо Zsh используется Bash, аналогичную строку следует добавить в файл, открываемый командой:

```bash
nano ~/.bash_profile
```

## Шаг 3. Установка Whisky

**Whisky** позволяет запускать приложения Windows на Mac.

Установите Whisky и Winetricks:

```bash
brew install --cask whisky
brew install winetricks
```

Whisky также можно [скачать вручную со страницы выпуска 2.3.3](https://github.com/Whisky-App/Whisky/releases/tag/v2.3.3).

После установки откройте Whisky.

## Шаг 4. Создание Bottle с Windows 10

1. Создайте в Whisky новую **Bottle** — изолированное окружение, подобное виртуальному компьютеру, — с системой Windows 10.
2. Когда Bottle будет готова, нажмите кнопку **Terminal** внизу окна Whisky.

## Шаг 5. Установка .NET Framework 4.7.1

В открывшемся терминале Whisky выполните команды:

```bash
winetricks --self-update
winetricks -q dotnet471
```

Будет установлен .NET Framework 4.7.1, необходимый для работы этой версии PascalABC.NET.

## Шаг 6. Установка PascalABC.NET

Скачайте [инсталлятор PascalABC.NET StandardPack](https://pascalabc.net/downloads/PascalABCNETSetup.exe).

В созданной **Bottle** запустите установочный файл PascalABC.NET кнопкой **Run** внизу окна Whisky.

После завершения установки PascalABC.NET готов к работе на Mac.

![PascalABC.NET в macOS 15](/images/pages/macos-pascalabc.jpg)

Все доступные дистрибутивы собраны на странице [скачивания PascalABC.NET](/ssyilki-dlya-skachivaniya).
