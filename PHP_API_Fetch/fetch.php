<?php
date_default_timezone_set('CET');
$coordinates="lat=45.2517&lon=19.8369";
$api="a0a0eb373ff6161724f0496322247f06";
$cache="prognoza.json";
$fileTime="";
if(file_exists($cache)){
  if(isset($_POST["vreme"])){
    unlink("prognoza.json");
    $url="https://api.openweathermap.org/data/2.5/onecall?".$coordinates."&units=metric&exclude=minutely,hourly,daily,alerts&lang=sr&appid=".$api;
    $data = file_get_contents($url);
    file_put_contents($cache,$data);
    createDate($cache);
  } else {
    createDate($cache);
    return;
  }

}else{
  $url="https://api.openweathermap.org/data/2.5/onecall?".$coordinates."&units=metric&exclude=minutely,hourly,daily,alerts&lang=sr&appid=".$api;
  $data = file_get_contents($url);
  file_put_contents($cache,$data);
  createDate($cache);
}


// Ova funkcija nam sluzi ako bi npr. hteli da na 24 sata povlacimo podatke putem API-ja, mogli bi da uporedimo vreme kreacije fajla(koje zapisuje ova funkcija) sa vremenom trenutka POST zahteva serveru i na osnovu toga odobrimo ili zabranimo novo upisivanje u fajl
function createDate($file){
  $fileTime=filemtime($file);
  $fileTime=date("Y-m-d H:m:s",$fileTime);
  // echo ($fileTime);
}

?>