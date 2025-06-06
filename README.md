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
## 🧭 Features

- 🔐 Secure Login with JWT Authentication
- 👥 Role-Based Access Control (Admin, Customer)
- 📦 Inventory and Product Management
- 🛒 Customer Ordering System with Cart
- 💳 Payment Integration with PayHere Sandbox
- 📄 Automatic Invoice Generation
- 📊 Real-Time Dashboards & Statistics

---

## 🖼️ Screenshots
  ## Customer Pages
  
### **Home Page**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/8c04c92de663fcfc7e3a02e79077e22843aacb09/HomePage1.PNG)

### **Login Form**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/6100e04c04eaf520e5873ad20cd512a8d0f62751/login.PNG)

### **Products**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/c8fd70f894dd9b54fa4439a9d9ccc766c9a18825/products.PNG)

### **Add to Cart**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/c8fd70f894dd9b54fa4439a9d9ccc766c9a18825/AddToCart.PNG)

### **View Cart**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/c8fd70f894dd9b54fa4439a9d9ccc766c9a18825/ViewCart.PNG)

### **Add Address**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/ea365cb67ebd77cae65cbd46995bc5db1b0b1f6f/AddAddress.PNG)

### **Payment**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/ea365cb67ebd77cae65cbd46995bc5db1b0b1f6f/Payment.PNG)

### **Place Order**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/ea365cb67ebd77cae65cbd46995bc5db1b0b1f6f/PlaceOrder.PNG)

### **Order Summary**  
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/ea365cb67ebd77cae65cbd46995bc5db1b0b1f6f/OrderSummary.PNG)


## **Admin Pages** 

### **Admin Dashboard**   
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/f97831d21667ae7663b2d7b892d571f0c4e5cdd9/Admin-dashboard.PNG) 

### **Admin Brands Page**   
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/6100e04c04eaf520e5873ad20cd512a8d0f62751/admin-brandPNG.PNG) 

### **Admin Categories Page**   
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/6100e04c04eaf520e5873ad20cd512a8d0f62751/admin-categories.PNG) 

### **Admin Products Page**    
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/6100e04c04eaf520e5873ad20cd512a8d0f62751/admin-products.PNG)  

### **Admin Management**   
![image-alt](https://github.com/AchiniPramo/ToolNest_Hardware/blob/f97831d21667ae7663b2d7b892d571f0c4e5cdd9/Admin-Management.PNG) 

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
👉 [Click here to view the demo](https://youtu.be/wRwXEhW_y3Y)

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
