import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/app/contexts/AppContext';
import { ArrowLeft, AlertTriangle, Package, TrendingUp } from 'lucide-react';

export const InventoryManagementPage: React.FC = () => {
  const { menuItems, updateMenuItem } = useApp();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState(0);
  const navigate = useNavigate();

  const handleUpdateStock = (itemId: string) => {
    if (newStock >= 0) {
      updateMenuItem(itemId, { 
        stockQuantity: newStock,
        inStock: newStock > 0
      });
      setUpdatingId(null);
      setNewStock(0);
    }
  };

  const lowStockItems = menuItems.filter(item => item.stockQuantity < 10);
  const outOfStockItems = menuItems.filter(item => !item.inStock);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Total Items</span>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{menuItems.length}</p>
            <p className="text-sm text-gray-600 mt-1">In catalog</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Low Stock</span>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{lowStockItems.length}</p>
            <p className="text-sm text-orange-600 mt-1">Need attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Out of Stock</span>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{outOfStockItems.length}</p>
            <p className="text-sm text-red-600 mt-1">Restock required</p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-orange-800 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Low Stock Warning</span>
            </div>
            <p className="text-sm text-orange-700">
              {lowStockItems.length} item(s) are running low on stock (less than 10 units)
            </p>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Stock Levels</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Item Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {menuItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-lg font-bold ${
                        item.stockQuantity === 0 ? 'text-red-600' :
                        item.stockQuantity < 10 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {item.stockQuantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.stockQuantity === 0 ? (
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Out of Stock</span>
                        </div>
                      ) : item.stockQuantity < 10 ? (
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">Low Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm font-medium">In Stock</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {updatingId === item.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <input
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Qty"
                            min="0"
                          />
                          <button
                            onClick={() => handleUpdateStock(item.id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => {
                              setUpdatingId(null);
                              setNewStock(0);
                            }}
                            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setUpdatingId(item.id);
                              setNewStock(item.stockQuantity);
                            }}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                          >
                            Update Stock
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};