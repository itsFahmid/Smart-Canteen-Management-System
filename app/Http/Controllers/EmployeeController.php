<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees with their user info.
     */
    public function index()
    {
        $employees = Employee::with('user')->get();
        return response()->json($employees);
    }

    /**
     * Display a single employee.
     */
    public function show($id)
    {
        $employee = Employee::with('user')->findOrFail($id);
        return response()->json($employee);
    }

    /**
     * Update an employee's salary/hours info.
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);

        $request->validate([
            'hourly_rate' => 'sometimes|numeric|min:0',
            'working_hours' => 'sometimes|integer|min:0',
            'total_salary' => 'sometimes|numeric|min:0',
        ]);

        $employee->update($request->only([
            'hourly_rate',
            'working_hours',
            'total_salary',
        ]));

        $employee->load('user');

        return response()->json([
            'message' => 'Employee updated successfully',
            'data' => $employee,
        ]);
    }
}
