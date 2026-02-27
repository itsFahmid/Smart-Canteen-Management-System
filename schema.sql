CREATE DATABASE smart_canteen;

CREATE USER 'admin' @'localhost' IDENTIFIED BY 'strong_password';

GRANT ALL PRIVILEGES ON smart_canteen.* TO 'admin' @'localhost';

FLUSH PRIVILEGES;

USE smart_canteen;

-- Users table (admin, staff, customer)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'customer') NOT NULL DEFAULT 'customer',
    phone VARCHAR(20) NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    price DECIMAL(8,2) NOT NULL,
    category ENUM('snacks', 'meals', 'drinks') NOT NULL,
    image VARCHAR(500) NULL,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    stock_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    payment_method ENUM('cash', 'card', 'online') NOT NULL,
    special_notes TEXT NULL,
    table_number INT NULL,
    estimated_time INT NULL DEFAULT 25,
    assigned_staff VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items (pivot table)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Employees table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hourly_rate DECIMAL(8,2) NOT NULL DEFAULT 0,
    working_hours INT NOT NULL DEFAULT 0,
    total_salary DECIMAL(10,2) NOT NULL DEFAULT 0,
    joined_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed data: users
INSERT INTO users (name, email, password, role, phone) VALUES
('Admin User', 'admin@smartcanteen.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+1234567890'),
('Chef John', 'staff@smartcanteen.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'staff', '+1234567891'),
('Customer Mike', 'customer@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', '+1234567892');

-- Seed data: menu items
INSERT INTO menu_items (name, description, price, category, image, in_stock, stock_quantity) VALUES
('French Fries', 'Crispy golden fries with salt', 4.99, 'snacks', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877', TRUE, 50),
('Chicken Wings', 'Spicy buffalo wings with ranch', 8.99, 'snacks', 'https://images.unsplash.com/photo-1608039755401-742074f0548d', TRUE, 30),
('Onion Rings', 'Crispy fried onion rings', 5.99, 'snacks', 'https://images.unsplash.com/photo-1639024471283-03518883512d', TRUE, 40),
('Classic Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 12.99, 'meals', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', TRUE, 25),
('Margherita Pizza', 'Fresh mozzarella, tomatoes, and basil', 14.99, 'meals', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', TRUE, 20),
('Grilled Chicken', 'Herb-marinated grilled chicken with vegetables', 16.99, 'meals', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6', TRUE, 15),
('Pasta Carbonara', 'Creamy pasta with bacon and parmesan', 13.99, 'meals', 'https://images.unsplash.com/photo-1612874742237-6526221588e3', FALSE, 0),
('Coca Cola', 'Chilled soft drink', 2.99, 'drinks', 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e', TRUE, 100),
('Orange Juice', 'Fresh squeezed orange juice', 4.99, 'drinks', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', TRUE, 35),
('Iced Coffee', 'Cold brew coffee with ice', 5.99, 'drinks', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7', TRUE, 45);

-- Seed data: employees
INSERT INTO employees (user_id, hourly_rate, working_hours, total_salary, joined_date) VALUES
(1, 50, 40, 2000, '2020-01-01'),
(2, 20, 40, 800, '2020-02-01');