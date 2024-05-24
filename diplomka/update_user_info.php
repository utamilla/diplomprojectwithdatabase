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
$icon_url = $_POST['icon_url'];
$achievements = json_decode($_POST['achievements'], true);

$response = array();

// Обновляем URL иконки
$sql = "UPDATE users SET icon_url='$icon_url' WHERE email='$email'";
if ($conn->query($sql) !== TRUE) {
    $response['status'] = 'error';
    $response['message'] = $conn->error;
    echo json_encode($response);
    $conn->close();
    exit();
}

// Обновляем ачивки
foreach ($achievements as $key => $is_achieved) {
    $sql = "INSERT INTO achievements (user_email, achievement_key, is_achieved) 
            VALUES ('$email', '$key', '$is_achieved')
            ON DUPLICATE KEY UPDATE is_achieved='$is_achieved'";
    if ($conn->query($sql) !== TRUE) {
        $response['status'] = 'error';
        $response['message'] = $conn->error;
        echo json_encode($response);
        $conn->close();
        exit();
    }
}

$response['status'] = 'success';
$conn->close();

echo json_encode($response);
?>
