<?php

function auth_middleware()
{
    if (!isset($_SESSION['user_id'])) {
        header('Location: ' . url('/login'));
        exit;
    }
}
