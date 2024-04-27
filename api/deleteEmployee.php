<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    sendResponse(false, "id is required");
}


$id = $_POST["id"];


$pdo = connect();

$query ="DELETE FROM employees WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_INT);


$stmt->execute();



if ($stmt->rowCount() > 0) {
    sendResponse(true, "Successfully deleted", ["id" => $id]);
}

sendResponse(false, "Can't Login, Please try again!");
