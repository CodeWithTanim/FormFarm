<?php

class DashboardController extends Controller
{
    public function __construct()
    {
        auth_middleware();
    }

    public function index()
    {
        $formModel = new Form();
        $forms = $formModel->allByUserId($_SESSION['user_id']);

        // Basic stats
        $totalForms = count($forms);

        $this->view('dashboard/index', [
            'forms' => array_slice($forms, 0, 5), // Show last 5 forms
            'totalForms' => $totalForms
        ]);
    }
}
