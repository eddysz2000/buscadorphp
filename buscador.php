<?php

  $data_file = fopen("data-1.json","r");
  $data_readed = fread($data_file, filesize("data-1.json"));
  $data = json_decode($data_readed, true);
  fclose($data_file);

  

 ?>