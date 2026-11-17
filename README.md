# Digitálna vizitka — Ing. Ján Škvara

Moderná, responzívna digitálna vizitka vytvorená pomocou HTML, CSS a JavaScriptu. Publikovaná bezplatne prostredníctvom GitHub Pages.

**Web:** https://janskvara-dev.github.io/

## O projekte

Digitálna vizitka predstavuje Ing. Jána Škvaru, Web Developera so zameraním na tvorbu a úpravu webových stránok, e-shopov a vlastných riešení.

**Hlavná špecializácia:** Shoptet

**Technológie:** WordPress, HTML, CSS, JavaScript, PHP

### Funkcionalita

- Responzívny dizajn pre mobil, tablet aj počítač
- Tmavý technologický dizajn s modrými gradientmi
- Jemné animácie a interaktívne prvky
- Klikateľný telefón a e-mail
- Priame otvorenie konverzácie vo WhatsAppe
- Uloženie kontaktu cez súbor vCard (`.vcf`)
- QR kód smerujúci na digitálnu vizitku
- Kopírovanie odkazu na vizitku
- Uloženie alebo zdieľanie QR obrázka

## Štruktúra projektu

```text
janskvara-dev.github.io/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── images/
    │   ├── favicon.svg
    │   ├── qr-vizitka.svg
    │   └── qr-vizitka.png
    └── contacts/
        └── jan-skvara.vcf
```

## Kontaktné údaje

Kontakty sa nastavujú v súbore:

`assets/js/script.js`

V objekte `PROFILE` sú definované:

- `givenName` – meno
- `familyName` – priezvisko
- `phone` – telefónne číslo
- `email` – e-mailová adresa
- `whatsapp` – voliteľné WhatsApp číslo
- `website` – URL digitálnej vizitky

Ak je `whatsapp` prázdny, automaticky sa použije číslo z `phone`.

Nevyplnené kontakty sa na vizitke nezobrazujú.

### WhatsApp

Kliknutím na WhatsApp sa otvorí konverzácia s nastaveným telefónnym číslom.

Vo WhatsApp odkaze je možné nastaviť aj predvyplnený text správy. Návštevník ho môže upraviť a následne odoslať.

Automatické odpovede od majiteľa účtu nie sú súčasťou projektu a klasický WhatsApp ich natívne neposkytuje.

## Uloženie kontaktu

Tlačidlo **Uložiť kontakt** používa samostatný súbor:

`assets/contacts/jan-skvara.vcf`

Súbor obsahuje meno, profesiu, telefón, e-mail a webovú adresu.

Formát `.vcf` je určený na import kontaktov do telefónov a ďalších podporovaných aplikácií.

**Dôležité:** Kontakt sa už negeneruje dynamicky zo súboru `script.js`.

Pri zmene telefónneho čísla alebo e-mailu je potrebné aktualizovať:

1. `assets/js/script.js` – kontakty zobrazované na vizitke
2. `assets/contacts/jan-skvara.vcf` – údaje ukladaného kontaktu

### Kompatibilita

- **iPhone:** Safari môže otvoriť náhľad kontaktu alebo ponúknuť stiahnutie súboru.
- **Android:** Súbor je možné otvoriť alebo importovať v aplikácii Kontakty.
- **Windows a macOS:** Súbor možno otvoriť alebo importovať do kompatibilnej aplikácie.

Spôsob otvorenia závisí od zariadenia, prehliadača a jeho nastavení.

Pri úpravách diakritiky odporúčame zachovať funkčné kódovanie súboru `.vcf` a otestovať import na mobilnom zariadení.

## QR kód

QR kód obsahuje adresu:

https://janskvara-dev.github.io/

Súbory:

- `assets/images/qr-vizitka.svg` – vektorový QR kód vhodný na tlač
- `assets/images/qr-vizitka.png` – QR obrázok vhodný na zdieľanie a uloženie

Tlačidlo **QR kód** otvorí okno s QR obrázkom.

Používateľ môže skopírovať odkaz alebo uložiť QR obrázok.

Na podporovaných mobilných zariadeniach sa využíva systémová ponuka zdieľania. Na počítači sa PNG obrázok štandardne sťahuje.

Na iPhone možno v ponuke zdieľania vybrať možnosť **Uložiť obrázok**, ak ju systém ponúka.

QR kód zostáva platný pri všetkých úpravách vizitky, pokiaľ sa nemení jej verejná URL.

## Lokálne spustenie

Projekt je možné upravovať vo Visual Studio Code.

Hlavný súbor:

`index.html`

Na lokálne testovanie možno použiť rozšírenie Live Server.

Odporúčame ho najmä pri funkciách, ktoré načítavajú súbory prostredníctvom JavaScriptu.

## Publikovanie cez GitHub Pages

**Repozitár:**

https://github.com/janskvara-dev/janskvara-dev.github.io

**Publikovaná stránka:**

https://janskvara-dev.github.io/

GitHub Pages je nastavený na publikovanie z vetvy `main` a koreňového priečinka repozitára.

### Aktualizácia vizitky

Po vykonaní zmien vo Visual Studio Code:

1. Uložiť súbory (`Ctrl + S`).
2. Vytvoriť Git commit.
3. Odoslať zmeny cez Push.

Alternatívne možno použiť terminál:

```bash
git add .
git commit -m "Aktualizacia digitalnej vizitky"
git push origin main
```

GitHub Pages následne automaticky nasadí aktualizovanú verziu stránky.

Pri zobrazovaní starej verzie možno skúsiť obnovenie pomocou `Ctrl + Shift + R`.

## Dôležité upozornenia

- Vizitka nevyžaduje vlastnú doménu.
- GitHub Pages slúži ako bezplatný statický hosting.
- Projekt nevyužíva databázu.
- Zmeny v kontaktoch je potrebné aktualizovať aj v súbore `.vcf`.
- Pri zmene verejnej URL je potrebné vygenerovať nové QR kódy.
- Funkcie sťahovania a zdieľania sa môžu líšiť podľa prehliadača.

---

© Ing. Ján Škvara — Web Developer