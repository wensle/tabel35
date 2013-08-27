<?php
include_once('db.php');

$grootheidSymbool = $_GET["grootheidSymbool"];

function getFormule($grootheidSymbool){
	// Formulate Query
	// This is the best way to perform an SQL query
	// For more examples, see mysql_real_escape_string()
	$queryFormule = sprintf("SELECT `formules`.`formule` , `grootheden`.`grootheid_symbool` FROM `webapp`.`formules` INNER JOIN `webapp`.`grootheden` ON `formules`.`grootheid_id` = `grootheden`.`grootheid_id` WHERE  `grootheden`.`grootheid_symbool` = %s",
$grootheidSymbool);

	// Perform Query
	$resultaatFormule = mysql_query($queryFormule);

	// Check result
	// This shows the actual query sent to MySQL, and the error. Useful for debugging.
	if (!$resultaatFormule) {
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $queryFormule;
		die($message);
	};

	$jsonResponse = array('formules' => array());

	while($row = mysql_fetch_array($resultaatFormule)){
		$jsonRow = array(
			"formule" => $row['formule'],
			"symbool" => $row['grootheid_symbool']
			);
		array_push($jsonResponse['formules'], $jsonRow);
	}

	echo json_encode($jsonResponse);

};

getFormule($grootheidSymbool);
?>