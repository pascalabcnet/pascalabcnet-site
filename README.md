# PascalABC.NET — статический сайт

## Команды

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

Production-файлы создаются в `dist/` и не требуют Node.js на сервере.

## Редактирование

- Главное меню: `src/data/navigation.ts`.
- Внешние URL: `src/data/external-links.ts`.
- Обычная страница: новый Markdown-файл в `src/content/pages/` с `title` и `description`.
- Новость: новый `src/content/news/YYYY-MM-DD-slug.md` с `title`, `date`, `description`, `externalUrl` (необязательно) и `draft`.
- Конференция или олимпиада: Markdown-файл года в соответствующей коллекции.
- Пример: `.pas` в `src/examples/`, затем импорт и подпись в `src/components/ProgramTabs.astro`.

Неизвестные данные намеренно отмечены `TODO`. Не заменяйте их фиктивными ссылками.
