import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import {
  apiGetMenuItems,
  apiCreateMenuItem,
  apiUpdateMenuItem,
  apiDeleteMenuItem,
  apiGetOrders,
  apiCreateOrder,
  apiUpdateOrderStatus,
  ApiMenuItem,
  ApiOrder,
} from '@/app/services/api';

// Re-export types for backward compatibility with the rest of the app
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'snacks' | 'meals' | 'drinks';
  image: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  createdAt: Date;
  estimatedTime: number;
  paymentMethod: 'cash' | 'card' | 'online';
  specialNotes?: string;
  tableNumber?: number;
  assignedStaff?: string;
}

// Convert API menu item to app format (camelCase, id as string)
function toAppMenuItem(item: ApiMenuItem): MenuItem {
  return {
    id: String(item.id),
    name: item.name,
    description: item.description || '',
    price: Number(item.price),
    category: item.category,
    image: item.image || '',
    inStock: Boolean(item.in_stock),
    stockQuantity: Number(item.stock_quantity),
  };
}

// Convert API order to app format
function toAppOrder(order: ApiOrder): Order {
  return {
    id: String(order.id),
    customerId: String(order.customer_id),
    customerName: order.customer_name,
    items: (order.items || []).map(item => ({
      id: String(item.menu_item_id),
      name: item.menu_item?.name || 'Unknown Item',
      description: item.menu_item?.description || '',
      price: Number(item.price),
      category: (item.menu_item?.category || 'meals') as 'snacks' | 'meals' | 'drinks',
      image: item.menu_item?.image || '',
      inStock: true,
      stockQuantity: 0,
      quantity: item.quantity,
    })),
    totalAmount: Number(order.total_amount),
    status: order.status,
    createdAt: new Date(order.created_at || Date.now()),
    estimatedTime: order.estimated_time || 0,
    paymentMethod: order.payment_method,
    specialNotes: order.special_notes,
    tableNumber: order.table_number,
    assignedStaff: order.assigned_staff,
  };
}

interface AppContextType {
  // Cart (kept client-side)
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Orders (from API)
  orders: Order[];
  createOrder: (paymentMethod: 'cash' | 'card' | 'online', specialNotes?: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  refreshOrders: () => void;

  // Menu Items (from API)
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  refreshMenuItems: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch menu items from API on mount
  const refreshMenuItems = useCallback(() => {
    apiGetMenuItems()
      .then(items => setMenuItems(items.map(toAppMenuItem)))
      .catch(err => console.error('Failed to fetch menu items:', err));
  }, []);

  useEffect(() => {
    refreshMenuItems();
  }, [refreshMenuItems]);

  // Fetch orders from API on mount
  const refreshOrders = useCallback(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    apiGetOrders()
      .then(apiOrders => setOrders(apiOrders.map(toAppOrder)))
      .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  useEffect(() => {
    refreshOrders();
    // Refresh orders periodically instead of simulating status changes
    const interval = setInterval(refreshOrders, 10000);
    return () => clearInterval(interval);
  }, [refreshOrders]);

  // Cart functions (remain client-side)
  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Create order via API
  const createOrder = async (paymentMethod: 'cash' | 'card' | 'online', specialNotes?: string) => {
    try {
      const orderItems = cart.map(item => ({
        menu_item_id: Number(item.id),
        quantity: item.quantity,
      }));

      await apiCreateOrder({
        items: orderItems,
        payment_method: paymentMethod,
        special_notes: specialNotes,
      });

      clearCart();
      refreshOrders();
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  // Update order status via API
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await apiUpdateOrderStatus(Number(orderId), status);
      refreshOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // Menu item management via API
  const updateMenuItem = async (id: string, updates: Partial<MenuItem>) => {
    try {
      const apiUpdates: Record<string, unknown> = {};
      if (updates.name !== undefined) apiUpdates.name = updates.name;
      if (updates.description !== undefined) apiUpdates.description = updates.description;
      if (updates.price !== undefined) apiUpdates.price = updates.price;
      if (updates.category !== undefined) apiUpdates.category = updates.category;
      if (updates.image !== undefined) apiUpdates.image = updates.image;
      if (updates.inStock !== undefined) apiUpdates.in_stock = updates.inStock;
      if (updates.stockQuantity !== undefined) apiUpdates.stock_quantity = updates.stockQuantity;

      await apiUpdateMenuItem(Number(id), apiUpdates);
      refreshMenuItems();
    } catch (error) {
      console.error('Failed to update menu item:', error);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      await apiCreateMenuItem({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        in_stock: item.inStock,
        stock_quantity: item.stockQuantity,
      });
      refreshMenuItems();
    } catch (error) {
      console.error('Failed to add menu item:', error);
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      await apiDeleteMenuItem(Number(id));
      refreshMenuItems();
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        refreshOrders,
        menuItems,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        refreshMenuItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
