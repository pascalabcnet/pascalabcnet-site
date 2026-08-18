import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().optional()
  })
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    externalUrl: z.string().url().optional(),
    draft: z.boolean().default(false)
  })
});

const conferenceSchema = z.object({
  title: z.string(),
  year: z.number().int(),
  ordinal: z.string(),
  date: z.string(),
  format: z.string(),
  location: z.string().optional(),
  description: z.string(),
  attendance: z.string().optional(),
  featured: z.boolean().default(false),
  programUrl: z.string().optional(),
  infoLetterUrl: z.string().optional(),
  archiveNote: z.string().optional(),
  videos: z.array(z.object({
    label: z.string(),
    platform: z.string(),
    url: z.string().url()
  })).default([]),
  presentations: z.array(z.object({
    author: z.string(),
    title: z.string(),
    files: z.array(z.object({
      label: z.string(),
      file: z.string()
    }))
  })).default([]),
  draft: z.boolean().default(false)
});

const conferences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conferences' }),
  schema: conferenceSchema
});

const olympiadSchema = z.object({
  title: z.string(),
  year: z.number().int(),
  ordinal: z.string(),
  date: z.string(),
  format: z.string(),
  grades: z.string(),
  description: z.string(),
  taskCount: z.number().int(),
  levels: z.array(z.string()).default([]),
  conditionsUrl: z.string(),
  solutionsUrl: z.string(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

const olympiads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/olympiads' }),
  schema: olympiadSchema
});

const examples = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/examples' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    order: z.number().int(),
    group: z.string(),
    draft: z.boolean().default(false)
  })
});

export const collections = { pages, news, conferences, olympiads, examples };
