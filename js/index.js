// ══════════════════════════════════════════════════════════
// index.js — Info-modal logica voor de vakjes en vaardigheden
// op de homepagina (leest data-emoji / data-title / data-desc)
// ══════════════════════════════════════════════════════════

if (document.getElementById('info-modal')) {
  window.openInfoModal = function (el) {
    const img = el.dataset.img;
    const imgWrap = document.getElementById('im-img-wrap');
    if (img) {
      document.getElementById('im-img').src = img;
      document.getElementById('im-img').alt = el.dataset.title || '';
      imgWrap.style.display = '';
      document.getElementById('im-emoji').style.display = 'none';
    } else {
      imgWrap.style.display = 'none';
      document.getElementById('im-emoji').style.display = '';
    }
    document.getElementById('im-emoji').textContent = el.dataset.emoji || '';
    document.getElementById('im-title').textContent = el.dataset.title || '';
    document.getElementById('im-desc').textContent = el.dataset.desc || '';
    document.getElementById('info-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeInfoModal = function () {
    document.getElementById('info-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('info-modal').addEventListener('click', function (e) {
    if (e.target === this) closeInfoModal();
  });

  // Kaarten/pills die de modal openen (voorheen via inline onclick)
  document.querySelectorAll('.js-info-card').forEach(function (el) {
    el.addEventListener('click', function () { openInfoModal(el); });
  });
  // Sluitknoppen van de modal
  document.querySelectorAll('.js-close-info-modal').forEach(function (btn) {
    btn.addEventListener('click', closeInfoModal);
  });
}

// Links binnen een kaart die niet de modal mogen openen (voorheen event.stopPropagation() inline)
document.querySelectorAll('.js-stop-propagation').forEach(function (el) {
  el.addEventListener('click', function (e) { e.stopPropagation(); });
});
