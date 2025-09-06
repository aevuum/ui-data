import React, { useState } from 'react';

interface FilterProps {
  textFilter: string;
  onTextFilterChange: (value: string) => void;
  booleanFilters: Record<string, boolean | null>;
  onBooleanFilterChange: (key: string, value: boolean | null) => void;
  dateRangeFilters: Record<string, { from: string | null; to: string | null }>;
  onDateRangeChange: (key: string, from: string | null, to: string | null) => void;
  booleanColumns: { key: string; label: string }[];
  dateColumns: { key: string; label: string }[];
}

const Filter: React.FC<FilterProps> = ({
  textFilter,
  onTextFilterChange,
  booleanFilters,
  onBooleanFilterChange,
  dateRangeFilters,
  onDateRangeChange,
  booleanColumns,
  dateColumns
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-grow min-w-[200px]">
          <label htmlFor="textFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Поиск
          </label>
          <input
            type="text"
            id="textFilter"
            value={textFilter}
            onChange={(e) => onTextFilterChange(e.target.value)}
            placeholder="Введите для поиска..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {booleanColumns.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showAdvanced ? 'Скрыть фильтры' : 'Доп. фильтры'}
            </button>
          </div>
        )}
      </div>
      
      {showAdvanced && (
        <div className="pt-4 border-t border-gray-200 space-y-4">
          {booleanColumns.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Фильтр по статусу</h3>
              <div className="flex flex-wrap gap-4">
                {booleanColumns.map(column => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">{column.label}:</label>
                    <select
                      value={booleanFilters[column.key] === null ? '' : String(booleanFilters[column.key])}
                      onChange={(e) => {
                        const val = e.target.value;
                        onBooleanFilterChange(
                          column.key, 
                          val === '' ? null : val === 'true'
                        );
                      }}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Любой</option>
                      <option value="true">Да</option>
                      <option value="false">Нет</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {dateColumns.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Фильтр по дате</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dateColumns.map(column => (
                  <div key={column.key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {column.label}
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={dateRangeFilters[column.key]?.from || ''}
                        onChange={(e) => {
                          onDateRangeChange(
                            column.key,
                            e.target.value || null,
                            dateRangeFilters[column.key]?.to || null
                          );
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        placeholder="От"
                      />
                      <input
                        type="date"
                        value={dateRangeFilters[column.key]?.to || ''}
                        onChange={(e) => {
                          onDateRangeChange(
                            column.key,
                            dateRangeFilters[column.key]?.from || null,
                            e.target.value || null
                          );
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        placeholder="До"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Filter;