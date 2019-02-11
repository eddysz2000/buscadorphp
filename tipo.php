<?php

$nameFile = "data-1.json";
$file = fopen($nameFile, "r");
$data = fread($file, filesize($nameFile));
$dataArray = json_decode($data, true);

$elementos = count($dataArray);
$tipos = array();


for ($i=0;$i<$elementos;$i++){

	array_push($tipos, $dataArray[$i]['Tipo']);

}

$resultado = array_unique($tipos);

$newdata = json_encode(array_merge($resultado));

echo $newdata;
fclose($file);

?>