<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registerdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_GET['email'];

// Получаем основную информацию о пользователе
$sql = "SELECT name, icon_url FROM users WHERE email='$email'";
$result = $conn->query($sql);

$user = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $user['name'] = $row['name'];
    $user['icon_url'] = $row['icon_url'];
}

// Получаем информацию об ачивках
$sql = "SELECT achievement_key, is_achieved FROM achievements WHERE user_email='$email'";
$result = $conn->query($sql);

$achievements = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $achievements[$row['achievement_key']] = $row['is_achieved'];
    }
}

$user['achievements'] = $achievements;

$conn->close();

echo json_encode($user);
?>
