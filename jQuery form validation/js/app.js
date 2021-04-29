$(function () {
  // Niz polja na koje dodajemo brojac prilikom provere popunjenosti
  var polja = ["dan0", "mesec0", "godina0"];

  // Promenjiva koja sadrzi broj popunjenih polja
  var br = 0;

  // Event handler na osnovu kojeg disable-ujemo ili enable-ujemo submit button
  $(document).on("change", "input", function () {
    // Vracamo broj popunjenih promenjivih na 0
    br = 0;
    // Brojac ide od 1 do 2 kako bi dodali na clanove niza broj i ne bi se ponavljali
    for (var i = 1; i <= 2; i++) {
      // Prolazimo kroz niz i na osnovu vrednosti niza pristupamo poljima i ispitujemo da li su popunjena
      $.each(polja, function (index, value) {
        if ($("#" + value + i).val() != "") {
          // Ako nisu prazna povecavamo broj popunjenih polja za 1
          ++br;
        }
      });
    }
    if (br == 6) {
      // Ako je popunjeno svih 6 polja onda enable-ujemo dugme i dozvoljavamo submit
      $("#sabmit").prop("disabled", false);
    } else {
      // Ako nije popunjeno svih 6 polja onda disable-ujemo dugme i ne dozvoljavamo submit
      $("#sabmit").prop("disabled", true);
    }
  });

  // Event handler za submit forme
  $("#forma").submit(function (event) {
    // Brojac ide od 1 do 2 kako bi dodali na clanove niza broj i ne bi se ponavljali prilikom provere
    for (var i = 1; i <= 2; i++) {
      // Prolazimo kroz niz
      $.each(polja, function (index, value) {
        // Dodajemo vrednost brojaca na vrednost elementa niza kako bi imali ispravan ID polja i prosledili ga funkciji "check" koja proverava ispravnost podataka u poljima
        var v = value + i;
        check(v);
      });
    }
    // Sprecavamo prirodno ponasanje submit dugmeta tj. refresh stranice
    event.preventDefault();
  });

  // Niz na osnovu koga proveravamo da li je mesec napisan brojem ili slovima
  var meseci = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];

  // Koristimo prilikom loseg unosa u polje kako bi postavili klasu koja ukazuje na neispravnost unetih podataka
  function isInvalid(polje) {
    if (!$("#" + polje).hasClass("is-invalid")) {
      $("#" + polje).addClass("is-invalid");
    }
  }
  // Koristimo prilikom dobrog unosa u polje kako bi postavili klasu koja ukazuje na ispravnost unetih podataka
  function isValid(polje) {
    if ($("#" + polje).hasClass("is-invalid")) {
      // Ako su podaci u polju pre toga bili nesipravni onda brisemo klasu neispravnosti i dodajemo klasu ispravnosti i brisemo kontekst diva koji prikazuje greske
      $("#" + polje).removeClass("is-invalid");
      $("#" + polje).addClass("is-valid");
      $("#" + polje + "invalid").html("");
    } else {
      // Ako su podaci od starta ispravni samo dodajemo klasu ispravnosti
      $("#" + polje).addClass("is-valid");
    }
  }

  // Funkcija za proveru ispravnosti polja
  function check(polje) {
    // Deklaracija promenjivih
    var dan, mesec, godina;
    switch (polje) {
      case "dan01":
        //   DAN OD
        dan = $("#" + polje).val();
        mesec = $("#mesec01").val();
        godina = $("#godina01").val();
        if (dan == "") {
          // Ako je polje prazno
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(dan)) {
          // Ako polje nije numericko
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je numeričko!");
        } else if (dan <= 0) {
          // Ako je polje popunjeno nulom ili manjim brojem
          isInvalid(polje);
          $("#" + polje + "invalid").html("Minimum je 1 dan!");
        } else if (mesec == 2 || mesec == "februar" || mesec == "Februar") {
          // Ako je mesec februar
          if (
            godina % 400 == 0 ||
            (godina % 100 != 0 &&
              godina % 4 == 0 &&
              godina <= new Date().getFullYear())
          ) {
            // Prestupna i manja ili jednaka sadasnjoj godini
            if (dan > 29) {
              // Ako je upisano vise od 29 dana
              isInvalid(polje);

              $("#" + polje + "invalid").html(
                "Februar ove prestupne godine " + godina + ". ima 29 dana!"
              );
            } else {
              // Ako je upisan ispravan broj dana
              isValid(polje);
            }
          } else if (godina != "" && godina <= new Date().getFullYear()) {
            // Ako godina nije prazna i manja je ili jednaka sadasnjoj
            if (dan > 28) {
              // Ako je upisano vise od 28 dana
              isInvalid(polje);

              $("#" + polje + "invalid").html(
                "Februar ove proste godine " + godina + ". ima 28 dana!"
              );
            } else {
              // Ako je upisan ispravan broj dana
              isValid(polje);
            }
          } else {
            // Ako je godina prazna
            isInvalid(polje);
            $("#" + polje + "invalid").html(
              "Ispravno popunite polje godine kako bi odredili broj dana u mesecu!"
            );
          }
        } else if (
          mesec == 1 ||
          mesec == 3 ||
          mesec == 5 ||
          mesec == 7 ||
          mesec == 8 ||
          mesec == 10 ||
          mesec == 12
        ) {
          //   Meseci sa trideset jednim danom
          if (dan > 31) {
            // Ako je upisan neispravan broj dana
            isInvalid(polje);

            $("#" + polje + "invalid").html(meseci[mesec - 1] + " ima 31 dan");
          } else {
            // Ako je upisan ispravan broj dana
            isValid(polje);
          }
        } else if (mesec == 4 || mesec == 6 || mesec == 9 || mesec == 11) {
          //   Meseci sa trideset dana
          if (dan > 30) {
            // Ako je upisan neispravan broj dana
            isInvalid(polje);

            $("#" + polje + "invalid").html(meseci[mesec - 1] + " ima 30 dana");
          } else {
            // Ako je upisan ispravan broj dana

            isValid(polje);
          }
        } else {
          // Ako je sve ispravno
          isValid(polje);
        }
        break;
      case "mesec01":
        //   MESEC OD
        dan = $("#dan01").val();
        mesec = $("#" + polje).val();
        godina = $("#godina01").val();
        if (mesec == "") {
          // Ako je polje prazno
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(mesec)) {
          // Ako polje nije numericko uporedjujemo sa nizom "meseci" kako bi videli da mesec nije mozda upisan slovima
          // Kapitalizujemo rec kako bi uporedili sa nizom posto su u nizu svi meseci upisani prvim velikim slovom
          var m = mesec.charAt(0).toUpperCase() + mesec.slice(1);
          if ($.inArray(m, meseci) < 0) {
            // Ako nije upisan mesec slovima vec neka druga rec ili simbol
            isInvalid(polje);
            $("#" + polje + "invalid").html(
              "Preporučljivo je upisati mesec numerički, ili slovima na srpskom!"
            );
          } else {
            // Ako je upisan mesec slovima
            isValid(polje);
          }
        } else if (mesec <= 0) {
          // Ako je uneta nula ili manji broj
          isInvalid(polje);
          $("#" + polje + "invalid").html("Minimum je 1 mesec!");
        } else if (mesec > 12) {
          // Ako je unet broj veci od 12
          isInvalid(polje);
          $("#" + polje + "invalid").html("Godina ima 12 meseci!");
        } else {
          // Ako je sve u redu
          isValid(polje);
        }
        break;
      case "godina01":
        //   GODINA OD
        dan = $("#dan01").val();
        mesec = $("#mesec01").val();
        godina = $("#" + polje).val();
        if (godina == "") {
          // Ako je polje prazno
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(godina)) {
          // Ako vrednost nije numericka
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je numeričko!");
        } else if (godina <= 1970) {
          // Ako je vrednost manja od 1970
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Početna godina ne sme biti pre UNIX epohe(1970)!"
          );
        } else if (godina > new Date().getFullYear()) {
          // Ako je vrednost godine u buducnosti
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Početna godina ne sme biti u budućnosti!"
          );
        } else {
          // Ako je sve u redu
          isValid(polje);
        }
        break;
      case "dan02":
        // Promenjive za poredjenje
        var odDan = $("#dan01").val();
        var odMesec = $("#mesec01").val();
        var odGodina = $("#godina01").val();
        // DAN DO
        dan = $("#" + polje).val();
        mesec = $("#mesec02").val();
        godina = $("#godina02").val();
        if (dan == "") {
          // Ako je prazno polje
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(dan)) {
          // Ako nije uneta brojcana vrednost
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je numeričko!");
        } else if (dan <= 0) {
          // Ako je unet broj 0 ili manji
          isInvalid(polje);
          $("#" + polje + "invalid").html("Minimum je 1 dan!");
        } else if (godina <= odGodina && mesec <= odMesec) {
          // Ako je vrednost godine manja ili jednaka od pocetne godine i mesec manji ili jednak od pocetnog meseca
          if (dan <= odDan) {
            // Ako je pocetni dan manji od zavrsnog
            isInvalid(polje);
            $("#" + polje + "invalid").html(
              "Ne može od danas do juče ili od danas do danas!"
            );
          } else {
            // Ako je dan u redu
            if (mesec == 2 || mesec == "februar" || mesec == "Februar") {
              // Ako je februar
              if (
                godina % 400 == 0 ||
                (godina % 100 != 0 &&
                  godina % 4 == 0 &&
                  godina <= new Date().getFullYear())
              ) {
                // Prestupna i manja ili jednaka sadasnjoj godini
                if (dan > 29) {
                  // Ako je upisano vise od 29 dana
                  isInvalid(polje);

                  $("#" + polje + "invalid").html(
                    "Februar ove prestupne godine " + godina + ". ima 29 dana!"
                  );
                } else {
                  isValid(polje);
                }
              } else if (godina != "" && godina <= new Date().getFullYear()) {
                // Ako godina nije prazna i manja je ili jednaka sadasnjoj
                if (dan > 28) {
                  // Ako je upisano vise od 28 dana
                  isInvalid(polje);

                  $("#" + polje + "invalid").html(
                    "Februar ove proste godine " + godina + ". ima 28 dana!"
                  );
                } else {
                  // Ako je u redu
                  isValid(polje);
                }
              } else {
                // Ako je godina prazna
                isInvalid(polje);
                $("#" + polje + "invalid").html(
                  "Ispravno popunite polje godine kako bi odredili broj dana u mesecu!"
                );
              }
            } else if (
              mesec == 1 ||
              mesec == 3 ||
              mesec == 5 ||
              mesec == 7 ||
              mesec == 8 ||
              mesec == 10 ||
              mesec == 12
            ) {
              //   Meseci sa trideset jednim danom
              if (dan > 31) {
                // Ako je upisano vise od trideset jednog dana
                isInvalid(polje);
                $("#" + polje + "invalid").html(
                  meseci[mesec - 1] + " ima 31 dan"
                );
              } else {
                // Ako su dani u redu
                isValid(polje);
              }
            } else if (mesec == 4 || mesec == 6 || mesec == 9 || mesec == 11) {
              //   Meseci sa trideset dana
              if (dan > 30) {
                // Ako je upisano vise od 30 dana
                isInvalid(polje);
                $("#" + polje + "invalid").html(
                  meseci[mesec - 1] + " ima 30 dana"
                );
              } else {
                // Ako su dani u redu
                isValid(polje);
              }
            } else {
              // Ako je broj meseci u redu
              isValid(polje);
            }
          }
        } else if (mesec == 2 || mesec == "februar" || mesec == "Februar") {
          // Ako je februar
          if (
            godina % 400 == 0 ||
            (godina % 100 != 0 &&
              godina % 4 == 0 &&
              godina <= new Date().getFullYear())
          ) {
            // Prestupna i manja ili jednaka sadasnjoj godini
            if (dan > 29) {
              // Ako je upisano vise od 29 dana
              isInvalid(polje);

              $("#" + polje + "invalid").html(
                "Februar ove prestupne godine " + godina + ". ima 29 dana!"
              );
            } else {
              isValid(polje);
            }
          } else if (godina != "" && godina <= new Date().getFullYear()) {
            // Ako godina nije prazna i manja je ili jednaka sadasnjoj
            if (dan > 28) {
              // Ako je upisano vise od 28 dana
              isInvalid(polje);

              $("#" + polje + "invalid").html(
                "Februar ove proste godine " + godina + ". ima 28 dana!"
              );
            } else {
              isValid(polje);
            }
          } else {
            // Ako je godina prazna
            isInvalid(polje);
            $("#" + polje + "invalid").html(
              "Ispravno popunite polje godine kako bi odredili broj dana u mesecu!"
            );
          }
        } else if (
          mesec == 1 ||
          mesec == 3 ||
          mesec == 5 ||
          mesec == 7 ||
          mesec == 8 ||
          mesec == 10 ||
          mesec == 12
        ) {
          //   Meseci sa trideset jednim danom
          if (dan > 31) {
            // Ako je upisano vise od trideset jednog dana
            isInvalid(polje);
            $("#" + polje + "invalid").html(meseci[mesec - 1] + " ima 31 dan");
          } else {
            // Ako je polje u redu
            isValid(polje);
          }
        } else if (mesec == 4 || mesec == 6 || mesec == 9 || mesec == 11) {
          //   Meseci sa trideset dana
          if (dan > 30) {
            // Ako je upisano vise od 30 dana
            isInvalid(polje);
            $("#" + polje + "invalid").html(meseci[mesec - 1] + " ima 30 dana");
          } else {
            // Ako su dani u redu
            isValid(polje);
          }
        } else {
          // Ako je polje meseci u redu
          isValid(polje);
        }
        break;
      case "mesec02":
        // Promenjive za poredjenje
        var odDan = $("#dan01").val();
        var odMesec = $("#mesec01").val();
        var odGodina = $("#godina01").val();
        //   MESEC DO
        dan = $("#dan02").val();
        mesec = $("#" + polje).val();
        godina = $("#godina02").val();
        if (mesec == "") {
          // Ako je polje prazno
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(mesec)) {
          // Ako vrednost nije numericka
          // Kapitalizujemo vrednost kako bi uporedili sa vrednostima iz niza
          var m = mesec.charAt(0).toUpperCase() + mesec.slice(1);
          if ($.inArray(m, meseci) < 0) {
            // Ako ne postoji u nizu
            isInvalid(polje);
            $("#" + polje + "invalid").html(
              "Preporučljivo je upisati mesec numerički, ili slovima na srpskom!"
            );
          } else {
            // Ako je mesec napisan slovima
            isValid(polje);
          }
        } else if (mesec <= 0) {
          // Ako je upisana nula ili manji broj
          isInvalid(polje);
          $("#" + polje + "invalid").html("Minimum je 1 mesec!");
        } else if (mesec > 12) {
          // Ako je upisan veci broj od 12
          isInvalid(polje);
          $("#" + polje + "invalid").html("Godina ima 12 meseci!");
        } else if (godina <= odGodina && mesec < odMesec) {
          // Ako je godina manja ili jednaka pocetnoj i mesec manji od pocetnog
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Završni mesec ne može biti pre početnog!"
          );
        } else {
          // Ako je sve u redu
          isValid(polje);
        }
        break;
      case "godina02":
        // Promenjive za poredjenje
        var odDan = $("#dan01").val();
        var odMesec = $("#mesec01").val();
        var odGodina = $("#godina01").val();
        //   GODINA DO
        dan = $("#dan02").val();
        mesec = $("#mesec02").val();
        godina = $("#" + polje).val();
        if (godina == "") {
          // Ako je polje prazno
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je obavezno!");
        } else if (isNaN(godina)) {
          // Ako polje nije numericko
          isInvalid(polje);
          $("#" + polje + "invalid").html("Ovo polje je numeričko!");
        } else if (godina <= 1970) {
          // Ako je vrednost godine manja od 1970
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Početna godina ne sme biti pre UNIX epohe(1970)!"
          );
        } else if (godina > 2030) {
          // Ako je godina veca od 2030. godine
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Završna godina ne sme biti posle 2030. godine!"
          );
        } else if (godina < odGodina) {
          // Ako je godina manja od pocetne
          isInvalid(polje);
          $("#" + polje + "invalid").html(
            "Završna godina ne sme biti pre početne!"
          );
        } else {
          // Ako je sve u redu
          isValid(polje);
        }
        break;

      default:
        alert("Neko je pokvario kod!");
        console.log(
          "Provera polja koje ne postoji, moguce samo ako se neko igra sa kodom!"
        );
        break;
    }
  }
});
