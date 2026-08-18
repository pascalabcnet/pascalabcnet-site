# PascalABC.NET website

Official website of PascalABC.NET — a modern general-purpose programming language and development environment for the .NET platform.

Website: [https://pascalabc.net](https://pascalabc.net)

## Local development

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Additional commands:

```bash
npm run check
npm run build
npm run preview
```

The production build is generated in `dist/`.

The contents of `dist/` are fully static and do not require Node.js on the web server.

## Project structure

* `src/data/navigation.ts` — main navigation.
* `src/data/external-links.ts` — external URLs.
* `src/content/pages/` — regular site pages.
* `src/content/news/` — news.
* `src/examples/` — PascalABC.NET source-code examples.
* `public/` — static files copied to the site without processing.

## Adding content

### Page

Create a Markdown file in:

```text
src/content/pages/
```

Specify at least:

```yaml
title:
description:
```

### News item

Create a file:

```text
src/content/news/YYYY-MM-DD-slug.md
```

Available fields:

```yaml
title:
date:
description:
externalUrl:
draft:
```

`externalUrl` is optional.

### Conferences and olympiads

Add a Markdown file for the corresponding year to the appropriate content collection.

### Program examples

Add the `.pas` file to:

```text
src/examples/
```

Then import it and add its caption in:

```text
src/components/ProgramTabs.astro
```
