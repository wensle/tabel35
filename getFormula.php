<?php
session_start();
include_once('db.php');
if(isset($_SESSION['idNode']))
    $_SESSION['idNode']++;
else
    $_SESSION['idNode'] = 1;
$grootheidSymbool = $_GET["grootheidSymbool"];

function getFormule($grootheidSymbool){
	// Formulate Query
	// This is the best way to perform an SQL query
	// For more examples, see mysql_real_escape_string()
	$queryFormule = sprintf(
		"SELECT groepen_formules.*, subgroepen_formules.*, grootheden.*, formules.*
			FROM webapp.groepen_formules
			    JOIN webapp.subgroepen_formules
			        ON webapp.subgroepen_formules.groep_formules_id = webapp.groepen_formules.groep_formules_id
			    JOIN webapp.formules
			        ON webapp.formules.subgroep_formules_id = webapp.subgroepen_formules.subgroep_formules_id
			    JOIN webapp.grootheden
			        ON webapp.grootheden.grootheid_id = webapp.formules.grootheid_id
			WHERE grootheden.grootheid_symbool = %s", $grootheidSymbool);

	// Perform Query
	$resultaatFormule = mysql_query($queryFormule);

	// Check result
	// This shows the actual query sent to MySQL, and the error. Useful for debugging.
	if (!$resultaatFormule) {
		$message  = 'Invalid query: ' . mysql_error() . "\n";
		$message .= 'Whole query: ' . $queryFormule;
		die($message);
	};

	$rows = array();

	$first = array(
		"id" => "node" . $_SESSION["idNode"],
		"name" => "",
		"data" => new stdClass(),
		"children" => array());

	while($row = mysql_fetch_array($resultaatFormule, MYSQL_ASSOC)){
		$rows[] = $row;
	}
	
	$first["name"] = $rows[0]["grootheid"];

	foreach ($rows as $row) {
		if (empty($first["children"])) {
			$first["children"][] = array(
				"id" => "node" . $_SESSION["idNode"],
				"name" => $row["groep_formules"],
				"data" => new stdClass(),
				"children" => array());
		}
		else{
			$lastElementSecond = end($first["children"]);
				if ($row["groep_formules"] !== $lastElementSecond["name"]) {
					$first["children"][] = array(
						"id" => "node" . $_SESSION["idNode"],
						"name" => $row["groep_formules"],
						"data" => new stdClass(),
						"children" => array());
				}

		}
	}

	foreach ($rows as $row) {
		foreach ($first["children"] as $firstIndex => $second) {
			if (empty($first["children"][$firstIndex]["children"])) {

				if ($first["children"][$firstIndex]["name"] == $row["groep_formules"]) {
				$first["children"][$firstIndex]["children"][] = array(
					"id" => "node" . $_SESSION["idNode"],
					"name" => $row["subgroep_formules"],
					"data" => new stdClass(),
					"children" => array());
				}

			} elseif ($first["children"][$firstIndex]["name"] == $row["groep_formules"]) {
				$lastElementThird = end($first["children"][$firstIndex]["children"]);
				if ($lastElementThird["name"] !== $row["subgroep_formules"]) {
						$first["children"][$firstIndex]["children"][] = array(
							"id" => "node" . $_SESSION["idNode"],
							"name" => $row["subgroep_formules"],
							"data" => new stdClass(),
							"children" => array());
				}
			}
		}//end foreach $first
	}// end foreach $rows

	foreach ($rows as $row) {
		foreach ($first["children"] as $firstIndex => $second) {
			foreach ($second["children"] as $secondIndex => $third) {
				 if ($first["children"][$firstIndex]["children"][$secondIndex]["name"] == $row["subgroep_formules"]) {
					$first["children"][$firstIndex]["children"][$secondIndex]["children"][] = array(
						"id" => "node" . $_SESSION["idNode"],
						"name" => $row["formule_omschrijving"],
						"data" => array(
							"formule" => $row["formule"],
							"symbool" => $row['grootheid_symbool']
							),
						"children" => array());
				}
			}
		}
	}


	header('Content-Type: application/json');
	echo json_encode($first);
	// print_r($first);
	};

getFormule($grootheidSymbool);
?>