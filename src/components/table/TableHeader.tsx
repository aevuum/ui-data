import type { ColumnConfig } from '../../types';

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  sort: { key: string | null; order: 'asc' | 'desc' | null };
  onSort: (key: string) => void;
}

const TableHeader = <T,>({ columns, sort, onSort }: TableHeaderProps<T>) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(column => (
          <th 
            key={column.key} 
            scope="col" 
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <div className="flex items-center">
              {column.label}
              {column.sortable && (
                <button 
                  onClick={() => onSort(column.key)}
                  className="ml-2 p-1 rounded hover:bg-gray-200 focus:outline-none"
                >
                  {sort.key === column.key ? (
                    sort.order === 'asc' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )
                  ) : (
                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </th>
        ))}
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Действия
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;