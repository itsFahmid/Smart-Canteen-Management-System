# Smart Canteen – Restaurant Ordering System

A full-stack restaurant ordering system with a **Laravel 10 API backend** and a **React (Vite + Tailwind) frontend**.

## Project Structure

```
cse-3100-api-sample/
├── app/                    # Laravel backend
│   ├── Http/Controllers/   # API controllers (Auth, Menu, Orders, Employees, Dashboard)
│   └── Models/             # Eloquent models (User, MenuItem, Order, OrderItem, Employee)
├── client/                 # React frontend (Vite + Tailwind)
│   ├── src/app/            # Pages, components, contexts, services
│   └── package.json        # Frontend dependencies
├── database/               # Migrations & seeders
├── routes/api.php          # API route definitions
├── schema.sql              # MySQL schema & seed data
├── composer.json           # Backend dependencies
└── .env.example            # Environment config template
```

## Setup

### 1. Backend (Laravel)

```bash
cd cse-3100-api-sample
composer install
cp .env.example .env
php artisan key:generate
```

Create the MySQL database:
```sql
CREATE DATABASE smart_canteen;
```

Update `.env` with your DB credentials, then:
```bash
php artisan migrate --seed
php artisan serve
```

Backend runs at `http://localhost:8000`.

### 2. Frontend (React)

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies API calls to the backend.

## Demo Credentials

| Role     | Email                      | Password |
|----------|---------------------------|----------|
| Admin    | admin@smartcanteen.com     | password |
| Staff    | staff@smartcanteen.com     | password |
| Customer | customer@email.com         | password |

## API Endpoints

| Method | Endpoint                | Auth | Description            |
|--------|------------------------|------|------------------------|
| POST   | /api/register          | No   | Register new customer  |
| POST   | /api/login             | No   | Login                  |
| POST   | /api/logout            | Yes  | Logout                 |
| GET    | /api/menu-items        | No   | List menu items        |
| POST   | /api/menu-items        | Yes  | Create menu item       |
| PUT    | /api/menu-items/{id}   | Yes  | Update menu item       |
| DELETE | /api/menu-items/{id}   | Yes  | Delete menu item       |
| GET    | /api/orders            | Yes  | List orders            |
| POST   | /api/orders            | Yes  | Create order           |
| PUT    | /api/orders/{id}/status| Yes  | Update order status    |
| GET    | /api/employees         | Yes  | List employees         |
| PUT    | /api/employees/{id}    | Yes  | Update employee        |
| GET    | /api/dashboard/stats   | Yes  | Dashboard statistics   |
