<?php

session_start();

// Autoload core classes and controllers
spl_autoload_register(function ($class) {
    $paths = [
        '../app/controllers/',
        '../app/models/',
        '../core/',
        '../database/',
        '../app/middleware/',
        '../app/helpers/'
    ];

    foreach ($paths as $path) {
        $file = $path . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

require_once '../app/helpers/functions.php';
require_once '../app/middleware/auth.php';
require_once '../routes/web.php';

$url = $_GET['url'] ?? '/';
$router->dispatch($url);
