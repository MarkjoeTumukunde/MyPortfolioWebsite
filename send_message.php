<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize input data to prevent security issues
    $name = htmlspecialchars($_POST['name']);
    $company = htmlspecialchars($_POST['company']);
    $gender = htmlspecialchars($_POST['gender']);
    $email = htmlspecialchars($_POST['email']);
    $mobile = htmlspecialchars($_POST['mobile']);
    $message = htmlspecialchars($_POST['message']);

    // Basic validation to ensure fields are not empty
    if (empty($name) || empty($company) || empty($gender) || empty($email) || empty($mobile) || empty($message)) {
        echo "All fields are required!";
        exit();
    }

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Gmail SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'tumukundemarkjoe@gmail.com';  // Your Gmail email address
        $mail->Password = 'axob lxfn ttef cxwq';    // Replace with your Gmail App Password (or use your password if 2FA is off)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('tumukundemarkjoe@gmail.com', 'No Reply');  // Your Gmail address as the "From" address
        $mail->addAddress('tumukundemarkjoe@gmail.com', 'Markjoe Tumukunde');  // Your recipient's email address

        // Content
        $mail->isHTML(false);  // Send as plain text
        $mail->Subject = 'New Contact Message from ' . $name;
        $mail->Body = "Name: " . $name . "\n" .
                      "Company: " . $company . "\n" .
                      "Gender: " . $gender . "\n" .
                      "Email: " . $email . "\n" .
                      "Mobile: " . $mobile . "\n" .
                      "Message: " . $message . "\n";

        // Send the email
        if ($mail->send()) {
            echo "Message sent successfully!";
        } else {
            echo "Message could not be sent.";
        }
    } catch (Exception $e) {
        // Show the error message if mail sending fails
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
