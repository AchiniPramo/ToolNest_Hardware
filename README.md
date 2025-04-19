<h1 align="center">🛠️ ToolNest Hardware Shop System</h1>
<p align="center">
  <i>A Full-Stack Web Application for Streamlined Hardware Shop Management</i><br>
  <b>Spring Boot Project - IJSE - GDSE70 - [Galle] - Achini Pramodhya - 2nd Semester Final Project</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-%236DB33F.svg?style=flat&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=flat&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-%23563D7C.svg?style=flat&logo=bootstrap&logoColor=white" />
</p>

---

## 📌 Project Description

**ToolNest** is a modern hardware shop system that enables shop owners and customers to interact through a seamless digital platform. Built with a Spring Boot backend and a clean, responsive frontend, the system supports product management, customer orders, secure login, payment integration, and real-time dashboards.

---

## 🖼️ Screenshots

> Replace the paths with real image files from your project in the `screenshots/` folder.

| Page | Preview |
|------|---------|
| Home | ![](screenshots/home.png) |
| Login | ![](screenshots/login.png) |
| Admin Dashboard | ![](screenshots/admin-dashboard.png) |
| Product Management | ![](screenshots/products.png) |
| Customer Order Page | ![](screenshots/order.png) |
| Invoice View | ![](screenshots/invoice.png) |

---

## 🧰 Technologies Used

### 🔹 Frontend:
- HTML5, CSS3, JavaScript
- Bootstrap for responsive design
- AJAX for dynamic interactions

### 🔹 Backend:
- Java + Spring Boot
- Spring Security + JWT Authentication
- Hibernate (JPA) + MySQL Database
- PayHere Sandbox for online payments

---

## 🧭 Features

- 🔐 Secure Login with JWT Authentication
- 👥 Role-Based Access Control (Admin, Cashier, Customer)
- 📦 Inventory and Product Management
- 🛒 Customer Ordering System with Cart
- 💳 Payment Integration with PayHere Sandbox
- 📄 Automatic Invoice Generation
- 📊 Real-Time Dashboards & Statistics

---

## 🗂️ Project Structure

```bash
ToolNest_Hardware/
├── frontend/        # UI built using HTML, CSS, JS, and Bootstrap
└── backend/         # Spring Boot app with all backend APIs and configurations
```

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

1. Open the `backend/` folder in your IDE.
2. Set your database configurations in `application.properties`:
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/toolnest_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Build and run the project:

   ```bash
   ./mvnw spring-boot:run
   ```

4. API will run at: `http://localhost:8080`

---

### 🌐 Frontend Setup

1. Navigate to the `frontend/` folder.
2. Open `index.html` with any live server (e.g., Live Server extension in VS Code).
3. Connect it to the backend running at `http://localhost:8080`.

---

## 🎥 Demo Video

🎬 **Watch the Full Demo on YouTube**  
👉 [Click here to view the demo](https://www.youtube.com/watch?v=your_video_link_here)

---

## 🚀 How to Use

1. Register or log in as a user.
2. Admins can manage products, users, and see dashboards.
3. Customers can add items to the cart and proceed to payment.
4. After checkout, an invoice is automatically generated.
5. Cashiers can manage transactions and assist with orders.

---

## 📝 License

This project is for educational and non-commercial use.  
© 2025 Achini Pramodhya. All rights reserved.

---

<p align="center">
  Made with ❤️ by Achini Pramodhya
</p>
