<?php

$nameFile = "data-1.json";
$file = fopen($nameFile, "r");
$data = fread($file, filesize($nameFile));
$dataArray = json_decode($data);
echo $data;

fclose($file);



 ?>