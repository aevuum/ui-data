import type { ColumnConfig, Entity } from '../../types';

interface TableRowProps<T> {
  item: T;
  columns: ColumnConfig<T>[];
  onEdit: () => void;
}

const TableRow = <T extends Entity>({ item, columns, onEdit }: TableRowProps<T>) => {
  return (
    <tr className="hover:bg-gray-50">
      {columns.map(column => {
        const value = column.path 
          ? getNestedValue(item, column.path) 
          : (item as any)[column.key];
        
        let displayValue = value;
        
        if (column.render) {
          displayValue = column.render(value, item);
        } else if (value == null) {
          displayValue = '-';
        } else if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
          displayValue = JSON.stringify(value);
        }
        
        return (
          <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {displayValue}
          </td>
        );
      })}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={onEdit}
          className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] ?? null;
  }, obj);
};

export default TableRow;