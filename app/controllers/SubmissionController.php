<?php

class SubmissionController extends Controller
{
    // Public endpoint for POST requests
    public function submit($form_key)
    {
        $formModel = new Form();
        $form = $formModel->findByKey($form_key);

        if (!$form) {
            http_response_code(404);
            echo "Form not found.";
            return;
        }

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->view('endpoint_active');
            return;
        }

        // Collect all POST data except any system/hidden fields if needed
        $data = $_POST;

        $submissionModel = new Submission();
        if ($submissionModel->create($form['id'], $data)) {
            // Send email notification to form owner
            $userModel = new User();
            $owner = $userModel->findById($form['user_id']);

            if ($owner && !empty($owner['email'])) {
                // Include helper if not auto-loaded
                require_once '../app/helpers/MailHelper.php';
                MailHelper::sendSubmissionNotification($owner['email'], $form['form_name'], $data);
            }

            // Success - redirect or show thank you
            $this->view('thanks', [
                'form_name' => $form['form_name']
            ]);
        } else {
            http_response_code(500);
            echo "Failed to save submission.";
        }
    }

    // Private view for dashboard
    public function viewSubmissions($id)
    {
        auth_middleware();

        $formModel = new Form();
        $form = $formModel->findById($id);

        if (!$form || $form['user_id'] != $_SESSION['user_id']) {
            $this->redirect('/forms');
        }

        $submissionModel = new Submission();
        $submissions = $submissionModel->allByFormId($id);

        $this->view('dashboard/submissions', [
            'form' => $form,
            'submissions' => $submissions
        ]);
    }
}
