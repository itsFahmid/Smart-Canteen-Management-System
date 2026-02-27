// Mock Data for Restaurant Ordering System

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'customer';
  phone?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'staff' | 'admin';
  hourlyRate: number;
  workingHours: number;
  totalSalary: number;
  joinedDate: Date;
}

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

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@smartcanteen.com',
    role: 'admin',
    phone: '+1234567890'
  },
  {
    id: '2',
    name: 'Chef John',
    email: 'staff@smartcanteen.com',
    role: 'staff',
    phone: '+1234567891'
  },
  {
    id: '3',
    name: 'Customer Mike',
    email: 'customer@email.com',
    role: 'customer',
    phone: '+1234567892'
  }
];

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@smartcanteen.com',
    role: 'admin',
    hourlyRate: 50,
    workingHours: 40,
    totalSalary: 2000,
    joinedDate: new Date('2020-01-01')
  },
  {
    id: '2',
    name: 'Chef John',
    email: 'staff@smartcanteen.com',
    role: 'staff',
    hourlyRate: 20,
    workingHours: 40,
    totalSalary: 800,
    joinedDate: new Date('2020-02-01')
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@smartcanteen.com',
    role: 'staff',
    hourlyRate: 18,
    workingHours: 35,
    totalSalary: 630,
    joinedDate: new Date('2021-03-15')
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael@smartcanteen.com',
    role: 'staff',
    hourlyRate: 22,
    workingHours: 38,
    totalSalary: 836,
    joinedDate: new Date('2021-06-20')
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily@smartcanteen.com',
    role: 'staff',
    hourlyRate: 19,
    workingHours: 40,
    totalSalary: 760,
    joinedDate: new Date('2022-01-10')
  }
];

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  // Snacks
  {
    id: '1',
    name: 'French Fries',
    description: 'Crispy golden fries with salt',
    price: 4.99,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    inStock: true,
    stockQuantity: 50
  },
  {
    id: '2',
    name: 'Chicken Wings',
    description: 'Spicy buffalo wings with ranch',
    price: 8.99,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d',
    inStock: true,
    stockQuantity: 30
  },
  {
    id: '3',
    name: 'Onion Rings',
    description: 'Crispy fried onion rings',
    price: 5.99,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d',
    inStock: true,
    stockQuantity: 40
  },
  // Meals
  {
    id: '4',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and cheese',
    price: 12.99,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    inStock: true,
    stockQuantity: 25
  },
  {
    id: '5',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomatoes, and basil',
    price: 14.99,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    inStock: true,
    stockQuantity: 20
  },
  {
    id: '6',
    name: 'Grilled Chicken',
    description: 'Herb-marinated grilled chicken with vegetables',
    price: 16.99,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6',
    inStock: true,
    stockQuantity: 15
  },
  {
    id: '7',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan',
    price: 13.99,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    inStock: false,
    stockQuantity: 0
  },
  // Drinks
  {
    id: '8',
    name: 'Coca Cola',
    description: 'Chilled soft drink',
    price: 2.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    inStock: true,
    stockQuantity: 100
  },
  {
    id: '9',
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice',
    price: 4.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    inStock: true,
    stockQuantity: 35
  },
  {
    id: '10',
    name: 'Iced Coffee',
    description: 'Cold brew coffee with ice',
    price: 5.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    inStock: true,
    stockQuantity: 45
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '3',
    customerName: 'Customer Mike',
    items: [
      { ...mockMenuItems[3], quantity: 2 },
      { ...mockMenuItems[7], quantity: 2 }
    ],
    totalAmount: 31.96,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60000),
    estimatedTime: 20,
    paymentMethod: 'card',
    specialNotes: 'Extra ketchup please',
    tableNumber: 5,
    assignedStaff: 'Chef John'
  },
  {
    id: 'ORD-002',
    customerId: '3',
    customerName: 'Sarah Johnson',
    items: [
      { ...mockMenuItems[4], quantity: 1 },
      { ...mockMenuItems[8], quantity: 1 }
    ],
    totalAmount: 19.98,
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60000),
    estimatedTime: 15,
    paymentMethod: 'cash',
    tableNumber: 3,
    assignedStaff: 'Chef John'
  },
  {
    id: 'ORD-003',
    customerId: '3',
    customerName: 'John Doe',
    items: [
      { ...mockMenuItems[1], quantity: 3 },
      { ...mockMenuItems[9], quantity: 3 }
    ],
    totalAmount: 44.94,
    status: 'completed',
    createdAt: new Date(Date.now() - 60 * 60000),
    estimatedTime: 0,
    paymentMethod: 'online',
    tableNumber: 7,
    assignedStaff: 'Chef John'
  },
  {
    id: 'ORD-004',
    customerId: '3',
    customerName: 'Emily Davis',
    items: [
      { ...mockMenuItems[0], quantity: 2 },
      { ...mockMenuItems[8], quantity: 2 }
    ],
    totalAmount: 14.98,
    status: 'completed',
    createdAt: new Date(Date.now() - 120 * 60000),
    estimatedTime: 0,
    paymentMethod: 'card',
    tableNumber: 2,
    assignedStaff: 'Chef John'
  }
];