import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/products';
import PricePlansPage from './pages/price-plans';
import PagesPage from './pages/products';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">Data Manager</h1>
                </div>
                <div className="ml-10 flex space-x-4">
                  <Link 
                    to="/products" 
                    className="px-3 py-6 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Продукты
                  </Link>
                  <Link 
                    to="/price-plans" 
                    className="px-3 py-6 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Ценовые планы
                  </Link>
                  <Link 
                    to="/pages" 
                    className="px-3 py-6 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Страницы
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/price-plans" element={<PricePlansPage />} />
            <Route path="/pages" element={<PagesPage />} />
            <Route path="/" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;