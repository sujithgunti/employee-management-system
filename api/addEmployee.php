<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["first_name"])) {
    sendResponse(false, "first_name is required");
}
if (!isset($_POST["last_name"])) {
    sendResponse(false, "last_name is required");
}
if (!isset($_POST["date_of_joining"])) {
    sendResponse(false, "date_of_joining is required");
}
if (!isset($_POST["date_of_birth"])) {
    sendResponse(false, "date_of_birth is required");
}
if (!isset($_POST["gender"])) {
    sendResponse(false, "gender is required");
}
if (!isset($_POST["phone_no"])) {
    sendResponse(false, "phone_no is required");
}
if (!isset($_POST["working_status_id"])) {
    sendResponse(false, "working_status_id is required");
}
if (!isset($_POST["designation_id"])) {
    sendResponse(false, "designation_id is required");
}
if (!isset($_POST["location_id"])) {
    sendResponse(false, "location_id is required");
}
if (!isset($_POST["gross"])) {
    sendResponse(false, "gross is required");
}


$first_name = $_POST["first_name"];
$last_name = $_POST["last_name"];
$date_of_joining = $_POST["date_of_joining"];
$date_of_birth = $_POST["date_of_birth"];
$gender = $_POST["gender"];
$phone_no = $_POST["phone_no"];
$working_status_id = $_POST["working_status_id"];
$designation_id = $_POST["designation_id"];
$location_id = $_POST["location_id"];
$gross = $_POST["gross"];
// if (strlen($name) < 3 || strlen($email) > 25) {
//     sendResponse(false, "Name must be at least 3 characters and at most 25 characters");
// }

$pdo = connect();

$query = "SELECT * FROM users WHERE email = :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email already exists");
}


$query = "INSERT INTO employees (first_name, last_name, date_of_joining,date_of_birth,gender,phone_no,working_status_id,designation_id,location_id,gross) VALUES (:first_name, :last_name, :date_of_joining, :date_of_birth, :gender, :phone_no, :working_status_id, :designation_id, :location_id, :gross)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("first_name", $first_name, PDO::PARAM_STR);
$stmt->bindParam("last_name", $last_name, PDO::PARAM_STR);
$stmt->bindParam("date_of_joining", $date_of_joining, PDO::PARAM_STR);
$stmt->bindParam("date_of_birth", $date_of_birth, PDO::PARAM_STR); 
$stmt->bindParam("gender", $gender, PDO::PARAM_STR);
$stmt->bindParam("phone_no", $phone_no, PDO::PARAM_STR);   
$stmt->bindParam("working_status_id", $working_status_id, PDO::PARAM_STR); 
$stmt->bindParam("designation_id", $designation_id, PDO::PARAM_STR);   
$stmt->bindParam("location_id", $location_id, PDO::PARAM_STR); 
$stmt->bindParam("gross", $gross, PDO::PARAM_STR);
 


$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
}

sendResponse(false, "User registration failed");
