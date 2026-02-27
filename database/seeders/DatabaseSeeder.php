<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\MenuItem;
use App\Models\Employee;
use App\Models\Order;
use App\Models\OrderItem;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Users
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@smartcanteen.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+1234567890',
        ]);

        $staff = User::create([
            'name' => 'Chef John',
            'email' => 'staff@smartcanteen.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '+1234567891',
        ]);

        $customer = User::create([
            'name' => 'Customer Mike',
            'email' => 'customer@email.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => '+1234567892',
        ]);

        // Additional staff users for salary page
        $sarah = User::create([
            'name' => 'Sarah Williams',
            'email' => 'sarah@smartcanteen.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '+1234567893',
        ]);

        $michael = User::create([
            'name' => 'Michael Brown',
            'email' => 'michael@smartcanteen.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '+1234567894',
        ]);

        $emily = User::create([
            'name' => 'Emily Davis',
            'email' => 'emily@smartcanteen.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '+1234567895',
        ]);

        // Seed Employees
        Employee::create([
            'user_id' => $admin->id,
            'hourly_rate' => 50,
            'working_hours' => 40,
            'total_salary' => 2000,
            'joined_date' => '2020-01-01',
        ]);

        Employee::create([
            'user_id' => $staff->id,
            'hourly_rate' => 20,
            'working_hours' => 40,
            'total_salary' => 800,
            'joined_date' => '2020-02-01',
        ]);

        Employee::create([
            'user_id' => $sarah->id,
            'hourly_rate' => 18,
            'working_hours' => 35,
            'total_salary' => 630,
            'joined_date' => '2021-03-15',
        ]);

        Employee::create([
            'user_id' => $michael->id,
            'hourly_rate' => 22,
            'working_hours' => 38,
            'total_salary' => 836,
            'joined_date' => '2021-06-20',
        ]);

        Employee::create([
            'user_id' => $emily->id,
            'hourly_rate' => 19,
            'working_hours' => 40,
            'total_salary' => 760,
            'joined_date' => '2022-01-10',
        ]);

        // Seed Menu Items
        $fries = MenuItem::create([
            'name' => 'French Fries',
            'description' => 'Crispy golden fries with salt',
            'price' => 4.99,
            'category' => 'snacks',
            'image' => 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
            'in_stock' => true,
            'stock_quantity' => 50,
        ]);

        $wings = MenuItem::create([
            'name' => 'Chicken Wings',
            'description' => 'Spicy buffalo wings with ranch',
            'price' => 8.99,
            'category' => 'snacks',
            'image' => 'https://images.unsplash.com/photo-1608039755401-742074f0548d',
            'in_stock' => true,
            'stock_quantity' => 30,
        ]);

        MenuItem::create([
            'name' => 'Onion Rings',
            'description' => 'Crispy fried onion rings',
            'price' => 5.99,
            'category' => 'snacks',
            'image' => 'https://images.unsplash.com/photo-1639024471283-03518883512d',
            'in_stock' => true,
            'stock_quantity' => 40,
        ]);

        $burger = MenuItem::create([
            'name' => 'Classic Burger',
            'description' => 'Juicy beef patty with lettuce, tomato, and cheese',
            'price' => 12.99,
            'category' => 'meals',
            'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
            'in_stock' => true,
            'stock_quantity' => 25,
        ]);

        $pizza = MenuItem::create([
            'name' => 'Margherita Pizza',
            'description' => 'Fresh mozzarella, tomatoes, and basil',
            'price' => 14.99,
            'category' => 'meals',
            'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
            'in_stock' => true,
            'stock_quantity' => 20,
        ]);

        MenuItem::create([
            'name' => 'Grilled Chicken',
            'description' => 'Herb-marinated grilled chicken with vegetables',
            'price' => 16.99,
            'category' => 'meals',
            'image' => 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
            'in_stock' => true,
            'stock_quantity' => 15,
        ]);

        MenuItem::create([
            'name' => 'Pasta Carbonara',
            'description' => 'Creamy pasta with bacon and parmesan',
            'price' => 13.99,
            'category' => 'meals',
            'image' => 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
            'in_stock' => false,
            'stock_quantity' => 0,
        ]);

        $cola = MenuItem::create([
            'name' => 'Coca Cola',
            'description' => 'Chilled soft drink',
            'price' => 2.99,
            'category' => 'drinks',
            'image' => 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
            'in_stock' => true,
            'stock_quantity' => 100,
        ]);

        $oj = MenuItem::create([
            'name' => 'Orange Juice',
            'description' => 'Fresh squeezed orange juice',
            'price' => 4.99,
            'category' => 'drinks',
            'image' => 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
            'in_stock' => true,
            'stock_quantity' => 35,
        ]);

        $coffee = MenuItem::create([
            'name' => 'Iced Coffee',
            'description' => 'Cold brew coffee with ice',
            'price' => 5.99,
            'category' => 'drinks',
            'image' => 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
            'in_stock' => true,
            'stock_quantity' => 45,
        ]);

        // Seed sample orders
        $order1 = Order::create([
            'customer_id' => $customer->id,
            'customer_name' => 'Customer Mike',
            'total_amount' => 31.96,
            'status' => 'pending',
            'payment_method' => 'card',
            'special_notes' => 'Extra ketchup please',
            'table_number' => 5,
            'estimated_time' => 20,
            'assigned_staff' => 'Chef John',
        ]);
        OrderItem::create(['order_id' => $order1->id, 'menu_item_id' => $burger->id, 'quantity' => 2, 'price' => 12.99]);
        OrderItem::create(['order_id' => $order1->id, 'menu_item_id' => $cola->id, 'quantity' => 2, 'price' => 2.99]);

        $order2 = Order::create([
            'customer_id' => $customer->id,
            'customer_name' => 'Customer Mike',
            'total_amount' => 19.98,
            'status' => 'preparing',
            'payment_method' => 'cash',
            'table_number' => 3,
            'estimated_time' => 15,
            'assigned_staff' => 'Chef John',
        ]);
        OrderItem::create(['order_id' => $order2->id, 'menu_item_id' => $pizza->id, 'quantity' => 1, 'price' => 14.99]);
        OrderItem::create(['order_id' => $order2->id, 'menu_item_id' => $oj->id, 'quantity' => 1, 'price' => 4.99]);

        $order3 = Order::create([
            'customer_id' => $customer->id,
            'customer_name' => 'Customer Mike',
            'total_amount' => 44.94,
            'status' => 'completed',
            'payment_method' => 'online',
            'table_number' => 7,
            'estimated_time' => 0,
            'assigned_staff' => 'Chef John',
        ]);
        OrderItem::create(['order_id' => $order3->id, 'menu_item_id' => $wings->id, 'quantity' => 3, 'price' => 8.99]);
        OrderItem::create(['order_id' => $order3->id, 'menu_item_id' => $coffee->id, 'quantity' => 3, 'price' => 5.99]);
    }
}
