import { useState, useCallback } from 'react';

export type SortOrder = 'asc' | 'desc' | null;

export interface SortState {
  key: string | null;
  order: SortOrder;
}

export const useSort = <T,>(data: T[], initialSort: SortState = { key: null, order: null }) => {
  const [sort, setSort] = useState<SortState>(initialSort);

  const handleSort = useCallback((key: string) => {
    setSort(prev => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const sortedData = data.sort((a, b) => {
    if (!sort.key) return 0;
    
    const aValue = getNestedValue(a, sort.key);
    const bValue = getNestedValue(b, sort.key);
    
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sort.order === 'asc' ? -1 : 1;
    if (bValue == null) return sort.order === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.order === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.order === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return sort.order === 'asc' 
        ? aValue.getTime() - bValue.getTime() 
        : bValue.getTime() - aValue.getTime();
    }
    
    const aString = String(aValue);
    const bString = String(bValue);
    return sort.order === 'asc' 
      ? aString.localeCompare(bString) 
      : bString.localeCompare(aString);
  });

  return {
    sortedData,
    sort,
    handleSort
  };
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] ?? null;
  }, obj);
};