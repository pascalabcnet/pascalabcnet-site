---
title: Установка PascalABC.NET в Linux с Mono
description: Установка версии PascalABC.NET для Mono в обычных дистрибутивах, Alt Linux и Astra Linux.
---

## Общий алгоритм

0. [Скачайте версию PascalABC.NET для Linux](/ssyilki-dlya-skachivaniya). Это ZIP-архив.

1. Архив содержит папки `PascalABCNETLinux` и `Samples`. Для определённости будем считать, что они распакованы в `/home/user`.

2. Перед запуском следует установить пакет Mono. Процесс установки описан в [официальной инструкции Mono](https://www.mono-project.com/download/stable/#download-lin).

Можно не читать официальный документ, а выполнить команду:

```bash
sudo apt-get install mono-complete
```

Затем, возможно, потребуется команда для установки пакета с кодировкой 1251:

```bash
sudo apt-get install mono-locale-extras
```

В некоторых версиях Linux пакет `mono-complete` может отсутствовать. Тогда вместо него следует установить `mono-devel`:

```bash
sudo apt-get install mono-devel
```

Также рекомендуется выполнить команду:

```bash
sudo apt-get install gnome-themes-standard
```

3. Попробуйте запустить `PascalABCNETLinux.exe` из папки `PascalABCNETLinux`. В некоторых версиях Linux расширение `.exe` не ассоциировано с запуском Mono, поэтому в консоли в этой папке следует выполнить команду:

```bash
mono PascalABCNETLinux.exe
```

4. При запуске может возникнуть ошибка, связанная с отсутствием папки:

```text
/etc/mono/registry/LocalMachine
```

В этом случае рекомендуется создать папки `registry` и `registry/LocalMachine` в `/etc/mono/` вручную либо выполнить команды:

```bash
mkdir -p /home/user/PascalABCLinux/registry
mkdir -p /home/user/PascalABCLinux/registry/LocalMachine
export MONO_REGISTRY_PATH=/home/user/PascalABCLinux/registry
```

## Установка с WINE

[Инструкция по установке с WINE](https://pascalabc.miraheze.org/wiki/%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0_%D0%B2_Linux) размещена в Wiki PascalABC.NET.

## Alt Linux Образование 10.1

PascalABC.NET уже находится в репозитории Alt Linux Образование — установите его из репозитория.

## Alt Linux: общий алгоритм

В Alt Linux установка пакета Mono выполняется по-другому.

Перейдите в режим администратора:

```bash
su-
```

Обновите пакеты:

```bash
apt-get update
```

Установите `mono-devel`:

```bash
apt-get install mono-devel
```

Установите пакет с кодировкой 1251:

```bash
apt-get install mono-locale-extras
```

Установите стандартную тему GNOME:

```bash
apt-get install gnome-themes-standard
```

Если при запуске возникает ошибка, связанная с отсутствием папки:

```text
/etc/mono/registry/LocalMachine
```

создайте папки `registry` и `registry/LocalMachine` в `/etc/mono/` вручную либо выполните команды:

```bash
mkdir -p /home/user/PascalABCLinux/registry
mkdir -p /home/user/PascalABCLinux/registry/LocalMachine
export MONO_REGISTRY_PATH=/home/user/PascalABCLinux/registry
```

## Astra Linux

В Astra Linux установка пакета Mono выполняется по-другому.

Обновите пакеты:

```bash
sudo apt-get update
```

Установите `mono-complete`:

```bash
sudo apt-get install mono-complete
```

Установите стандартную тему GNOME:

```bash
sudo apt-get install gnome-themes-standard
```

Если при запуске возникает ошибка, связанная с отсутствием папки:

```text
/etc/mono/registry/LocalMachine
```

создайте папки `registry` и `registry/LocalMachine` в `/etc/mono/` вручную либо выполните команды:

```bash
mkdir -p /home/user/PascalABCLinux/registry
mkdir -p /home/user/PascalABCLinux/registry/LocalMachine
export MONO_REGISTRY_PATH=/home/user/PascalABCLinux/registry
```

[Вернуться к выбору версии](/install-linux).
