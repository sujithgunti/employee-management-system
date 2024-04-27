<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    http_response_code(400);
    sendResponse(false, "id is required");
}

$id = $_POST["id"];

$pdo = connect();

$query = "SELECT * FROM employees WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $employee = $stmt->fetch(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["employee" => $employee]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
