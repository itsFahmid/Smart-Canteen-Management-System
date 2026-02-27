<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\MenuItem;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics for admin panel.
     */
    public function stats()
    {
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $completedOrders = Order::where('status', 'completed')->count();
        $totalRevenue = Order::where('status', 'completed')->sum('total_amount');
        $totalMenuItems = MenuItem::count();
        $outOfStockItems = MenuItem::where('in_stock', false)->count();
        $totalCustomers = User::where('role', 'customer')->count();
        $totalEmployees = Employee::count();

        return response()->json([
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'completed_orders' => $completedOrders,
            'total_revenue' => round($totalRevenue, 2),
            'total_menu_items' => $totalMenuItems,
            'out_of_stock_items' => $outOfStockItems,
            'total_customers' => $totalCustomers,
            'total_employees' => $totalEmployees,
        ]);
    }
}
