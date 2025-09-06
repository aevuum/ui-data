import { useState, useCallback, useMemo } from 'react';

export interface FilterState {
  text: string;
  booleanFilters: Record<string, boolean | null>;
  dateRange: Record<string, { from: string | null; to: string | null }>;
}

export const useFilter = <T,>(data: T[], columns: any[]) => {
  const [filterState, setFilterState] = useState<FilterState>({
    text: '',
    booleanFilters: {},
    dateRange: {}
  });

  const handleTextFilterChange = useCallback((value: string) => {
    setFilterState(prev => ({ ...prev, text: value }));
  }, []);

  const handleBooleanFilterChange = useCallback((key: string, value: boolean | null) => {
    setFilterState(prev => ({
      ...prev,
      booleanFilters: { ...prev.booleanFilters, [key]: value }
    }));
  }, []);

  const handleDateRangeChange = useCallback((key: string, from: string | null, to: string | null) => {
    setFilterState(prev => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: { from, to } }
    }));
  }, []);

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter(item => {
      if (filterState.text) {
        const searchText = filterState.text.toLowerCase();
        const matchesText = columns.some(column => {
          if (!column.filterable) return false;
          
          const value = column.path 
            ? getNestedValue(item, column.path) 
            : (item as any)[column.key];
          
          if (value == null) return false;
          switch (typeof value) {
            case 'string':
              return value.toLowerCase().includes(searchText);
            case 'number':
              return value.toString().includes(searchText);
            default:
              if (Array.isArray(value)) {
                return value.some(v => String(v).toLowerCase().includes(searchText));
              }
              return String(value).toLowerCase().includes(searchText);
          }
        });
        
        if (!matchesText) return false;
      }
      
      for (const [key, filterValue] of Object.entries(filterState.booleanFilters)) {
        if (filterValue === null) continue;
        
        const itemValue = getNestedValue(item, key);
        if (itemValue !== filterValue) return false;
      }
      
      for (const [key, range] of Object.entries(filterState.dateRange)) {
        if (!range.from && !range.to) continue;
        
        const itemValue = getNestedValue(item, key);
        if (!itemValue) continue;
        
        const itemDate = new Date(itemValue).getTime();
        
        if (
          (range.from && itemDate < new Date(range.from).getTime()) ||
          (range.to && itemDate > new Date(range.to).getTime())
        ) {
          return false;
        }
      }
      
      return true;
    });
  }, [data, filterState, columns]);

  return {
    filteredData,
    filterState,
    handleTextFilterChange,
    handleBooleanFilterChange,
    handleDateRangeChange
  };
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] ?? null;
  }, obj);
};