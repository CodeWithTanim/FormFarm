<?php

class Controller
{
    protected function view($view, $data = [])
    {
        extract($data);
        require_once "../app/views/{$view}.php";
    }

    protected function redirect($url)
    {
        header("Location: " . url($url));
        exit;
    }
}
