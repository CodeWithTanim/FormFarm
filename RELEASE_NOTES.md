# FormFarm 🚜 | Complete Release History & Notes

---

# 📦 Release v1.0.0 — The Initial MVC Architecture (PHP & MySQL)

<p align="center">
  <img src="https://img.shields.io/badge/Release-v1.0.0-blue?style=for-the-badge" alt="Release Badge">
  <img src="https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP Badge">
  <img src="https://img.shields.io/badge/MySQL-5.7+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL Badge">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Badge">
  <img src="https://img.shields.io/badge/Architecture-Custom_MVC-green?style=for-the-badge" alt="MVC Badge">
</p>

### 🌟 Release Summary
**FormFarm v1.0.0** is the inception release of FormFarm — a lightweight, private SaaS alternative to Formspree built from scratch in PHP and MySQL using a custom MVC pattern. It allows developers to collect form submissions directly from frontend websites without managing independent backend servers for every form.

### 🚀 Key Features & Capabilities
- 👤 **Full User Authentication Engine**:
  - Secure registration, login, and logout backed by native PHP session persistence.
  - High-security password encryption using `password_hash()` and `password_verify()`.
- 📊 **Dynamic Neural Dashboard**:
  - Real-time counter displaying total active data nodes.
  - Recent activity stream showing the latest form collection points.
- 🔑 **Cryptographic Form Key Generation**:
  - Generates unique 16-character hexadecimal keys via `bin2hex(random_bytes(8))`.
- 📩 **Public Form Ingestion Endpoint (`/f/{form_key}`)**:
  - Accepts standard HTML form submissions using HTTP POST.
  - Dynamic routing powered by a custom regex router with Apache `mod_rewrite`.
  - Non-POST requests automatically direct users to an informative `/endpoint_active` guide.
- 👁️ **Data Stream Viewer**:
  - Form submissions parsed from JSON and displayed chronologically in tabular format.
  - Single record purge and bulk purge with select-all checkbox support.
- 📬 **Basic Email Notifications**:
  - Form owners receive instant email alerts via native PHP `mail()` and `MailHelper`.
- 🎨 **Dark Sci-Fi Cyberpunk Theme**:
  - Red-and-black palette (`#000000`, `#ff0a0a`), Google Fonts Orbitron & Inter.
  - Interactive Canvas particle background with interconnecting nodes using `particles.js`.

### 🛠️ Technology Stack
- **Backend**: PHP 7.4+ (Custom MVC framework)
- **Database**: MySQL (PDO with prepared statements & foreign key cascading)
- **Frontend**: HTML5, CSS3, Bootstrap 5, Bootstrap Icons
- **Web Server**: Apache (`.htaccess` URL rewriting)

### ✍️ Author & Credits
> **MD SAMIUR RAHMAN TANIM**  
> 🔗 [GitHub](https://github.com/CodeWithTanim) | [LinkedIn](https://www.linkedin.com/in/codewithtanim/) | [YouTube](https://www.youtube.com/@CodeWithTanim)

---

# 📦 Release v1.1.0 — Cyber Client Test Suite & Production Update

<p align="center">
  <img src="https://img.shields.io/badge/Release-v1.1.0-blue?style=for-the-badge" alt="Release Badge">
  <img src="https://img.shields.io/badge/Update-Client_Suite-orange?style=for-the-badge" alt="Client Update Badge">
  <img src="https://img.shields.io/badge/UI-3D_Parallax-00f2fe?style=for-the-badge" alt="Parallax Badge">
  <img src="https://img.shields.io/badge/Hosting-cPanel_Ready-success?style=for-the-badge" alt="Hosting Badge">
</p>

### 🌟 Release Summary
**FormFarm v1.1.0** introduces a standalone, client-side testing interface designed for developers to test their FormFarm endpoints live, along with hosting optimizations and server stability improvements for production deployment.

### 🚀 What's New & Changed
- 🧪 **Standalone Interactive Client Test Suite (`test/`)**:
  - **`test/index.html`**: A production-grade test contact form simulating external website transmissions.
  - **`test/style.css`**:
    - Cyber-glow aesthetics using Google Font **Outfit**.
    - Vibrant cyan and electric blue gradient palette (`#00f2fe` and `#4facfe`).
    - Input focus-glow micro-animations and blurred glass card (`backdrop-filter`).
  - **`test/script.js`**:
    - **Real-Time 3D Card Parallax**: Subtle card rotation responding dynamically to cursor coordinates across X and Y axes.
    - Interactive submit state ("Transmitting Data...") with button locking to prevent double submissions.
  - **`test/assets/neural_background.png`**: High-resolution dark cybernetic background asset.
- ⚙️ **Production Server & Hosting Configurations**:
  - Added dedicated `php.ini` directives for cPanel environments with automated error logging.
  - Configured Hostinger and cPanel deployment instructions in `Host.md`.
  - Refined `/thanks` submission confirmation page styling.

### 🛠️ Technology Stack
- **Core Platform**: PHP 7.4+, MySQL
- **Test Interface**: Vanilla HTML5, CSS3, JavaScript (ES6+), Google Font Outfit
- **Deployment**: Apache, cPanel MultiPHP, Hostinger

### ✍️ Author & Credits
> **MD SAMIUR RAHMAN TANIM**  
> 🔗 [GitHub](https://github.com/CodeWithTanim) | [LinkedIn](https://www.linkedin.com/in/codewithtanim/) | [YouTube](https://www.youtube.com/@CodeWithTanim)

---

# 📦 Release v2.0.0 — Modern Next.js, TypeScript & MongoDB Architecture

<p align="center">
  <img src="https://img.shields.io/badge/Release-v2.0.0-red?style=for-the-badge" alt="Release Badge">
  <img src="https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
  <img src="https://img.shields.io/badge/Cluster_DB-FormFarmDB-green?style=for-the-badge" alt="FormFarmDB Badge">
</p>

### 🌟 Release Summary
**FormFarm v2.0.0** is a complete, ground-up rewrite of the FormFarm platform into an enterprise-grade, modern SaaS stack. Replacing the PHP and MySQL codebase, this version leverages **Next.js 16 (App Router)**, **TypeScript**, and **MongoDB Atlas (`FormFarmDB`)** to provide ultra-fast performance, automated client telemetry, serverless scalability, and enhanced developer ergonomics.

### 🚀 Major Upgrades & Innovations
- ⚡ **Next.js 16 App Router & Serverless Architecture**:
  - Full TypeScript type-safety across all server actions, route handlers, and UI components.
  - Built with Turbopack for near-instant hot reloads and optimized production builds.
- 🍃 **Cloud MongoDB Persistence (`FormFarmDB`)**:
  - Connected to MongoDB Atlas with connection pooling for serverless environments.
  - Unique database indexing on user emails and form keys.
  - Automatic cascading deletions: deleting a form cleanly purges all its associated submissions.
- 🔐 **Hardened Authentication & Session Management**:
  - High-security password hashing using `bcryptjs` with auto-generated salts.
  - Stateless authentication utilizing cryptographically signed, `HttpOnly`, `SameSite=lax` JWT session cookies.
- 🌐 **Automated Client Telemetry & Tracking**:
  - **Real IP Detection**: Accurately resolves client IP addresses through proxy and cloud headers (`x-forwarded-for`, `x-real-ip`).
  - **Live Geolocation Tracking**: Automatically determines the submitter's Country and City.
  - **Device / Browser Identification**: Captures client `User-Agent` telemetry.
  - Telemetry is stored directly in MongoDB and displayed with globe/pin badges on the dashboard.
- 📬 **Dual-Format Email Dispatcher (Nodemailer)**:
  - Form owners receive instant, beautifully styled dark-mode **HTML & Plain Text** emails upon every submission.
  - Emails include the full extracted payload along with the client's IP, City, Country, and User-Agent.
- 🔗 **Universal Form Ingestion Endpoint (`/f/[form_key]`)**:
  - **HTML Forms**: Seamlessly accepts standard `POST` submissions (`x-www-form-urlencoded` and `multipart/form-data`) with automatic 303 redirect to `/thanks`.
  - **AJAX / Fetch**: Supports direct JSON `POST` requests with comprehensive CORS headers for modern Single-Page Applications (SPAs).
  - **Clean Thank You Page**: Clean, distraction-free confirmation strictly displaying:
    > *"Your data has been successfully submitted."*
- 🛠️ **Included Developer Testing Suite**:
  - `test-form.html`: Standalone interactive test page with live toggle between Standard POST and AJAX modes.
  - `public/test/`: The v1.1.0 3D parallax Outfit test interface migrated directly into the Next.js static engine.
  - `scripts/verify-e2e.mjs`: Automated 13-stage end-to-end integration test runner validating all auth, form, and submission flows.

### 🛠️ Technology Stack
- **Framework**: Next.js 16 (React 19, Turbopack)
- **Language**: TypeScript 5+
- **Database**: MongoDB Atlas (`FormFarmDB`)
- **Security**: `bcryptjs`, `jsonwebtoken`
- **Email**: `nodemailer`
- **Design System**: Vanilla CSS with custom properties, Google Fonts Orbitron & Inter, Bootstrap Icons

### ✍️ Author & Credits
> **MD SAMIUR RAHMAN TANIM**  
> 🔗 [GitHub](https://github.com/CodeWithTanim) | [LinkedIn](https://www.linkedin.com/in/codewithtanim/) | [YouTube](https://www.youtube.com/@CodeWithTanim)

---

### 📜 License
This project is **100% created by MD SAMIUR RAHMAN TANIM**. All rights reserved. Unauthorized copying or redistribution is strictly prohibited without explicit author consent.
