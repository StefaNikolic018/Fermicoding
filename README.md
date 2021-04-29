# Fermicoding
Fermicoding zadaci

***Zadaci idu obrnutim redosledom zbog važnosti objašnjenja*

## Treći zadatak(PHP API Fetch i Cache)
#### Pošto sam sinoć prilikom testiranja skripte prešao limit od 1000 poziva na dan, nisam siguran da li to ograničenje traje u okviru od 24 časa ili do kraja dana, pa bi bilo dobro testirati sa svojim API Key-em kako bi bilo što efikasnije. A pošto free plan nema mogućnost povlačenja polja koja su mi trebala na minutely nivou, morao sam na 10s da menjam samo vreme koje se prikazuje dok stanje ostaje isto jer se čita iz JSON fajla u koji se upisuje na 15s jer tada opet fečujem podatke putem API-ja kako bi podaci o stanju(oblačno,kiša,sunce) bili koliko toliko tačni sledećeg puta kada menjamo sadržaj. Imao sam ideju da povlačim podatke o svakom minutu na dvadesetčetvoročasovnom nivou i upisujem ih u JSON fajl iz koga bi mogao da prikazujem promene na 10 sekundi i šaljem zahteve API-ju samo jednom u 24 časa tako što bih uporedjivao vreme kreacije fajla i trenutno vreme i na osnovu toga povećao brzinu i smanjio saobraćaj, ali ta ideja nije realizovana zbog ograničenja koja ima free plan OpenWeather API-ja.
## Drugi zadatak(jQuery validacija polja)
#### Uradio sam custom validaciju polja trudivši se da ne propustim neko ograničenje, ali je verovatno da jesam jer ih ima dosta. Našao sam jQuery validator plugin koji radi posao ali nedovoljno dobro za ono što sam ja hteo da uradim pa ga nisam iskoristio u ovom primeru koji dostavljam, takođe sam razmišljao o spajanju vrednosti iz polja i predstavljanju istih kao datume koje bih uporedio, ali to sam shvatio tek kada sam završio ovu skriptu.
## Prvi zadatak(Bootstrap 4)
#### Obojena pozadina i umetnut tekst kako bi predstavljao sliku 100px x 100px
