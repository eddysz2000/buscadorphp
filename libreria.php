<?php

function checkLogin($user, $pass, $data){
    foreach ($data as $key => $value) {
      if ($user==$value['username']) {
        if($pass==$value['password']){
          return true;
        }
      }
    }
    return false;
}

function getData(){
    $data_file = fopen("data-1.json","r");
    $data_readed = fread($data_file, filesize("data-1.json"));
    $data = json_decode($data_readed, true);
    fclose($data_file);
    return $data;
}

?>