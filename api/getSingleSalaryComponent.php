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

$query1 = "SELECT e.id,CONCAT(e.first_name, e.last_name) FullName,w.work_description,d.designation_description,l.district,e.gross,s.deduction,s.net from employees e LEFT JOIN working_status w ON e.working_status_id =w.id INNER JOIN designation d ON e.designation_id=d.id INNER JOIN location_details l ON e.location_id=l.id INNER JOIN salaries s ON e.id = s.employee_id WHERE e.id=:id";
$stmt1 = $pdo->prepare($query1);
$stmt1->bindParam("id", $id, PDO::PARAM_INT);
$stmt1->execute();


$query = "SELECT s.id,s.employee_id,
CONCAT(e.first_name, e.last_name) FullName,
sc.salary_description,
sd.amount
FROM salaries s
LEFT JOIN salary_details sd ON s.id = sd.salaries_id
INNER JOIN employees e ON s.employee_id = e.id
INNER JOIN salary_components sc ON sd.salary_component_id = sc.id
WHERE e.id=:id";
$stmt = $pdo->prepare($query);
$stmt->bindParam("id", $id, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0 && $stmt1->rowCount() > 0) {
    $details = $stmt1->fetch(PDO::FETCH_ASSOC);
    $salaries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["salaries" => $salaries,"details"=> $details]);
}

http_response_code(401);
sendResponse(false, "Data not Found");
