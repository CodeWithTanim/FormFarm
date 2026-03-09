# How to Run FormFarm Project Using XAMPP

Follow these steps to set up and run the FormFarm project on your local machine using XAMPP.

## 1. Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) installed on your system.
- The project files are located in `e:\xampp\htdocs\FormFarm`.

## 2. Start XAMPP Control Panel
1. Open the **XAMPP Control Panel**.
2. Click **Start** for both **Apache** and **MySQL** modules.
3. Ensure the Status icons turn green.

## 3. Database Setup
1. Open your web browser and go to `http://localhost/phpmyadmin/`.
2. Click on the **New** button in the left sidebar to create a new database.
3. Enter `formfarm` as the database name and click **Create**.
4. Click on the newly created `formfarm` database.
5. Click on the **Import** tab at the top.
6. Click **Choose File** and navigate to your project directory:
   `e:\xampp\htdocs\FormFarm\database\migrations\schema.sql`.
7. Click **Import** (at the bottom of the page).

## 4. Configuration Check
- Open `e:\xampp\htdocs\FormFarm\config\database.php`.
- Ensure the settings match your XAMPP MySQL credentials (usually `root` with no password).
```php
return [
    'host' => 'localhost',
    'dbname' => 'formfarm',
    'user' => 'root',
    'pass' => '',
];
```

## 5. Access the Project
- Open your browser and navigate to:
  `http://localhost/FormFarm/`
- The project's `.htaccess` will automatically route you to the `public/` folder.

## 6. Troubleshooting
- **404 Error**: If you see a "Not Found" error, ensure you are accessing the project via `http://localhost/FormFarm/`. The project is configured to handle the subdirectory automatically, but accessing it via `http://localhost/` will not work unless you move the files to the root `htdocs` folder.
- **Database Connection Error**: Double-check the `config/database.php` file and ensure MySQL is running in XAMPP.
- **Port Conflict**: If Apache fails to start, check if another application (like Skype or VMware) is using port 80 or 443.
