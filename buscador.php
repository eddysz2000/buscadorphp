<?php

$nameFile = "data-1.json";
$file = fopen($nameFile, "r");
$data = fread($file, filesize($nameFile));
$ciudad = $_POST['ciudad'];
$tipo = $_POST['tipo'];
$todos = $_POST['todos'];
$desde = $_POST['from'];
$hasta = $_POST['to'];
$dataArray = json_decode($data, true);
$elementos = count($dataArray);

if (!$todos){
	for ($i=0;$i<$elementos;$i++){
		$precio = substr($dataArray[$i]['Precio'],1);
		$precio = str_replace(',', '', $precio);

		if ($precio>=$desde and $precio<=$hasta) {
			if ($ciudad and !$tipo){
				if ($dataArray[$i]['Ciudad']!=$ciudad) {
					unset($dataArray[$i]);
				}
			}else if(!$ciudad and $tipo){
				if ($dataArray[$i]['Tipo']!=$tipo) {
					unset($dataArray[$i]);
				}
			}else if($ciudad and $tipo){
				if ($dataArray[$i]['Ciudad']!=$ciudad || $dataArray[$i]['Tipo']!=$tipo) {
					unset($dataArray[$i]);
				}
			}
		}else{
			unset($dataArray[$i]);
		}
	}

	$newdata = json_encode(array_merge($dataArray));
	echo $newdata;
}else{
	
	echo $data;
}


fclose($file);

?>