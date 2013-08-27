<?php

function getArrSymboolGrootheid (){
	$querySymboolGrootheid = sprintf("SELECT `grootheid_symbool` FROM `webapp`.`grootheden`");
	$resultaatSymboolGrootheid = mysql_query($querySymboolGrootheid);
	if (!$resultaatSymboolGrootheid) {
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $querySymboolGrootheid;
		die($message);
}

$arrSymboolGrootheid = array();

while ($rowSymboolGrootheid = mysql_fetch_row($resultaatSymboolGrootheid)) {
	foreach ($rowSymboolGrootheid as $symboolGrootheid) {
		if (!in_array($symboolGrootheid, $arrSymboolGrootheid)) {
			$arrSymboolGrootheid[]=$symboolGrootheid;
			}
			};
}

return $arrSymboolGrootheid;

};

function getFormule($grootheidID, $arrSymboolGrootheid){
	// Formulate Query
	// This is the best way to perform an SQL query
	// For more examples, see mysql_real_escape_string()
	$queryFormule = sprintf("SELECT `formules`.`formule` , `grootheden`.`grootheid_symbool` FROM `webapp`.`formules` INNER JOIN `webapp`.`grootheden` ON `formules`.`grootheid_id` = %s AND `grootheden`.`grootheid_id` = %s",
$grootheidID, $grootheidID);

	// Perform Query
	$resultaatFormule = mysql_query($queryFormule);

	// Check result
	// This shows the actual query sent to MySQL, and the error. Useful for debugging.
	if (!$resultaatFormule) {
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $queryFormule;
		die($message);
	};

	/**
	 * Zolang er een row word gereturned (door functie mysql_fetch_row)
	 * dan wordt de formule gestopt in $formule
	 * en de grootheid in $symbool
	 * voor elke row
	 */
	
	/**
	 * Dit gaat een JSON object maken, daarom een associative array.
	 */
	
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

?>