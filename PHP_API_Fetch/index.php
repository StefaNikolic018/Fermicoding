<?php include_once "fetch.php"; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <!-- BOOTSTRAN CSS CDN START -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
      crossorigin="anonymous"
    />
    <!-- BOOTSTRAP CSS CDN END -->

    <!-- jQuery CDN START -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <!-- jQuery CDN END -->

    <title>Fermicoding jQuery Zadatak</title>
  </head>
  <body>
    <div class="container">
      <div class="row pt-5">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <div class="bg-light shadow border border-dark p-3 rounded text-center">
            <h1>NOVI SAD</h1>
            <div class="display-4"><img id="icon" src="" alt="ikonica"></div>
            <h2 id="stanje"></h2>
            <hr>
            <h3 id="sat"></h3>


          </div>
        </div>
      </div>
    </div>
    <script>
    $(function(){
      citanje();
    });
    var br=0;
    function citanje(){
        ++br;
        $.ajax({
          url:"./prognoza.json",
          dataType: "json",
          success: function(data){
            var prognoza=data.current;
            var icon=prognoza.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#stanje").html(prognoza.weather[0].description);
            $("#icon").attr("src",iconurl);
            $("#sat").html(newDate());
            if(br==1){
              // Pri poseti stranice
              console.log("Uspesno umetnut sadrzaj pri prvoj poseti stranice");
            } else {
              // Ako provodimo vreme na stranici
              console.log("Uspesno izmenjen sadrzaj stranice na osnovu JSON fajla posle 10 sekundi");
            }
            // Na svakih 10 sekundi pozivamo istu ovu funkciju kako bi promenili sadrzaj stranice
            setTimeout(citanje,10000);
            // Na svakih 15 sekundi pozivimo funkciju "pisanje" kako bi povukli nove podatke u fajl
            setTimeout(pisanje,15000);
          },
          error: function(){
            console.log('Problem pri FETCH-u iz JSON fajla');
          }
        });
      }
      function pisanje(){
      $.ajax({
          type:"POST",
          url:"./fetch.php",
          data: {'vreme':'true'},
          success: function(data){
            console.log("Uspesno upisano u fajl posle 15 sekundi "+data);
          },
          error: function(){
            console.log('Problem sa upisivanjem u fajl');
          }
        });
    }
    
    // Ova funkcija sluzi kako bi se ispisivalo vreme na stranici i kako bi videli neku promenu jer nam free plan ne dozvoljava da vucemo mnogo puta podatke putem API-ja tj. ima ogranicenje, a isto tako ne postoji mogucnost da povucem podatke za svakih 10 sekundi unapred kako bi ih pokazao pa sam odlucio da cu da pokazujem protok vremena u sekundama tj na 10 sekundi a na 15s da vucem podatke
    function newDate(){
      var date="";
      var year=new Date().getFullYear();
      var month=new Date().getMonth()+1;
      var day=new Date().getDate();
      var hours=new Date().getHours();
      var minutes=new Date().getMinutes();
      var seconds=new Date().getSeconds();
      if(month<10){
        month="0"+month;
      }
      date = [year,month,day].join("-")+" "+[hours,minutes,seconds].join(":");
      return date;
    }
    </script>
  </body>
</html>
