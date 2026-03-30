<?php

$router = new Router();

// Public Routes
$router->get('/', 'HomeController@index');
$router->get('/login', 'AuthController@login');
$router->post('/login', 'AuthController@loginPost');
$router->get('/register', 'AuthController@register');
$router->post('/register', 'AuthController@registerPost');
$router->get('/logout', 'AuthController@logout');

// Form Submission Endpoint (Public POST)
$router->post('/f/{form_key}', 'SubmissionController@submit');
$router->get('/f/{form_key}', 'SubmissionController@submit');

// Dashboard Routes (Requires Auth)
$router->get('/dashboard', 'DashboardController@index');
$router->get('/forms', 'FormController@index');
$router->get('/forms/create', 'FormController@create');
$router->post('/forms/create', 'FormController@createPost');
$router->get('/forms/{id}/submissions', 'SubmissionController@viewSubmissions');
$router->post('/forms/{id}/delete', 'FormController@delete'); // Using POST for deletion for safety
$router->post('/submissions/delete', 'SubmissionController@delete');

// Help Route
$router->get('/help', function () {
    require '../app/views/help.php';
});
