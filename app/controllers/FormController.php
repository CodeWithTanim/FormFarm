<?php

class FormController extends Controller
{
    public function __construct()
    {
        auth_middleware();
    }

    public function index()
    {
        $formModel = new Form();
        $forms = $formModel->allByUserId($_SESSION['user_id']);
        $this->view('dashboard/forms', ['forms' => $forms]);
    }

    public function create()
    {
        $this->view('dashboard/create-form');
    }

    public function createPost()
    {
        $name = $_POST['name'] ?? '';
        if (empty($name)) {
            $this->view('dashboard/create-form', ['error' => 'Form name is required']);
            return;
        }

        $key = bin2hex(random_bytes(8)); // Secure random 16-char key
        $formModel = new Form();

        if ($formModel->create($_SESSION['user_id'], $name, $key)) {
            $this->redirect('/forms');
        } else {
            $this->view('dashboard/create-form', ['error' => 'Could not create form']);
        }
    }

    public function delete($id)
    {
        $formModel = new Form();
        $formModel->delete($id, $_SESSION['user_id']);
        $this->redirect('/forms');
    }
}
