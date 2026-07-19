// ══════════════════════════════════════════════════════════
// contact.js — Contactformulier-logica, alleen voor contact.html
// ══════════════════════════════════════════════════════════

if (document.getElementById('f-name')) {
  window.sendForm = function () {
    const name = document.getElementById('f-name').value;
    const email = document.getElementById('f-email').value;
    const msg = document.getElementById('f-msg').value;
    if (!name || !email || !msg) { alert('Vul alle velden in.'); return; }
    document.getElementById('form-success').style.display = 'block';
    document.getElementById('f-name').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-subject').value = '';
    document.getElementById('f-msg').value = '';
    setTimeout(() => document.getElementById('form-success').style.display = 'none', 5000);
  };
  const sendBtn = document.getElementById('send-form-btn');
  if (sendBtn) sendBtn.addEventListener('click', sendForm);
}

if (document.getElementById('contact-modal')) {
  window.openContactModal = function (el) {
    document.getElementById('cm-img').src = el.dataset.img || '';
    document.getElementById('cm-img').alt = el.dataset.label || '';
    document.getElementById('cm-label').textContent = el.dataset.label || '';
    document.getElementById('cm-value').textContent = el.dataset.value || '';
    const link = document.getElementById('cm-link');
    link.href = el.dataset.link || '#';
    link.textContent = el.dataset.linktext || 'Ga naar →';
    document.getElementById('contact-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeContactModal = function () {
    document.getElementById('contact-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('contact-modal').addEventListener('click', function (e) {
    if (e.target === this) closeContactModal();
  });

  // Kaarten die de modal openen (voorheen via inline onclick)
  document.querySelectorAll('.js-open-contact').forEach(function (el) {
    el.addEventListener('click', function () { openContactModal(el); });
  });
  // Sluitknoppen van de modal
  document.querySelectorAll('.js-close-contact-modal').forEach(function (btn) {
    btn.addEventListener('click', closeContactModal);
  });
}
