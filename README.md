# FormFarm 🚜 | Professional Formspree Clone (SaaS)

<p align="center">
  <img src="https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP Badge">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL Badge">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Badge">
  <img src="https://img.shields.io/badge/Architecture-MVC-green?style=for-the-badge" alt="MVC Badge">
</p>

---

### 🌟 Project Overview

**FormFarm** is a lightweight, high-performance SaaS platform built with **PHP (MVC)**, **MySQL**, and **Bootstrap**. It serves as a private alternative to platforms like Formspree, allowing developers to manage form submissions effortlessly without managing their own backend logic for every single form.

Simply point your HTML forms to your unique FormFarm endpoint, and we handle the rest!

---

### 🚀 Key Features

- 👤 **Full User Authentication** – Secure Register, Login, and Logout functionality.
- 📊 **Dynamic Dashboard** – Manage all your forms and view submissions in one place.
- 🔑 **Unique Endpoint Keys** – Every form gets a secure, unique key for POST submissions.
- 📩 **Public POST Endpoint** – Seamlessly receive data from any frontend application.
- 👁️ **Submission Viewer** – Clean, responsive UI to browse and manage received data.
- ⚡ **Lightweight MVC** – Built on a custom core for maximum speed and extensibility.

---

### 🛠️ Technologies Used

- **Backend:** PHP 7.4+ (Custom MVC Framework)
- **Database:** MySQL
- **Frontend:** HTML5, CSS3, Bootstrap 5
- **Routing:** Custom Regex-based Router
- **Server:** Apache (with `mod_rewrite`)

---

### 🗂️ Project Structure

```text
FormFarm/
├── app/                        ← Core MVC Implementation
│   ├── controllers/            ← Request Handling Logic
│   │   ├── AuthController.php
│   │   ├── DashboardController.php
│   │   ├── FormController.php
│   │   ├── HomeController.php
│   │   └── PublicController.php
│   ├── helpers/                ← Utility Functions
│   │   ├── Functions.php
│   │   └── MailHelper.php
│   ├── middleware/             ← Security Guards
│   │   └── auth.php
│   ├── models/                 ← Database Interaction
│   │   ├── Form.php
│   │   ├── Submission.php
│   │   └── User.php
│   └── views/                  ← UI Templates
│       ├── endpoint_active.php
│       ├── help.php
│       ├── home.php
│       ├── thanks.php
│       ├── auth/               
│       │   ├── login.php
│       │   └── register.php
│       ├── dashboard/          
│       │   ├── create-form.php
│       │   ├── forms.php
│       │   ├── index.php
│       │   └── submissions.php
│       └── layouts/            
│           ├── footer.php
│           └── header.php
├── config/                     
│   └── database.php
├── core/                       ← Framework Engine
│   ├── Controller.php
│   ├── Model.php
│   └── Router.php
├── database/                   
│   ├── Database.php            
│   └── migrations/             
│       └── schema.sql
├── public/                     ← Web Entry Point
│   ├── .htaccess
│   ├── index.php
│   └── assets/
│       ├── css/
│       ├── images/
│       │   └── FormFarm.png
│       └── js/
├── routes/                     
│   └── web.php
├── storage/                    ← Logs & Cache
│   ├── cache/
│   └── logs/
├── .htaccess                   ← Root Redirection
├── README.md                   
├── XAMPP.md                    
├── idea.md                     
└── idea.txt                    
```

---

### 🚀 Getting Started

#### ✅ Prerequisites
- PHP 7.4 or higher
- MySQL Server
- Apache Web Server with `mod_rewrite` enabled

#### 🛠️ Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/CodeWithTanim/FormFarm.git
   cd FormFarm
   ```

2. **Database Configuration:**
   - Create a database: `CREATE DATABASE formfarm;`
   - Import the schema: `mysql -u your_user -p formfarm < database/migrations/schema.sql`

3. **Configure Environment:**
   - Open `config/database.php`
   - Update `dbname`, `user`, and `pass` with your credentials.

4. **Web Server Setup:**
   - Point your Apache VHost to the `public/` directory.
   - Or, ensure the root `.htaccess` is working to redirect requests to `/public`.

---

### 📖 Usage Guide

1. **Create an Account:** Register and log in to your dashboard.
2. **Setup a Form:** Click "Create New Form" to generate a unique **Form Key**.
3. **Integrate:** Update your HTML form's `action` attribute:
   ```html
   <form action="http://your-domain.com/f/YOUR_UNIQUE_KEY" method="POST">
     <input type="email" name="email" required>
     <button type="submit">Submit</button>
   </form>
   ```
4. **View Results:** Submissions will appear instantly in your FormFarm dashboard!

---

### ✍️ Developer

> **MD SAMIUR RAHMAN TANIM**  
> 🔗 [GitHub](https://github.com/CodeWithTanim) | [LinkedIn](https://www.linkedin.com/in/codewithtanim/) | [YouTube](https://www.youtube.com/@CodeWithTanim)

---

### 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

### 📜 License

This project is **100% created by MD SAMIUR RAHMAN TANIM**.

If anyone wants to use this project, they **MUST contact MD SAMIUR RAHMAN TANIM** to get explicit permission. Unauthorized use, distribution, or copying of this project will result in **legal actions**.

See the [LICENSE](LICENSE) file for more details.
