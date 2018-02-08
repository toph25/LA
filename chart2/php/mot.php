<?php header('Access-Control-Allow-Origin: *');


if (isset($_POST['student1'])){ 
	$a = $_POST['student1']; 
	/*$command = escapeshellcmd('tr.py '.$a);*/
	$o = shell_exec("tr.py ".escapeshellarg($a));
	$output = trim(preg_replace('/\s\s+/', ' ', $o));
	echo $output;
	return $output;
}

?>