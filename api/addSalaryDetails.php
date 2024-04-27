<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    http_response_code(400);
    sendResponse(false, "id is required");
}

if (!isset($_POST["basic"])) {
    sendResponse(false, "basic is required");
}
if (!isset($_POST["DA"])) {
    sendResponse(false, "DA is required");
}
if (!isset($_POST["HRA"])) {
    sendResponse(false, "HRA is required");
}
if (!isset($_POST["CA"])) {
    sendResponse(false, "CA is required");
}
if (!isset($_POST["Medical_Allowance"])) {
    sendResponse(false, "Medical_Allowance is required");
}
if (!isset($_POST["Bonus"])) {
    sendResponse(false, "Bonus is required");
}
if (!isset($_POST["TDS"])) {
    sendResponse(false, "TDS is required");
}
if (!isset($_POST["TDS"])) {
    sendResponse(false, "TDS is required");
}


$id = $_POST["id"];
$basic = $_POST["basic"];
$DA = $_POST["DA"];
$HRA = $_POST["HRA"];
$CA = $_POST["CA"];
$Medical_Allowance = $_POST["Medical_Allowance"];
$Bonus = $_POST["Bonus"];
$TDS = $_POST["TDS"];
$PF = $_POST["PF"];

$pdo = connect();
$query = "INSERT INTO salary_details (salaries_id, salary_component_id, amount) 
VALUES (:salaries_id, 1, :amount),
(:salaries_id, 2, :amount),
(:salaries_id, 3, :amount),
(:salaries_id, 4, :amount),
(:salaries_id, 5, :amount),
(:salaries_id, 6, :amount),
(:salaries_id, 7, :amount),
(:salaries_id, 8, :amount)";

$stmt1 = $pdo->prepare($query);
$stmt1->bindParam(":salaries_id", $id, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $basic, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $DA, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $HRA, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $CA, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $Medical_Allowance, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $Bonus, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $TDS, PDO::PARAM_INT);
$stmt1->bindParam(":amount", $PF, PDO::PARAM_INT);
$stmt1->execute();




if ( $stmt1->rowCount() > 0) {
    sendResponse(true, "Salary added");
}

http_response_code(401);
sendResponse(false, "Salary not inserted");
