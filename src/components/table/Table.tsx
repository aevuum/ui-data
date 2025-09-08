import { useMemo } from 'react';
import { useSort } from '../../hooks/useSort';
import { useFilter } from '../../hooks/useFilter';
import { useModal } from '../../hooks/useModal';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import type { ColumnConfig, Entity } from '../../types';
import Filter from '../filter/Filter';
import Modal from '../modal/Modal';
import EditForm from '../form/EditForm';

interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  entityType: string;
}

const Table = <T extends Entity>({ data, columns, entityType }: TableProps<T>) => {
  const { sortedData, sort, handleSort } = useSort(data);
  const { filteredData, filterState, handleTextFilterChange, handleBooleanFilterChange, handleDateRangeChange } = useFilter(sortedData, columns);
  const { modalData, openModal, closeModal } = useModal();

  // Get boolean filterable columns
  const booleanColumns = useMemo(() => 
    columns.filter(col => col.inputType === 'boolean' && col.filterable)
      .map(col => ({ key: col.path || col.key, label: col.label })),
    [columns]
  );

  // Get date filterable columns
  const dateColumns = useMemo(() => 
    columns.filter(col => (col.inputType === 'date' || col.key.includes('At') || col.key.includes('Date')) && col.filterable)
      .map(col => ({ key: col.path || col.key, label: col.label })),
    [columns]
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <Filter 
          textFilter={filterState.text}
          onTextFilterChange={handleTextFilterChange}
          booleanFilters={filterState.booleanFilters}
          onBooleanFilterChange={handleBooleanFilterChange}
          dateRangeFilters={filterState.dateRange}
          onDateRangeChange={handleDateRangeChange}
          booleanColumns={booleanColumns}
          dateColumns={dateColumns}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            columns={columns} 
            sort={sort} 
            onSort={handleSort} 
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <TableRow 
                key={item.id || index} 
                item={item} 
                columns={columns} 
                onEdit={() => openModal(item, entityType)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredData.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          Нет данных, соответствующих фильтрам
        </div>
      )}
      
      <Modal isOpen={modalData.isOpen} onClose={closeModal}>
        {modalData.item && modalData.type && (
          <EditForm 
            item={modalData.item} 
            columns={columns} 
            entityType={modalData.type} 
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default Table;