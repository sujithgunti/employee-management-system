<?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method");
}

if (!isset($_POST["id"])) {
    http_response_code(400);
    sendResponse(false, "id is required");
}
if (!isset($_POST["salary_month"])) {
    sendResponse(false, "salary_month is required");
}
if (!isset($_POST["salary_year"])) {
    sendResponse(false, "salary_year is required");
}
if (!isset($_POST["paid_on"])) {
    sendResponse(false, "paid_on is required");
}
// if (!isset($_POST["basic"])) {
//     sendResponse(false, "basic is required");
// }
// if (!isset($_POST["DA"])) {
//     sendResponse(false, "DA is required");
// }
// if (!isset($_POST["HRA"])) {
//     sendResponse(false, "HRA is required");
// }
// if (!isset($_POST["CA"])) {
//     sendResponse(false, "CA is required");
// }
// if (!isset($_POST["Medical_Allowance"])) {
//     sendResponse(false, "gross is required");
// }
// if (!isset($_POST["Bonus"])) {
//     sendResponse(false, "gross is required");
// }
// if (!isset($_POST["TDS"])) {
//     sendResponse(false, "gross is required");
// }
// if (!isset($_POST["PF"])) {
//     sendResponse(false, "gross is required");
// }
if (!isset($_POST["gross"])) {
    sendResponse(false, "gross is required");
}
if (!isset($_POST["deduction"])) {
    sendResponse(false, "deduction is required");
}
if (!isset($_POST["net"])) {
    sendResponse(false, "net is required");
}

$id = $_POST["id"];
$salary_month = $_POST["salary_month"];
$salary_year = $_POST["salary_year"];
$paid_on = $_POST["paid_on"];
// $basic = $_POST["basic"];
// $DA = $_POST["DA"];
// $HRA = $_POST["HRA"];
// $CA = $_POST["CA"];
// $Medical_Allowance = $_POST["Medical_Allowance"];
// $Bonus = $_POST["Bonus"];
// $TDS = $_POST["TDS"];
// $PF = $_POST["PF"];
$gross = $_POST["gross"];
$deduction = $_POST["deduction"];
$net = $_POST["net"];

$pdo = connect();
$query = "INSERT INTO salaries (employee_id, salary_month, salary_year,paid_on,gross,deduction,net) VALUES (:employee_id, :salary_month, :salary_year, :paid_on, :gross, :deduction, :net)";

$stmt1 = $pdo->prepare($query);
$stmt1->bindParam("employee_id", $id, PDO::PARAM_INT);
$stmt1->bindParam("salary_month", $salary_month, PDO::PARAM_INT);
$stmt1->bindParam("salary_year", $salary_year, PDO::PARAM_INT);
$stmt1->bindParam("paid_on", $paid_on, PDO::PARAM_INT);
$stmt1->bindParam("gross", $gross, PDO::PARAM_INT);
$stmt1->bindParam("deduction", $deduction, PDO::PARAM_INT);
$stmt1->bindParam("net", $net, PDO::PARAM_INT);
$stmt1->execute();




if ( $stmt1->rowCount() > 0) {
    sendResponse(true, "Salary added");
}

http_response_code(401);
sendResponse(false, "Salary not inserted");
