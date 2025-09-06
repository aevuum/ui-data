import type { ColumnConfig } from '../types';
import type { Product, PricePlan, Page } from '../types';

export const getProductColumns = (): ColumnConfig<Product>[] => [
  {
    key: 'name',
    label: 'Название',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'text'
  },
  {
    key: 'description',
    label: 'Описание',
    filterable: true,
    editable: true,
    inputType: 'textarea'
  },
  {
    key: 'price',
    label: 'Цена',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'number',
    render: (value) => `$${value.toFixed(2)}`
  },
  {
    key: 'category',
    label: 'Категория',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'select',
    options: ['Electronics', 'Clothing', 'Books', 'Home']
  },
  {
    key: 'inStock',
    label: 'В наличии',
    sortable: true,
    filterable: true,
    editable: (item) => item.inStock || window.confirm('Вы уверены, что хотите изменить статус?'),
    inputType: 'boolean'
  },
  {
    key: 'createdAt',
    label: 'Создан',
    sortable: true,
    filterable: true,
    render: (value) => new Date(value).toLocaleDateString(),
    inputType: 'date'
  },
  {
    key: 'options.size',
    label: 'Размер',
    filterable: true,
    render: (_, item) => item.options.size,
    path: 'options.size',
    editable: true,
    inputType: 'text'
  },
  {
    key: 'options.color',
    label: 'Цвет',
    filterable: true,
    render: (_, item) => item.options.color,
    path: 'options.color',
    editable: true,
    inputType: 'text'
  },
  {
    key: 'metadata.rating',
    label: 'Рейтинг',
    sortable: true,
    render: (_, item) => `${item.metadata.rating}/5`,
    path: 'metadata.rating',
    editable: true,
    inputType: 'number'
  }
];

export const getPricePlanColumns = (): ColumnConfig<PricePlan>[] => [
  {
    key: 'name',
    label: 'Название',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'text'
  },
  {
    key: 'description',
    label: 'Описание',
    filterable: true,
    editable: true,
    inputType: 'textarea'
  },
  {
    key: 'price',
    label: 'Цена',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'number',
    render: (value, item) => `${value} ${item.currency}`
  },
  {
    key: 'currency',
    label: 'Валюта',
    filterable: true,
    editable: true,
    inputType: 'select',
    options: ['USD', 'EUR', 'RUB']
  },
  {
    key: 'interval',
    label: 'Интервал',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'select',
    options: ['monthly', 'yearly', 'one-time']
  },
  {
    key: 'active',
    label: 'Активен',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'boolean'
  },
  {
    key: 'trialDays',
    label: 'Дней триала',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'number'
  },
  {
    key: 'limits.users',
    label: 'Пользователи',
    sortable: true,
    render: (_, item) => item.limits.users,
    path: 'limits.users',
    editable: true,
    inputType: 'number'
  },
  {
    key: 'limits.storage',
    label: 'Хранилище (ГБ)',
    sortable: true,
    render: (_, item) => item.limits.storage,
    path: 'limits.storage',
    editable: true,
    inputType: 'number'
  },
  {
    key: 'createdAt',
    label: 'Создан',
    sortable: true,
    filterable: true,
    render: (value) => new Date(value).toLocaleDateString(),
    inputType: 'date'
  }
];

export const getPageColumns = (): ColumnConfig<Page>[] => [
  {
    key: 'title',
    label: 'Заголовок',
    sortable: true,
    filterable: true,
    editable: (item) => item.status !== 'archived',
    inputType: 'text'
  },
  {
    key: 'slug',
    label: 'Slug',
    filterable: true,
    editable: (item) => item.status !== 'published',
    inputType: 'text'
  },
  {
    key: 'status',
    label: 'Статус',
    sortable: true,
    filterable: true,
    editable: true,
    inputType: 'select',
    options: ['draft', 'published', 'archived']
  },
  {
    key: 'publishedAt',
    label: 'Опубликован',
    sortable: true,
    filterable: true,
    render: (value) => value ? new Date(value).toLocaleDateString() : 'Не опубликовано',
    inputType: 'date'
  },
  {
    key: 'author',
    label: 'Автор',
    filterable: true,
    editable: true,
    inputType: 'text'
  },
  {
    key: 'meta.description',
    label: 'Мета описание',
    filterable: true,
    render: (_, item) => item.meta.description,
    path: 'meta.description',
    editable: true,
    inputType: 'textarea'
  },
  {
    key: 'settings.isProtected',
    label: 'Защищено',
    sortable: true,
    filterable: true,
    render: (_, item) => item.settings.isProtected ? 'Да' : 'Нет',
    path: 'settings.isProtected',
    editable: true,
    inputType: 'boolean'
  },
  {
    key: 'settings.showInMenu',
    label: 'В меню',
    sortable: true,
    filterable: true,
    render: (_, item) => item.settings.showInMenu ? 'Да' : 'Нет',
    path: 'settings.showInMenu',
    editable: true,
    inputType: 'boolean'
  },
  {
    key: 'createdAt',
    label: 'Создан',
    sortable: true,
    filterable: true,
    render: (value) => new Date(value).toLocaleDateString(),
    inputType: 'date'
  }
];

export const getColumnConfig = <T extends Product | PricePlan | Page>(type: string): ColumnConfig<T>[] => {
  switch (type) {
    case 'products':
      return getProductColumns() as ColumnConfig<T>[];
    case 'price-plans':
      return getPricePlanColumns() as ColumnConfig<T>[];
    case 'pages':
      return getPageColumns() as ColumnConfig<T>[];
    default:
      return [];
  }
};