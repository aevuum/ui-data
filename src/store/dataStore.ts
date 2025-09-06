import { create } from 'zustand';
import type { Product, PricePlan, Page, EntityType } from '../types';

import productsData from '../mocks/products.json';
import pricePlansData from '../mocks/price-plans.json';
import pagesData from '../mocks/pages.json';

interface DataStore {
  products: Product[];
  pricePlans: PricePlan[];
  pages: Page[];
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updatePricePlan: (id: string, updates: Partial<PricePlan>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  getDataByType: (type: EntityType) => any[];
  updateData: (type: EntityType, id: string, updates: any) => void;
}

export const useDataStore = create<DataStore>((set, get) => ({
  products: productsData as Product[],
  pricePlans: pricePlansData as PricePlan[],
  pages: pagesData as Page[],
  
  updateProduct: (id, updates) => set(state => ({
    products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  
  updatePricePlan: (id, updates) => set(state => ({
    pricePlans: state.pricePlans.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  
  updatePage: (id, updates) => set(state => ({
    pages: state.pages.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  
  getDataByType: (type) => {
    switch (type) {
      case 'products': return get().products;
      case 'price-plans': return get().pricePlans;
      case 'pages': return get().pages;
      default: return [];
    }
  },
  
  updateData: (type, id, updates) => {
    switch (type) {
      case 'products':
        get().updateProduct(id, updates as Partial<Product>);
        break;
      case 'price-plans':
        get().updatePricePlan(id, updates as Partial<PricePlan>);
        break;
      case 'pages':
        get().updatePage(id, updates as Partial<Page>);
        break;
    }
}
}));