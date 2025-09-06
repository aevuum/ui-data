import React, { useState, useMemo } from 'react';
import { useDataStore } from '../../store/dataStore';
import type { ColumnConfig, Entity } from '../../types';

interface EditFormProps<T> {
  item: T;
  columns: ColumnConfig<T>[];
  entityType: string;
  onClose: () => void;
}

const EditForm = <T extends Entity>({ item, columns, entityType, onClose }: EditFormProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({ ...item });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const updateData = useDataStore(state => state.updateData);
  
  const editableColumns = useMemo(() => {
    return columns.filter(column => {
      if (typeof column.editable === 'function') {
        return column.editable(item);
      }
      return column.editable !== false;
    });
  }, [columns, item]);

  const handleChange = (key: string, value: any) => {
    if (key.includes('.')) {
      const pathParts = key.split('.');      
      setFormData(prev => {
        const newFormData = { ...prev };
        let current = newFormData as any;
        
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {};
          }
          current = current[pathParts[i]];
        }
        
        current[pathParts[pathParts.length - 1]] = value;
        return newFormData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    editableColumns.forEach(column => {
      const value = column.path 
        ? getNestedValue(formData, column.path) 
        : (formData as any)[column.key];
      
      if (column.inputType === 'number' && value !== undefined && value !== null && isNaN(Number(value))) {
        newErrors[column.key] = 'Введите корректное число';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    updateData(entityType as any, item.id, formData);
    onClose();
  };

  const getFieldValue = (key: string): any => {
    return key.includes('.') 
      ? getNestedValue(formData, key) 
      : (formData as any)[key];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Редактировать {entityType}</h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {editableColumns.map(column => {
            const value = getFieldValue(column.path || column.key);
            const error = errors[column.key];
            
            return (
              <div key={column.key} className="space-y-1">
                <label htmlFor={column.key} className="block text-sm font-medium text-gray-700">
                  {column.label}
                </label>
                
                {column.inputType === 'text' && (
                  <input
                    type="text"
                    id={column.key}
                    value={value || ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
                
                {column.inputType === 'textarea' && (
                  <textarea
                    id={column.key}
                    value={value || ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
                
                {column.inputType === 'number' && (
                  <input
                    type="number"
                    id={column.key}
                    value={value || value === 0 ? value : ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value === '' ? '' : Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
                
                {column.inputType === 'boolean' && (
                  <select
                    id={column.key}
                    value={value !== undefined ? String(value) : ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Выберите...</option>
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                  </select>
                )}
                
                {column.inputType === 'date' && (
                  <input
                    type="date"
                    id={column.key}
                    value={value ? new Date(value).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                )}
                
                {column.inputType === 'select' && column.options && (
                  <select
                    id={column.key}
                    value={value || ''}
                    onChange={(e) => handleChange(column.path || column.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Выберите...</option>
                    {column.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current?.[key] ?? null;
  }, obj);
};

export default EditForm;