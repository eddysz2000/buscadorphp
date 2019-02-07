<?php

$nameFile = "data-1.json";
$file = fopen($nameFile, "r");
$data = fread($file, filesize($nameFile));
//$ciudad = $_POST['ciudad'];
$ciudad = 'Orlando';
$dataArray = json_decode($data, true);
$dataArrayDetalle = $dataArray[1]['Ciudad'];

$elementos = count($dataArray);

print_r($dataArrayDetalle);

//if ($dataArrayDetalle['Ciudad']==$ciudad){
	//array_diff($dataArray,['Orlando']);
//}
//print_r($dataArray);
//print_r(array_keys($dataArray));

//print_r($dataArray);

/*function filtrarJson($json){

    //Decodes a JSON string, When TRUE, it will be converted into associative arrays. 
    $array = json_decode($json, true);

    //count number of inner arrays
    $nbr = count($array);

    //get all keys of the inner array
    $keys = array_keys($array[0]);

    //iterate through the keys
    foreach($keys as $key){

        //check every inner array per key
        for($x=0; $x<$nbr; $x++){

            if($array[$x][$key]==$ciudad){
            	//if not 0 than break
            	
            	if($array[$x][$key] != "0"){
	                break;
            	}

	            //if we didn't break before the last array, all values are 0 and we can unset those values.     
    	        if($x == $nbr-1){

        	        //iterate through the arrays 
            	    for($x=0; $x<$nbr; $x++){
                	    unset($array[$x][$key]);
                	}

            	}

            }

            
        }
    }

    $json = json_encode($array);
    return $json;
}

$newJson = filtrarJson($data);

echo $newJson;

*/

//echo $data;

fclose($file);



 ?>