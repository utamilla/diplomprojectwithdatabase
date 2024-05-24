<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registerdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$xp = $_POST['xp'];

$sql = "UPDATE users SET xp='$xp' WHERE email='$email'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "success"));
} else {
    echo json_encode(array("status" => "error", "message" => $conn->error));
}

$conn->close();
?>
