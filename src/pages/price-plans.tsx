import { useDataStore } from '../store/dataStore';
import Table from '../components/table/Table';
import { getColumnConfig } from '../utils/fieldConfig';

const PricePlansPage = () => {
  const pricePlans = useDataStore(state => state.pricePlans);
  const columns = getColumnConfig('price-plans');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Ценовые планы</h1>
      <Table data={pricePlans} columns={columns} entityType="price-plans" />
    </div>
  );
};

export default PricePlansPage;