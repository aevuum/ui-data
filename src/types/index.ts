export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
  tags: string[];
  options: {
    size: string;
    color: string;
    weight: number;
  };
  metadata: {
    views: number;
    rating: number;
  };
};

export type PricePlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  trialDays: number;
  limits: {
    users: number;
    storage: number;
    bandwidth: number;
  };
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: string;
  meta: {
    description: string;
    keywords: string[];
    ogImage: string;
  };
  settings: {
    template: string;
    isProtected: boolean;
    showInMenu: boolean;
  };
};

export type Entity = Product | PricePlan | Page;

export type EntityType = 'products' | 'price-plans' | 'pages';

export interface ColumnConfig<T> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  editable?: boolean | ((item: T) => boolean);
  inputType?: 'text' | 'number' | 'boolean' | 'date' | 'select' | 'textarea';
  options?: string[];
  path?: string;
}