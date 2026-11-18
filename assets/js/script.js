// Tu neskôr doplň telefón a e-mail. Prázdne kontakty sa nezobrazujú.
const PROFILE = {
  givenName: 'Ján',
  familyName: 'Škvara',
  phone: '+421 904 956 514',    // napr. '+421 900 123 456'
  email: 'janskvara160@gmail.com',    // napr. 'jan@domena.sk'
  whatsapp: '', // nepovinné — ak ostane prázdne, použije sa číslo z phone
  website: 'https://janskvara-dev.github.io/'
};

const $ = id => document.getElementById(id);
$('year').textContent = new Date().getFullYear();
const phone = PROFILE.phone.trim();
const email = PROFILE.email.trim();
const whatsapp = (PROFILE.whatsapp.trim() || phone).replace(/\D/g, '');

if (phone) {
  $('phoneLink').href = 'tel:' + phone.replace(/[^+\d]/g, '');
  $('phoneText').textContent = phone;
  $('phoneLink').hidden = false;
}
if (email) {
  $('emailLink').href = 'mailto:' + email;
  $('emailText').textContent = email;
  $('emailLink').hidden = false;
}
if (whatsapp) {
  
const uvodnaSprava = 'Dobrý deň, našiel som Vašu digitálnu vizitku a rád by som sa informoval o Vašich službách.';

$('whatsappLink').href = 'https://wa.me/' + whatsapp +
  '?text=' + encodeURIComponent(uvodnaSprava);

  $('whatsappLink').hidden = false;
}
$('contactLinks').hidden = !(phone || email || whatsapp);


const modal = $('qrDialog');
$('showQr').addEventListener('click', () => modal.showModal());
$('closeQr').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
});

let toastTimer;
function toast(message) {
  const el = $('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}
$('copyLink').addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(PROFILE.website);
    } else {
      const input = document.createElement('textarea');
      input.value = PROFILE.website;
      input.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(input);
      input.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed');
      input.remove();
    }
    toast('Odkaz skopírovaný');
  } catch (_) {
    toast('Skopíruj: ' + PROFILE.website);
  }
});

// QR obrázok – iPhone / PC
const qrPng = 'assets/images/qr-vizitka.png';
let qrFile = null;

// Pripravíme PNG na zdieľanie
fetch(qrPng)
  .then(response => {
    if (!response.ok) throw new Error('QR PNG sa nenašiel');
    return response.blob();
  })
  .then(blob => {
    qrFile = new File([blob], 'qr-jan-skvara.png', {
      type: 'image/png'
    });
  })
  .catch(() => {});

document.getElementById('saveQrImage').addEventListener('click', () => {

  const isiPhone = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // iPhone – otvorí ponuku zdieľania obrázka
  if (isiPhone) {
    if (qrFile && navigator.share &&
        navigator.canShare?.({files: [qrFile]})) {

      navigator.share({files: [qrFile]}).catch(error => {
        if (error.name !== 'AbortError') {
          window.location.href = qrPng;
        }
      });

    } else {
      window.open(qrPng, '_blank');
    }
    return;
  }

  // PC – stiahne PNG súbor
  const link = document.createElement('a');
  link.href = qrPng;
  link.download = 'qr-jan-skvara.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
});


/* FACEBOOK / MESSENGER – OPRAVA ULOZENIA KONTAKTU */
(() => {
  const btn = document.getElementById('saveContact');
  if (!btn) return;

  
const ua = navigator.userAgent || '';

// Iba mobilné zariadenia
const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

// Iba interný prehliadač aplikácie Facebook
const isFacebookApp =
  /FBAN|FBAV|FB_IAB|FBIOS|FB4A|FBMD|FBSN/i.test(ua);

// Upozornenie zobrazíme iba vo Facebook aplikácii na mobile
if (!isMobile || !isFacebookApp) return;


  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Zabráni opakovanému otvoreniu
    if (document.getElementById('fbContactOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'fbContactOverlay';
    overlay.style.cssText = `
      position:fixed;
      inset:0;
      z-index:2147483647;
      background:rgba(3,9,21,.88);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    `;

    overlay.innerHTML = `
      <div role="dialog" aria-modal="true"
        aria-label="Uloženie kontaktu"
        style="
          position:relative;
          width:100%;
          max-width:360px;
          padding:30px 23px;
          background:#13243c;
          border:1px solid #416b96;
          border-radius:18px;
          color:#eff6ff;
          text-align:center;
          font-family:Manrope,Arial,sans-serif;
          box-shadow:0 25px 70px #0008;
        ">

        <button type="button" id="fbContactClose"
          aria-label="Zatvoriť"
          style="
            position:absolute;
            top:9px;
            right:14px;
            border:0;
            background:none;
            color:#fff;
            font-size:26px;
            cursor:pointer;
          ">×</button>

        <div style="font-size:29px;margin-bottom:12px">📱</div>

        <h2 style="font-size:20px;margin:0 0 14px">
          Uložiť kontakt
        </h2>

        <p style="
          font-size:13px;
          line-height:1.7;
          color:#c2d8ee;
          margin-bottom:16px;
        ">
          Facebook nepodporuje spoľahlivé otváranie kontaktov.
        </p>

        <p style="
          font-size:13px;
          line-height:1.7;
          color:#c2d8ee;
        ">
          Kliknite na menu <b>⋯</b> v prehliadači Facebooku
          a vyberte <b>Otvoriť v prehliadači</b>.
          Potom kliknite na Uložiť kontakt.
        </p>

        <button type="button" id="fbContactCopy"
          style="
            width:100%;
            margin-top:20px;
            padding:13px;
            background:#70c6ff;
            color:#07192d;
            border:0;
            border-radius:10px;
            font-size:13px;
            font-weight:800;
            cursor:pointer;
          ">
          Skopírovať odkaz na vizitku
        </button>

        <p id="fbContactStatus"
          role="status"
          aria-live="polite"
          style="
            font-size:12px;
            color:#a6d7ff;
            margin:12px 0 0;
            overflow-wrap:anywhere;
          "></p>

      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#fbContactClose').onclick =
      () => overlay.remove();

    overlay.addEventListener('click', event => {
      if (event.target === overlay) overlay.remove();
    });

    overlay.querySelector('#fbContactCopy').onclick = async () => {
      const url = 'https://janskvara-dev.github.io/';
      const status = overlay.querySelector('#fbContactStatus');

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          const input = document.createElement('textarea');
          input.value = url;
          input.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(input);
          input.select();

          if (!document.execCommand('copy')) {
            throw new Error('Copy failed');
          }
          input.remove();
        }

        status.textContent = 'Odkaz bol skopírovaný ✓';
      } catch (err) {
        status.textContent = url;
      }
    };

  }, true);
})();
