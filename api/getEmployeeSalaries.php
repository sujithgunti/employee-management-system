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

$query = "SELECT s.id, 
CONCAT(e.first_name, e.last_name) FullName,s.salary_year,s.salary_month,s.paid_on,e.gross,s.deduction,s.net
FROM employees e
INNER JOIN salaries s ON e.id = s.employee_id
WHERE e.id= :id";
$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $salaries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["salaries" => $salaries]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
