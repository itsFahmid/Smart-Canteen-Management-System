<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     * Admin/Staff see all orders; customers see only their own.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'customer') {
            $orders = Order::where('customer_id', $user->id)
                ->with('items.menuItem')
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $orders = Order::with('items.menuItem')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($orders);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:cash,card,online',
            'special_notes' => 'nullable|string',
            'table_number' => 'nullable|integer',
        ]);

        $user = $request->user();

        // Calculate total amount
        $totalAmount = 0;
        $orderItemsData = [];

        foreach ($request->items as $item) {
            $menuItem = MenuItem::findOrFail($item['menu_item_id']);
            $itemTotal = $menuItem->price * $item['quantity'];
            $totalAmount += $itemTotal;

            $orderItemsData[] = [
                'menu_item_id' => $menuItem->id,
                'quantity' => $item['quantity'],
                'price' => $menuItem->price,
            ];
        }

        // Create the order
        $order = Order::create([
            'customer_id' => $user->id,
            'customer_name' => $user->name,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'payment_method' => $request->payment_method,
            'special_notes' => $request->special_notes,
            'table_number' => $request->table_number,
            'estimated_time' => 25,
            'assigned_staff' => null,
        ]);

        // Create order items
        foreach ($orderItemsData as $itemData) {
            $order->items()->create($itemData);
        }

        $order->load('items.menuItem');

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
        ], 201);
    }

    /**
     * Display a single order.
     */
    public function show($id)
    {
        $order = Order::with('items.menuItem')->findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the status of an order (staff/admin only).
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,preparing,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;

        if ($request->status === 'completed') {
            $order->estimated_time = 0;
        }

        $order->save();

        $order->load('items.menuItem');

        return response()->json([
            'message' => 'Order status updated successfully',
            'data' => $order,
        ]);
    }
}
