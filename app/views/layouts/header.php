<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FormFarm – Future of Form Collection</title>

    <meta name="description"
        content="FormFarm is a powerful form backend service that lets developers collect form submissions without building a backend. Create unlimited forms and manage submissions easily.">
    <meta name="keywords"
        content="form backend, formspree alternative, form api, collect form submissions, developer form service, formfarm">
    <meta name="author" content="FormFarm">

    <link rel="canonical" href="https://formfarm.free.nf/">

    <!-- Open Graph -->
    <meta property="og:title" content="FormFarm – Future of Form Collection">
    <meta property="og:description" content="Create unlimited forms and collect submissions without backend.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://formfarm.free.nf/">
    <meta property="og:image" content="https://formfarm.free.nf/public/assets/images/FormFarm.png">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="FormFarm – Future of Form Collection">
    <meta name="twitter:description" content="Create forms and collect submissions instantly.">
    <meta name="twitter:image" content="https://formfarm.free.nf/public/assets/images/FormFarm.png">

    <!-- Structured Data for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "FormFarm",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "description": "FormFarm is a developer friendly form backend service that allows you to collect form submissions without building a backend.",
        "url": "https://formfarm.free.nf/"
    }
    </script>

    <link rel="icon" type="image/png" href="<?php echo url('/public/assets/images/FormFarm.png'); ?>">
    <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@300;400;600&display=swap"
        rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root {
            --primary-bg: #000000;
            --accent-red: #ff0a0a;
            --accent-red-hover: #ff3b3b;
            --header-red: #ff4c4c;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
            background-color: var(--primary-bg);
            color: #ffffff;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        h1 {
            color: var(--header-red);
            font-family: 'Orbitron', sans-serif;
            font-size: 42px;
            margin-bottom: 15px;
            letter-spacing: 2px;
        }

        h2,
        h3,
        .navbar-brand {
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 2px;
        }

        .navbar {
            background: rgba(0, 0, 0, 0.8) !important;
            backdrop-filter: blur(15px);
            border-bottom: 1px solid var(--glass-border);
            padding: 1rem 0;
        }

        .navbar-brand {
            color: var(--header-red) !important;
            text-transform: uppercase;
            font-size: 24px;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.8) !important;
            transition: 0.3s;
            font-size: 1.2rem;
            padding: 0.5rem 1rem !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-link:hover {
            color: var(--header-red) !important;
            transform: translateY(-2px);
            text-shadow: 0 0 10px rgba(255, 76, 76, 0.5);
        }

        .btn-primary {
            background-color: var(--accent-red);
            border: none;
            border-radius: 6px;
            padding: 12px 25px;
            font-weight: 600;
            color: white;
            font-size: 16px;
            transition: 0.3s;
            text-transform: none;
            letter-spacing: normal;
        }

        .btn-primary:hover {
            background-color: var(--accent-red-hover);
            box-shadow: 0 0 20px rgba(255, 10, 10, 0.5);
        }

        .btn-outline-light {
            border-radius: 6px;
            padding: 12px 25px;
            transition: 0.3s;
        }

        .card {
            background: var(--glass-bg);
            backdrop-filter: blur(5px);
            border: 1px solid var(--glass-border);
            color: white;
            transition: 0.3s;
        }

        .card:hover {
            border-color: var(--accent-red);
            transform: translateY(-5px);
        }

        #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top mb-4">
        <div class="container flex-grow-1">
            <a class="navbar-brand fw-bold" href="<?php echo url('/'); ?>">FormFarm</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo url('/dashboard'); ?>" title="Dashboard">
                                <i class="bi bi-speedometer2"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo url('/forms'); ?>" title="My Forms">
                                <i class="bi bi-file-earmark-text"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger fw-bold" href="<?php echo url('/help'); ?>" title="Help?">
                                <i class="bi bi-question-circle"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo url('/logout'); ?>"
                                title="Logout (<?php echo strtoupper($_SESSION['user_name'] ?? 'USER'); ?>)">
                                <i class="bi bi-box-arrow-right"></i>
                            </a>
                        </li>
                    <?php else: ?>
                        <li class="nav-item">
                            <a class="nav-link text-danger fw-bold" href="<?php echo url('/help'); ?>" title="Help?">
                                <i class="bi bi-question-circle"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo url('/login'); ?>" title="Login">
                                <i class="bi bi-box-arrow-in-right"></i>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo url('/register'); ?>" title="Register">
                                <i class="bi bi-person-plus"></i>
                            </a>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">