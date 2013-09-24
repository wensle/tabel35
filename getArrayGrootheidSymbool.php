<?php
include_once('db.php');

            function getArrSymboolGrootheid (){
                $querySymboolGrootheid = sprintf("SELECT `grootheid_symbool` FROM `webapp`.`grootheden`");

                $resultaatSymboolGrootheid = mysql_query($querySymboolGrootheid);

                if (!$resultaatSymboolGrootheid) {
                    $message  = 'Invalid query: ' . mysql_error() . "\n";
                    $message .= 'Whole query: ' . $querySymboolGrootheid;
                    die($message);
                }

                while ($rowSymboolGrootheid = mysql_fetch_array($resultaatSymboolGrootheid)) {
                    $arrSymboolGrootheid[]=$rowSymboolGrootheid['grootheid_symbool'];
                }
                header('Content-Type: application/json');
                echo json_encode($arrSymboolGrootheid);

            };

            getArrSymboolGrootheid();

			?>
            



