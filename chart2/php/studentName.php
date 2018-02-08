<?php header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'password');
define('DB_NAME', 'la');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

$query = sprintf("SELECT * FROM students ORDER BY Student_ID");
$result = $mysqli->query($query);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}


$result->close();
$mysqli->close();

print json_encode($data);
?>