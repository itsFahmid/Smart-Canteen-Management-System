import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/app/contexts/AppContext';
import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';

export const MenuManagementPage: React.FC = () => {
  const { menuItems, updateMenuItem, deleteMenuItem } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: 0,
    category: 'snacks' as 'snacks' | 'meals' | 'drinks',
    stockQuantity: 0,
    inStock: true
  });
  const navigate = useNavigate();

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: typeof menuItems[0]) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      price: item.price,
      category: item.category,
      stockQuantity: item.stockQuantity,
      inStock: item.inStock
    });
  };

  const handleSave = () => {
    if (editingId) {
      updateMenuItem(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Menu Management</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium">
            <Plus className="w-5 h-5" />
            Add New Item
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Menu Items Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {editingId === item.id ? (
                      <>
                        <td className="px-6 py-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="snacks">Snacks</option>
                            <option value="meals">Meals</option>
                            <option value="drinks">Drinks</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                            step="0.01"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.stockQuantity}
                            onChange={(e) => setEditForm({ ...editForm, stockQuantity: parseInt(e.target.value) })}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={editForm.inStock}
                              onChange={(e) => setEditForm({ ...editForm, inStock: e.target.checked })}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">In Stock</span>
                          </label>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleSave}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`font-medium ${item.stockQuantity < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.stockQuantity}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.inStock ? 'Available' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
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