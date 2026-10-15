---
topicId: file-types
locale: ru
title: "Файловые типы"
description: "Файловые типы. Руководство по языку PascalABC.NET."
keywords:
  - file
  - of
  - text
---

Файл представляет собой последовательность элементов одного типа, хранящихся на диске. В **PascalABC.NET** имеется два типа файлов - *двоичные* и *текстовые*. Текстовые файлы хранят символы, разделенные на строки символами #13#10 (Windows) и символом #10 (Linux). Последовательность символов для перехода на новую строку хранится в константе NewLine. Двоичные файлы в свою очередь делятся на типизированные и бестиповые.

Для описания текстового файла используется стандартное имя типа `text`, бестиповые файлы имеют тип `file`, а для описания типизированного файла используется конструкция `file of``тип элементов`:

```pascalabc
var
   f1: file of real;
   f2: text;
   f3: file;
```

В качества типа элементов в типизированном файле не могут фигурировать указатели, ссылочные типы, а также тип записи, содержащий ссылочные поля или указатели.

Стандартные файловые процедуры и функции описываются в пунктах

- [Подпрограммы ввода](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Read%20subroutines.html)
- [Подпрограммы вывода](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Write%20subroutines.html)
- [Общие подпрограммы для работы с файлами](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Common%20subroutines%20for%20files.html)
- [Подпрограммы для работы с текстовыми файлами](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Subroutines%20for%20text%20files.html)
- [Подпрограммы для работы с двоичными файлами](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Subroutines%20for%20binary%20files.html)
- [Подпрограммы для работы с именами файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Functions%20for%20file%20names.html)
- [Общие методы файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/stand_common_files_methods.html)
- [Методы текстовых файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/stand_text_files_methods.html)
- [Методы типизированных файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/stand_typed_files_methods.html)
- [Методы двоичных файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/stand_binary_files_methods.html)
- [Методы расширения типизированных файлов](https://pascalabc.net/downloads/pabcnethelp/LangGuide/PABCSystemUnit/Files/Extension%20methods%20for%20typed%20files.html)

Кроме того, в.NET имеется ряд классов, связанных с работой с файлами. Они находятся в пространствах имен System.Text и System.IO.
