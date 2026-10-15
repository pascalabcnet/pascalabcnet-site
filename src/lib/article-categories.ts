export const articleCategories = [
  { label: 'Язык', labelEn: 'Language', slug: 'language' },
  { label: 'Алгоритмы', labelEn: 'Algorithms', slug: 'algorithms' },
  { label: '.NET и библиотеки', labelEn: '.NET and Libraries', slug: 'dotnet' },
  { label: 'Графика', labelEn: 'Graphics', slug: 'graphics' },
  { label: 'ML и данные', labelEn: 'ML and Data', slug: 'ml' },
  { label: 'Обучение', labelEn: 'Education', slug: 'education' },
  { label: 'Инструменты', labelEn: 'Tools', slug: 'tools' },
  { label: 'Производительность', labelEn: 'Performance', slug: 'performance' },
];

export const publishedCategories = (items: { data: { category: string } }[], locale: 'ru' | 'en' = 'ru') =>
  articleCategories.map(category => ({ ...category, label: locale === 'en' ? category.labelEn : category.label }))
    .filter(category => items.some(item => item.data.category === category.label));
