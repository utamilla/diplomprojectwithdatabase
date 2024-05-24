<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "registerdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_email = $_POST['email'];
$achievements = json_decode($_POST['achievements'], true);

foreach ($achievements as $key => $is_achieved) {
    $sql = "INSERT INTO achievements (user_email, achievement_key, is_achieved)
            VALUES ('$user_email', '$key', $is_achieved)
            ON DUPLICATE KEY UPDATE is_achieved=$is_achieved";

    if ($conn->query($sql) === FALSE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();

echo json_encode(array("status" => "success", "message" => "Achievements saved successfully."));
?>

