<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registerdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$usersData = json_decode($_POST['usersData'], true);

foreach ($usersData as $email => $user) {
    $name = $user['name'];
    $password = $user['password'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashed_password') ON DUPLICATE KEY UPDATE name='$name', password='$hashed_password'";

    if ($conn->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
echo json_encode(array("status" => "success", "message" => "Data saved successfully."));
?>
