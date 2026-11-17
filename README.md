# Digitálna vizitka — Ing. Ján Škvara

Minimalistická digitálna vizitka pre GitHub Pages.

## Ako spustiť

Otvorte `index.html` v prehliadači. Na publikovanie skopírujte obsah tohto priečinka (nie nadradený priečinok) do repozitára `janskvara-dev/janskvara-dev.github.io`.

## Ako doplniť kontakty

Upravte `assets/js/script.js` → objekt `PROFILE`:

- `phone` – telefón s predvoľbou, napr. `+421 900 123 456`
- `email` – e-mailová adresa
- `whatsapp` – voliteľné samostatné WhatsApp číslo; inak sa použije `phone`

Pri nevyplnených kontaktoch sa príslušné tlačidlá automaticky skryjú. Tlačidlo **Uložiť kontakt** vytvára vCard podľa týchto nastavení. Statický súbor `assets/contacts/jan-skvara.vcf` je iba referenčný a po doplnení kontaktov ho môžete voliteľne aktualizovať.

## QR kód

`assets/images/qr-vizitka.svg` a `assets/images/qr-vizitka.png` sú už vytvorené a obsahujú adresu `https://janskvara-dev.github.io/`. SVG je vhodné na tlač, PNG na bežné zdieľanie. Ak zmeníte verejnú adresu vizitky, QR kódy treba vytvoriť znova.
