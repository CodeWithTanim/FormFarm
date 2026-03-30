<?php

class MailHelper
{
    /**
     * Sends a notification email to the form owner.
     * 
     * @param string $to The recipient email address.
     * @param string $formName The name of the form submitted.
     * @param array $data The submitted form data.
     * @return bool True on success, false on failure.
     */
    public static function sendSubmissionNotification($to, $formName, $data)
    {
        $subject = "New submission on " . $formName;

        // Build the email body
        $message = "You have received a new form submission on your website.\n\n";
        $message .= "Form Name: " . $formName . "\n";
        $message .= "Submitted at: " . date('Y-m-d H:i:s') . "\n\n";
        $message .= "--- Submission Details ---\n";

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = implode(', ', $value);
            }
            $message .= ucfirst($key) . ": " . $value . "\n";
        }

        $message .= "\n---\n";
        $message .= "Sent via FormFarm API";

        $headers = "From: FormFarm <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
        $headers .= "Reply-To: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Use native PHP mail()
        // Note: For XAMPP, you may need to configure sendmail.ini and php.ini
        // Suppress warning with @ for local development environments where SMTP is not configured
        try {
            return @mail($to, $subject, $message, $headers);
        } catch (Exception $e) {
            return false;
        }
    }
}
