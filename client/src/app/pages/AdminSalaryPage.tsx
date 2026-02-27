import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { ArrowLeft, DollarSign, Clock, Users, Edit2, Save, X } from 'lucide-react';
import { apiGetEmployees, apiUpdateEmployee, ApiEmployee } from '@/app/services/api';

// Local Employee type for the page
interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'admin';
  hourlyRate: number;
  workingHours: number;
  totalSalary: number;
  joinedDate: Date;
}

// Convert API employee to local format
function toEmployee(apiEmp: ApiEmployee): Employee {
  return {
    id: String(apiEmp.id),
    name: apiEmp.user?.name || 'Unknown',
    email: apiEmp.user?.email || '',
    role: (apiEmp.user?.role || 'staff') as 'staff' | 'admin',
    hourlyRate: Number(apiEmp.hourly_rate),
    workingHours: Number(apiEmp.working_hours),
    totalSalary: Number(apiEmp.total_salary),
    joinedDate: new Date(apiEmp.joined_date),
  };
}

export const AdminSalaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Employee>>({});

  // Fetch employees from API
  useEffect(() => {
    apiGetEmployees()
      .then(data => setEmployees(data.map(toEmployee)))
      .catch(err => console.error('Failed to fetch employees:', err));
  }, []);

  const startEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setEditForm({
      hourlyRate: employee.hourlyRate,
      workingHours: employee.workingHours
    });
  };

  const saveEdit = async (id: string) => {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    const newHourlyRate = editForm.hourlyRate || employee.hourlyRate;
    const newWorkingHours = editForm.workingHours || employee.workingHours;
    const newTotalSalary = newHourlyRate * newWorkingHours;

    try {
      await apiUpdateEmployee(Number(id), {
        hourly_rate: newHourlyRate,
        working_hours: newWorkingHours,
        total_salary: newTotalSalary,
      });

      setEmployees(employees.map(emp => {
        if (emp.id === id) {
          return {
            ...emp,
            hourlyRate: newHourlyRate,
            workingHours: newWorkingHours,
            totalSalary: newTotalSalary,
          };
        }
        return emp;
      }));
    } catch (error) {
      console.error('Failed to update employee:', error);
    }

    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const totalPayroll = employees.reduce((sum, emp) => sum + emp.totalSalary, 0);
  const totalHours = employees.reduce((sum, emp) => sum + emp.workingHours, 0);
  const avgHourlyRate = totalHours > 0 ? totalPayroll / totalHours : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Salary Management</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Payroll</p>
                <p className="text-3xl font-bold text-gray-900">${totalPayroll.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                <p className="text-3xl font-bold text-gray-900">{totalHours}</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Hourly Rate</p>
                <p className="text-3xl font-bold text-gray-900">${avgHourlyRate.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">{employees.length} employees</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Salary Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Employee Salary Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hourly Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Working Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${employee.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                        }`}>
                        {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === employee.id ? (
                        <input
                          type="number"
                          value={editForm.hourlyRate}
                          onChange={(e) => setEditForm({ ...editForm, hourlyRate: parseFloat(e.target.value) })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        `$${employee.hourlyRate.toFixed(2)}/hr`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingId === employee.id ? (
                        <input
                          type="number"
                          value={editForm.workingHours}
                          onChange={(e) => setEditForm({ ...editForm, workingHours: parseFloat(e.target.value) })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        `${employee.workingHours} hrs`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${employee.totalSalary.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingId === employee.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(employee.id)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(employee)}
                          className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
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