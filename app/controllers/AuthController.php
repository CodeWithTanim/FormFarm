<?php

class AuthController extends Controller
{
    public function login()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('/dashboard');
        }
        $this->view('auth/login');
    }

    public function loginPost()
    {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $userModel = new User();
        $user = $userModel->findByEmail($email);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $this->redirect('/dashboard');
        } else {
            $this->view('auth/login', ['error' => 'Invalid email or password']);
        }
    }

    public function register()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('/dashboard');
        }
        $this->view('auth/register');
    }

    public function registerPost()
    {
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        if (empty($name) || empty($email) || empty($password)) {
            $this->view('auth/register', ['error' => 'All fields are required']);
            return;
        }

        $userModel = new User();
        if ($userModel->findByEmail($email)) {
            $this->view('auth/register', ['error' => 'Email already exists']);
            return;
        }

        if ($userModel->create($name, $email, $password)) {
            $_SESSION['success'] = 'Account created! Please log in using your email and password.';
            $this->redirect('/login');
        } else {
            $this->view('auth/register', ['error' => 'Something went wrong']);
        }
    }

    public function logout()
    {
        session_destroy();
        $this->redirect('/login');
    }
}
