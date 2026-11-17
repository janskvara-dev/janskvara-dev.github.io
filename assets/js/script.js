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
  $('whatsappLink').href = 'https://wa.me/' + whatsapp;
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