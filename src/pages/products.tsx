import { useDataStore } from '../store/dataStore';
import Table from '../components/table/Table';
import { getColumnConfig } from '../utils/fieldConfig';

const ProductsPage = () => {
  const products = useDataStore(state => state.products);
  const columns = getColumnConfig('products');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Продукты</h1>
      <Table data={products} columns={columns} entityType="products" />
    </div>
  );
};

export default ProductsPage;