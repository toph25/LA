<?php header('Access-Control-Allow-Origin: *');
  /*header('Content-Type: text/plain');
  $test = utf8_encode($_POST['test']); // Don't forget the encoding
  $data = json_decode($test);
  echo $data->test;
  exit();*/
$name = $_POST['postname'];
echo $name;
 ?>
