 <?php

require("./utils/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "GET") {
    sendResponse(false, "Invalid request method");
}

$pdo = connect();

$query = "SELECT e.id,e.first_name, e.last_name,e.date_of_joining,e.date_of_birth,e.gender,e.phone_no,w.work_description,d.designation_description,l.district,e.gross from employees e LEFT JOIN working_status w ON e.working_status_id =w.id INNER JOIN designation d ON e.designation_id=d.id INNER JOIN location_details l ON e.location_id=l.id ORDER BY e.id";
$stmt = $pdo->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    sendResponse(true, "Success", ["user" => $user]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
