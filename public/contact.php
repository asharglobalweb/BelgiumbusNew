<?php
// api/contact.php

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set headers for CORS and JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Log the request for debugging
error_log("Contact form submission received at: " . date('Y-m-d H:i:s'));
error_log("POST data: " . print_r($_POST, true));

// reCAPTCHA verification - REPLACE WITH YOUR ACTUAL SECRET KEY
$recaptcha_secret = 'secret_key';
$recaptcha_token = $_POST['recaptcha_token'] ?? '';

if (empty($recaptcha_token)) {
    error_log("reCAPTCHA token missing");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Security verification failed. Please try again.']);
    exit;
}

// Verify reCAPTCHA
$recaptcha_verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_token}");
$recaptcha_data = json_decode($recaptcha_verify);

if (!$recaptcha_data->success) {
    error_log("reCAPTCHA verification failed: " . print_r($recaptcha_data, true));
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Security verification failed. Please try again.']);
    exit;
}

// Determine form type and prepare data
$form_type = $_POST['form_type'] ?? 'contact_page';
$to = "info@busrentalbelgium.com";

if ($form_type === 'contact_page') {
    // Contact Page Form (from Contact.tsx)
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $countryCode = htmlspecialchars(trim($_POST['countryCode'] ?? ''));
    $service = htmlspecialchars(trim($_POST['service'] ?? ''));
    $passengers = htmlspecialchars(trim($_POST['passengers'] ?? ''));
    $date = htmlspecialchars(trim($_POST['date'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($name) || empty($email) || empty($service) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    // Format phone number with country code
    $formatted_phone = '';
    if (!empty($countryCode) && !empty($phone)) {
        $formatted_phone = "{$countryCode} {$phone}";
    } elseif (!empty($phone)) {
        $formatted_phone = $phone;
    }

    $subject = "New Contact Form Submission - Belgium Bus Rental";
    
    $email_body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #667eea; }
            .footer { margin-top: 20px; padding: 20px; background: #eee; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Contact Form Submission</h1>
                <p>Belgium Bus Rental</p>
            </div>
            <div class='content'>
                <div class='field'><span class='field-label'>Name:</span> $name</div>
                <div class='field'><span class='field-label'>Email:</span> $email</div>
                <div class='field'><span class='field-label'>Phone:</span> $formatted_phone</div>
                <div class='field'><span class='field-label'>Service Needed:</span> $service</div>
                <div class='field'><span class='field-label'>Passengers:</span> $passengers</div>
                <div class='field'><span class='field-label'>Travel Date:</span> $date</div>
                <div class='field'><span class='field-label'>Message:</span><br>$message</div>
            </div>
            <div class='footer'>
                <p>This email was sent from the contact form on Belgium Bus Rental website.</p>
                <p>Received at: " . date('Y-m-d H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";

} else {
    // Quote Form (from Quote.tsx)
    $reason_for_travel = htmlspecialchars(trim($_POST['reason_for_travel'] ?? ''));
    $firstname = htmlspecialchars(trim($_POST['firstname'] ?? ''));
    $lastname = htmlspecialchars(trim($_POST['lastname'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $phone_with_code = htmlspecialchars(trim($_POST['phone_with_code'] ?? ''));
    $country_code = htmlspecialchars(trim($_POST['country_code'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));
    $pickup = htmlspecialchars(trim($_POST['pickup'] ?? ''));
    $destination = htmlspecialchars(trim($_POST['destination'] ?? ''));
    $date = htmlspecialchars(trim($_POST['date'] ?? ''));
    $passengers = htmlspecialchars(trim($_POST['passengers'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($firstname) || empty($lastname) || empty($email) || empty($phone) || empty($company) || empty($reason_for_travel)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }

    // Format phone number with country code for quote form
    $formatted_phone = !empty($phone_with_code) ? $phone_with_code : $phone;

    $subject = "New Quote Request - Belgium Bus Rental";
    
    $email_body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #667eea; }
            .footer { margin-top: 20px; padding: 20px; background: #eee; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Quote Request</h1>
                <p>Belgium Bus Rental</p>
            </div>
            <div class='content'>
                <div class='field'><span class='field-label'>Reason for Travel:</span> $reason_for_travel</div>
                <div class='field'><span class='field-label'>Name:</span> $firstname $lastname</div>
                <div class='field'><span class='field-label'>Email:</span> $email</div>
                <div class='field'><span class='field-label'>Phone:</span> $formatted_phone</div>
                <div class='field'><span class='field-label'>Company/School:</span> $company</div>
                <div class='field'><span class='field-label'>Pickup Location:</span> $pickup</div>
                <div class='field'><span class='field-label'>Destination:</span> $destination</div>
                <div class='field'><span class='field-label'>Travel Date:</span> $date</div>
                <div class='field'><span class='field-label'>Passengers:</span> $passengers</div>
                <div class='field'><span class='field-label'>Additional Message:</span><br>$message</div>
            </div>
            <div class='footer'>
                <p>This email was sent from the quote form on Belgium Bus Rental website.</p>
                <p>Received at: " . date('Y-m-d H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
}

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    error_log("Email sent successfully to: $to");
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    error_log("Failed to send email to: $to");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
}
?>