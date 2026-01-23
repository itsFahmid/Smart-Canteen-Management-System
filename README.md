# Smart Canteen & Billing Management System

## A tactical Solution for Modern Canteen Operations

---

## Project Overview

The **Smart Canteen & Billing Management System** is a web-based **Vertical SaaS platform** designed to digitalize canteen operations such as food ordering, billing, inventory tracking, and staff management.

The system replaces manual workflows with automated, real-time processes, reducing human error and significantly improving operational efficiency through **role-based access control**, **live order tracking**, and **centralized management dashboards**.

---

## Problem Statement

Traditional canteens often struggle with:

* Manual order taking leading to delays and mistakes
* Billing errors during peak hours
* No real-time visibility of active or completed orders
* Inefficient inventory tracking
* Absence of analytics for sales and demand forecasting

---

## Proposed Solution

This system provides a complete digital canteen ecosystem featuring:

* Digital food ordering system
* Automated and error-free billing
* Real-time kitchen order queue
* Inventory monitoring with alerts
* Role-based dashboards for Admin, Staff, and Customers

The platform is built using a **Laravel REST API backend** and a **React Single Page Application (SPA)** frontend, following modern SaaS architecture principles.

---

## Target Industry (Vertical SaaS)

* University canteens
* Office cafeterias
* Hospital food courts
* Event-based food stalls

---

## UI / UX Design (Figma)

The complete user interface was designed using **Figma**, following a **role-based and SaaS-oriented UI/UX approach**.

### Design Principles

* Clear separation of Customer, Staff, and Admin interfaces
* Interfaces mapped to real-world canteen workflows
* Reusable UI components aligned with React architecture
* Real-time interaction patterns for order handling

### Figma Design Link

[https://fast-admin-39638066.figma.site/](https://fast-admin-39638066.figma.site/)

### Designed Screens

* Authentication (Login)
* Customer Menu and Cart
* Order Status and Billing
* Staff Live Order Queue
* Admin Dashboard
* Menu and Inventory Management
* User and Role Management

The Figma design serves as the **single source of truth** for frontend development and directly maps to React components and backend APIs.

---

## Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Backend          | Laravel (REST API)           |
| Frontend         | React (SPA)                  |
| State Management | Zustand or Redux             |
| Authentication   | JWT                          |
| Authorization    | Spatie Roles and Permissions |
| Real-time        | Laravel WebSockets           |
| Queue System     | Laravel Queues               |
| Database         | Microsoft SQL Server / MySQL |

---

## Core Features

### Smart Ordering System

* Digital menu with categories
* Real-time cart updates
* Live order tracking

### Automated Billing

* Instant bill generation
* Multiple payment methods support
* Strong order-to-bill consistency

### Real-Time Kitchen Dashboard

* Live order queue for staff
* Status updates without page refresh
* WebSocket-powered communication

### Inventory Management

* Automatic stock deduction
* Low-stock alerts
* Inventory usage reports

### Role-Based Access Control

* Admin, Staff, and Customer roles
* Permission-based API access
* Secure administrative panel

---

## Backend Architecture Highlights (Laravel)

* RESTful API architecture
* Spatie Permissions for RBAC
* Queues for billing and analytics processing
* WebSockets for real-time order updates
* Scheduled tasks for reports and maintenance
* Clean service and repository pattern

---

## Frontend Architecture Highlights (React)

* Global state management using Zustand or Redux
* Real-time UI updates via WebSockets
* Dynamic dashboards for different roles
* Reusable and scalable UI components
* Optimistic UI for faster order interactions

---

## REST API Overview

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | /api/auth/login  | User authentication    |
| GET    | /api/menu        | Fetch food items       |
| POST   | /api/orders      | Place a new order      |
| GET    | /api/orders/{id} | Retrieve order details |
| POST   | /api/billing     | Generate bill          |
| GET    | /api/inventory   | Inventory status       |

---

## Monetization and Business Value

* Subscription-based SaaS model for institutions
* Reduced operational costs
* Faster and more accurate order processing
* Data-driven decision making through analytics
* Scalable for multi-branch deployment

---

## Team Members

| Name                   | ID          | Role                |
| ---------------------- | ----------- | ------------------- |
| Tanjim Islam           | 20230104036 | Lead                |
| Fahmid Siddique        | 20230104046 | Back-end Developer  |
| Ashraful Islam         | 20230104030 | Front-end Developer |
| Shuvrato Bhattacharjee | 20230104037 | Front-end Developer |

---

## Future Vision

To transform traditional canteens into efficient, data-driven, and scalable digital operations using modern web technologies.

---

## License

This project is developed for academic and learning purposes only.
