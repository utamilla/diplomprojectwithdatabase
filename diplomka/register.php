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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(array("status" => "error", "message" => "A user with this email already exists."));
    } else {
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("status" => "success", "message" => "Registration successful."));
        } else {
            echo json_encode(array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error));
        }
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method."));
}

$conn->close();
?>


