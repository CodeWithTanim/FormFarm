# FormFarm 🚜 | Professional Form Backend Service (SaaS)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/MongoDB_Atlas-FormFarmDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
  <img src="https://img.shields.io/badge/Auth-JWT_%26_Bcrypt-blueviolet?style=for-the-badge" alt="Security Badge">
  <img src="https://img.shields.io/badge/Architecture-App_Router-green?style=for-the-badge" alt="Architecture Badge">
  
  <p align="center">
    <b>Live Website: <a href="http://form.codewithtanim.works/" style="color: #ff4c4c; text-decoration: none; font-weight: bold;">FormFarm</a></b>
  </p>
</p>

---

### 🌟 Project Overview

**FormFarm** is a developer-friendly, high-performance form backend service and private alternative to platforms like Formspree. It allows developers to collect, inspect, and manage HTML form submissions effortlessly without writing or maintaining dedicated backend servers for every project.

Simply point any HTML form's `action` attribute to your unique FormFarm endpoint (`/f/YOUR_KEY`), and FormFarm automatically handles storage in MongoDB, payload parsing, instant email dispatching, spam filtering, and dashboard telemetry!

---

### 🚀 Key Features & Highlights

- 👤 **Full User Authentication & Session Security**:
  - Secure register, login, and logout workflows.
  - Industry-standard password hashing using `bcryptjs` with cryptographically secure salts.
  - Stateless authentication powered by signed, `HttpOnly`, `SameSite=lax` JWT session cookies.

- 📊 **Dynamic Neural Dashboard**:
  - Real-time counter of active form endpoints.
  - Chronological activity stream of recent form transmissions.
  - Zero-lag, serverless data fetching optimized for high concurrency.

- 🔑 **Cryptographic Endpoint Keys**:
  - Generates secure, collision-resistant 16-character hexadecimal keys via Node.js `crypto.randomBytes(8)`.

- 📩 **Universal Public Ingestion Endpoint (`/f/[form_key]`)**:
  - **Standard Browser Forms**: Accepts traditional HTML form `POST` requests (`application/x-www-form-urlencoded` and `multipart/form-data`) with automatic HTTP 303 redirect to the confirmation page.
  - **Modern SPAs & AJAX**: Full support for `fetch()` / AJAX with JSON payloads (`application/json`) and comprehensive CORS headers (`Access-Control-Allow-Origin: *`).
  - **Automatic Field Parsing**: Seamlessly captures any input field names without requiring predefined database schemas.
  - Non-POST visits redirect to an informative `/endpoint_active` technical guide.

- 🌐 **Automated Client Telemetry & Geolocation**:
  - **Real IP Detection**: Accurately resolves client IP addresses through proxy and cloud headers (`x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`).
  - **Country & City Tracking**: Automatically determines the submitter's Country and City.
  - **Device & Browser Telemetry**: Captures client `User-Agent` headers.
  - Telemetry is stored directly in MongoDB and displayed with dedicated globe/pin badges on the dashboard.

- 👁️ **Submission Stream Viewer & Management**:
  - Reverse sequence indexing (`#1`, `#2`, ...) for instant chronological tracking.
  - Syntax-highlighted key-value payload inspector.
  - Individual packet purge and bulk select-all purge with confirmation safeguards.

- 📬 **Dual-Format Email Notifications (Nodemailer)**:
  - Form owners receive instant email notifications upon every submission.
  - Delivers both a rich, dark-themed responsive **HTML Email** and a clean **Plain Text** fallback.
  - Includes the complete submitted payload alongside the client's IP, City, Country, and User-Agent.

- 🎨 **Dark Sci-Fi Cyberpunk UI**:
  - Custom Vanilla CSS design system with custom properties (`--primary-bg: #000000`, `--accent-red: #ff0a0a`, `--header-red: #ff4c4c`).
  - Google Fonts **Orbitron** (headings and branding) and **Inter** (body typography).
  - High-performance HTML5 Canvas particle background with interactive red interconnecting lines and mouse repulsion/push effects.
  - Frosted glassmorphism cards (`backdrop-filter: blur(15px)`) and subtle neon red glowing hover states.

- 🧪 **Built-In Developer Testing Suite**:
  - **`test-form.html`**: Interactive standalone test file with live toggle between Standard POST and AJAX modes.
  - **`public/test/`**: High-security 3D parallax Outfit test interface accessible directly at `http://localhost:3000/test/index.html`.
  - **`scripts/verify-e2e.mjs`**: Automated 13-stage end-to-end integration test runner validating all auth, form, and submission flows.

---

### 🛠️ Technologies Used

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack, React 19) |
| **Language** | TypeScript 5+ (Strict Type Safety) |
| **Database** | MongoDB Atlas (Cluster Database: `FormFarmDB`) |
| **Authentication** | `bcryptjs`, `jsonwebtoken` (HttpOnly Signed Cookies) |
| **Email Forwarding** | `nodemailer` (HTML & Text Dispatcher) |
| **Icons & Fonts** | Bootstrap Icons (`bootstrap-icons`), Google Fonts (Orbitron, Inter, Outfit) |
| **Testing** | Node.js E2E Test Suite (`scripts/verify-e2e.mjs`) |

---

<div align="center">
  <img src="FormFarm_Lighthouse_Performance.png" alt="FormFarm Lighthouse Performance" width="800">
</div>

---

## 🌐 Live Demo

Experience FormFarm live: **[http://form.codewithtanim.works/](http://form.codewithtanim.works/)**

---

### 🗂️ Project Structure

```text
FormFarm/
├── public/                     ← Static Assets & Demonstration Files
│   ├── images/
│   │   └── FormFarm.png        ← Logo & Favicon
│   ├── test/                   ← Outfit 3D Parallax Client Test Form
│   └── FormFarm.png
├── src/                        ← Application Source Code
│   ├── app/                    ← Next.js App Router Pages & APIs
│   │   ├── api/                ← Backend REST API Handlers
│   │   │   ├── auth/           ← Authentication (Login, Register, Logout, Me)
│   │   │   ├── forms/          ← Form Management & Submissions Listing
│   │   │   └── submissions/    ← Bulk & Single Submission Purge
│   │   ├── dashboard/          ← Analytics & Recent Activity Dashboard
│   │   ├── endpoint_active/    ← GET Notice Information Page
│   │   ├── f/[form_key]/       ← Public POST Form Ingestion Handler
│   │   ├── forms/              ← Form Management & Copy Endpoint
│   │   │   ├── create/         ← Node Initialization Page
│   │   │   └── [id]/submissions/ ← Incoming Data Stream Viewer
│   │   ├── help/               ← Technical Documentation & Guide
│   │   ├── login/              ← Portal Access Page
│   │   ├── register/           ← Identity Creation Page
│   │   ├── thanks/             ← Submission Successful Page
│   │   ├── globals.css         ← FormFarm Dark Cyberpunk Design System
│   │   └── layout.tsx          ← Root Layout with Navbar, Footer & Particles
│   ├── components/             ← Reusable React Components
│   │   ├── Footer.tsx          ← Animated Credit to CodeWithTanim
│   │   ├── Navbar.tsx          ← Dynamic Sticky Glass Navigation
│   │   └── ParticlesBackground.tsx ← Canvas Particle Network (Mouse Repulse)
│   └── lib/                    ← Shared Core Utilities & Database
│       ├── auth.ts             ← Bcrypt Password Hashing & JWT Verification
│       ├── db.ts               ← MongoDB Models, Queries & Unique Indexes
│       ├── mail.ts             ← Nodemailer HTML/Text Email Helper
│       └── mongodb.ts          ← MongoDB Atlas Client Connection Pool
├── test/                       ← Standalone 3D Parallax Test Suite
│   ├── assets/                 ← Neural Background Assets
│   ├── index.html              ← Test Form Markup
│   ├── script.js               ← 3D Tilt & Transition Script
│   └── style.css               ← Outfit Glow Styling
├── test-form.html              ← Interactive Testing Form (Standard POST & AJAX)
├── scripts/
│   └── verify-e2e.mjs          ← 13-Point Automated E2E Test Runner
├── .env                        ← Environment Credentials
├── package.json
├── tsconfig.json
└── README.md
```

---

### 🚀 Getting Started

#### ✅ Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Database**: MongoDB Atlas Cluster (or local MongoDB server)

#### 🛠️ Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/CodeWithTanim/FormFarm.git
   cd FormFarm
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Atlas Connection
   MONGODB_USER=FormFarm
   MONGODB_PASS=your_password
   MONGODB_ATLAS_DRIVER_CONNECTION=mongodb://FormFarm:your_password@cluster-url/?ssl=true&replicaSet=atlas-shard-0&authSource=admin
   MONGODB_DB_NAME=FormFarmDB

   # Authentication Secret
   JWT_SECRET=your_super_secure_jwt_secret_key

   # Base URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # (Optional) SMTP Email Notifications
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

### 📖 Usage & Integration Guide

#### 1. Standard HTML Form (No JavaScript Needed)
Simply point your `<form>` element's `action` to your FormFarm endpoint:
```html
<form action="http://localhost:3000/f/YOUR_UNIQUE_KEY" method="POST">
  <input type="text" name="name" placeholder="Full Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```
*Upon submission, the browser automatically submits the data and redirects to the clean confirmation page.*

#### 2. Modern JavaScript / AJAX Form (`fetch`)
For Single Page Applications (Next.js, React, Vue, Svelte, or Vanilla JS):
```javascript
const formData = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Hello FormFarm!"
};

const response = await fetch("http://localhost:3000/f/YOUR_UNIQUE_KEY", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
});

const result = await response.json();
console.log(result); // { success: true, message: "Submission successful" }
```

---

### 📡 API Route Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Create a new user account |
| **POST** | `/api/auth/login` | Public | Authenticate user and issue JWT cookie |
| **POST** | `/api/auth/logout` | Authenticated | Invalidate session cookie |
| **GET** | `/api/auth/me` | Authenticated | Retrieve current session payload |
| **GET** | `/api/forms` | Authenticated | List all data nodes owned by user |
| **POST** | `/api/forms` | Authenticated | Create a new form with unique key |
| **DELETE**| `/api/forms/[id]` | Authenticated | Terminate form and cascade delete submissions |
| **GET** | `/api/forms/[id]/submissions`| Authenticated | View incoming data stream & telemetry |
| **POST** | `/api/submissions/delete` | Authenticated | Purge single or bulk submissions |
| **POST** | `/f/[form_key]` | Public (CORS) | Ingest incoming form submission |
| **GET** | `/f/[form_key]` | Public | Redirects to `/endpoint_active` guide |

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

This project is created by **MD SAMIUR RAHMAN TANIM**.

If anyone wants to use this project, they **MUST contact MD SAMIUR RAHMAN TANIM** to get explicit permission. Unauthorized use, distribution, or copying of this project will result in **legal actions**.

See the [LICENSE](LICENSE) file for more details.
