<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    /**
     * Display a listing of all menu items.
     */
    public function index()
    {
        $menuItems = MenuItem::all();
        return response()->json($menuItems);
    }

    /**
     * Display a single menu item.
     */
    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return response()->json($menuItem);
    }

    /**
     * Store a newly created menu item.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|in:snacks,meals,drinks',
            'image' => 'nullable|string|max:500',
            'in_stock' => 'boolean',
            'stock_quantity' => 'integer|min:0',
        ]);

        $menuItem = MenuItem::create($request->all());

        return response()->json([
            'message' => 'Menu item created successfully',
            'data' => $menuItem,
        ], 201);
    }

    /**
     * Update the specified menu item.
     */
    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'category' => 'sometimes|in:snacks,meals,drinks',
            'image' => 'nullable|string|max:500',
            'in_stock' => 'boolean',
            'stock_quantity' => 'integer|min:0',
        ]);

        $menuItem->update($request->all());

        return response()->json([
            'message' => 'Menu item updated successfully',
            'data' => $menuItem,
        ]);
    }

    /**
     * Remove the specified menu item.
     */
    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return response()->json([
            'message' => 'Menu item deleted successfully',
        ]);
    }
}
