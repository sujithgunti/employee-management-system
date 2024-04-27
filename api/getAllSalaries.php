<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}

$pdo = connect();

$query = "SELECT 
e.id,s.id AS sno,CONCAT(e.first_name, e.last_name) FullName,s.salary_year,s.salary_month,s.paid_on,e.gross,s.deduction,s.net
FROM employees e
INNER JOIN salaries s ON e.id = s.employee_id ORDER BY e.id";
$stmt = $pdo->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    sendResponse(true, "Success", ["user" => $user]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
