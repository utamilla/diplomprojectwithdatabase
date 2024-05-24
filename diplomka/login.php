<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registerdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Проверка пароля
        if (password_verify($password, $user['password'])) {
            echo json_encode(array("status" => "success", "message" => "Login successful.", "user" => $user));
        } else {
            echo json_encode(array("status" => "error", "message" => "Incorrect password."));
        }
    } else {
        echo json_encode(array("status" => "error", "message" => "User not found."));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}

$conn->close();
?>

