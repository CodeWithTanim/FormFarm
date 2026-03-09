# Hosting FormFarm on Hostinger

This guide provides step-by-step instructions for hosting the FormFarm application on Hostinger.

## Prerequisites

- Active Hostinger account with hosting plan
- SSH access enabled (available on most Hostinger plans)
- Git installed locally (optional but recommended)
- FileZilla or similar FTP client

## Steps to Deploy

### 1. Prepare Your Hostinger Account

1. Log in to your [Hostinger dashboard](https://hpanel.hostinger.com/)
2. Navigate to **Hosting** → Select your hosting account
3. Go to **Advanced** → **SSH Access** and ensure it's enabled
4. Note your SSH credentials:
   - Host: Your server address (usually shown in hPanel)
   - Username: SSH username (from hPanel)
   - Password: SSH password (from hPanel)

### 2. Upload Files via FTP/SFTP

#### Option A: Using File Manager (Easiest)

1. In hPanel, go to **File Manager**
2. Navigate to the `public_html` directory
3. Upload all FormFarm files to this directory
4. Ensure the folder structure matches the project layout

#### Option B: Using FileZilla (FTP)

1. Open FileZilla
2. Create a new site with Hostinger's FTP credentials:
   - Host: Your FTP server address
   - Username: FTP username
   - Password: FTP password
   - Port: 21 (standard FTP) or 22 (SFTP)
3. Connect and upload all FormFarm files to `public_html/`

### 3. Database Setup

1. In hPanel, go to **Databases** → **MySQL**
2. Create a new database:
   - Database name: `formfarm_db`
   - Username: Create new user or use automatic
   - Password: Generate a strong password
3. Note the database credentials

4. Import the database schema:
   - Go to **Database Manager** → **phpMyAdmin**
   - Select your newly created database
   - Go to **Import** tab
   - Upload `database/migrations/schema.sql`
   - Click **Import**

### 4. Configure Environment Variables

1. Update `config/database.php` with Hostinger database credentials:

```php
define('DB_HOST', 'your-hostinger-mysql-host');
define('DB_USER', 'your_db_username');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'formfarm_db');
```

2. Update `public/index.php` if needed to match your environment

### 5. Configure .htaccess (For Clean URLs)

Create a `.htaccess` file in the `public/` directory:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php?/$1 [QSA,L]
</IfModule>
```

### 6. Set File Permissions

SSH into your server:

```bash
ssh your_username@your_hostinger_host
```

Set proper permissions:

```bash
chmod 755 /home/your_username/public_html/
chmod -R 755 /home/your_username/public_html/storage/
chmod -R 755 /home/your_username/public_html/storage/logs/
chmod -R 755 /home/your_username/public_html/storage/cache/
```

### 7. Verify Installation

1. Navigate to your domain in a browser: `https://yourdomain.com`
2. If you see the home page, congratulations! Your site is live
3. Test the login/register functionality
4. Check the logs in `storage/logs/` for any errors

## Troubleshooting

### 500 Internal Server Error

- Check `storage/logs/` for error messages
- Verify `config/database.php` credentials
- Ensure `.htaccess` is in the correct location
- Verify extensions are enabled in PHP settings

### Database Connection Failed

- Verify database host, username, and password in `config/database.php`
- Ensure database user has proper privileges
- Check if MySQL is running in hPanel

### File Permissions Issues

- SSH into the server and verify permissions with `ls -la`
- Re-run the `chmod` commands from Step 6

### Email Not Sending

- Configure SMTP in `app/helpers/MailHelper.php`
- Update with Hostinger's SMTP credentials (usually found in hPanel)
- Enable "Less secure app access" if using Gmail as provider

## Performance Optimization

1. Enable caching in Hostinger (hPanel → Performance)
2. Enable Gzip compression
3. Set up SSL/TLS certificate (Hostinger provides free Let's Encrypt)
4. Use Hostinger's CDN if available on your plan

## SSL/HTTPS Certificate

1. In hPanel, go to **Security** → **SSL Certificates**
2. Select your domain
3. Click **Manage** → **Install** (for free Let's Encrypt)
4. Wait for installation to complete
5. Update your site URL in config files if necessary

## Regular Maintenance

- **Backups**: Set up automatic backups in hPanel
- **Updates**: Keep PHP version updated
- **Monitor**: Check logs regularly for issues
- **Security**: Regularly update permission settings

## Support

- Hostinger Support: Available 24/7 in hPanel
- FormFarm Issues: Check README.md for project documentation
- Database Questions: Visit Hostinger's knowledge base

---

**Last Updated**: March 2026
