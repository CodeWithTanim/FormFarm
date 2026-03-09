<?php

/**
 * Escapes HTML output
 */
function e($value)
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

/**
 * Debug helper
 */
function dd($data)
{
    echo '<pre>';
    print_r($data);
    echo '</pre>';
    die();
}

/**
 * Redirects to a given URL.
 */
function redirect($url)
{
    header("Location: " . url($url));
    exit;
}

/**
 * Returns the full URL for a given path, handling subdirectories.
 */
function url($path = '')
{
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];

    // Get the directory of the current script (index.php)
    $scriptDir = dirname($_SERVER['SCRIPT_NAME']); // e.g. /FormFarm/public
    $basePath = str_replace('/public', '', $scriptDir); // e.g. /FormFarm
    $basePath = rtrim($basePath, '/\\');

    return $protocol . "://" . $host . $basePath . '/' . ltrim($path, '/');
}
