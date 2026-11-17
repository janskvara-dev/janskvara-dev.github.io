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

function vcardEscape(text) {
  return String(text).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
}
$('saveContact').addEventListener('click', () => {
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'N:' + [PROFILE.familyName,PROFILE.givenName,'','Ing.',''].map(vcardEscape).join(';'),
    'FN:' + vcardEscape('Ing. ' + PROFILE.givenName + ' ' + PROFILE.familyName),
    'TITLE:Web Developer',
    'URL:' + PROFILE.website,
    'NOTE:' + vcardEscape('Shoptet, WordPress, HTML, CSS, JavaScript, PHP, custom riešenia')
  ];
  if (phone) lines.push('TEL;TYPE=CELL:' + phone.replace(/[^+\d]/g, ''));
  if (email) lines.push('EMAIL;TYPE=INTERNET:' + vcardEscape(email));
  lines.push('END:VCARD');
  const blob = new Blob(['\uFEFF' + lines.join('\r\n') + '\r\n'], {type:'text/vcard;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ing-jan-skvara.vcf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
});

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
