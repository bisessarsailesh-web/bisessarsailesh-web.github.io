// ══════════════════════════════════════════════════════════
// about.js — Skills modal-logica, alleen voor about.html
// ══════════════════════════════════════════════════════════

const skillsInfo = [
  {emoji:'🎨',title:'HTML & CSS',desc:'De basis van elke website. HTML structureert de content, CSS zorgt voor de vormgeving en layout. Ik gebruik moderne CSS zoals Flexbox, Grid en animaties om responsive en visueel aantrekkelijke interfaces te bouwen.'},
  {emoji:'⚡',title:'JavaScript',desc:'De programmeertaal die websites interactief maakt. Ik gebruik JavaScript voor dynamische functionaliteit, DOM-manipulatie, API-koppelingen en het bouwen van interactieve gebruikerservaringen zonder page reloads.'},
  {emoji:'⚛️',title:'React',desc:'Een JavaScript-library voor het bouwen van herbruikbare UI-componenten. Ik gebruik React voor het opzetten van snelle, schaalbare single-page applicaties met state management en component-gebaseerde architectuur.'},
  {emoji:'🟢',title:'Node.js',desc:'JavaScript runtime voor de server-side. Ik bouw hiermee REST API\'s, backend-logica en real-time functionaliteit zoals chat-applicaties met Socket.io.'},
  {emoji:'🐘',title:'PHP',desc:'Server-side scripttaal die ik gebruik voor backend-ontwikkeling, databasekoppelingen en het bouwen van dynamische websites en klantportalen.'},
  {emoji:'🗄️',title:'MySQL',desc:'Relationele database die ik gebruik voor het opslaan en beheren van gestructureerde data, met geoptimaliseerde queries voor snelle en betrouwbare applicaties.'},
  {emoji:'🔧',title:'Git',desc:'Versiebeheersysteem waarmee ik code bijhoud, samenwerk met andere developers en projecten veilig beheer via platforms zoals GitHub.'},
  {emoji:'🖌️',title:'Figma',desc:'Design-tool die ik gebruik voor het maken van wireframes, prototypes en UI/UX-ontwerpen voordat ik begin met de daadwerkelijke ontwikkeling.'}
];

if (document.getElementById('skill-modal')) {
  window.openSkillModal = function (i) {
    const s = skillsInfo[i];
    document.getElementById('s-emoji').textContent = s.emoji;
    document.getElementById('s-title').textContent = s.title;
    document.getElementById('s-desc').textContent = s.desc;
    document.getElementById('skill-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeSkillModal = function () {
    document.getElementById('skill-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('skill-modal').addEventListener('click', function (e) {
    if (e.target === this) closeSkillModal();
  });

  // Skill pills die de modal openen (voorheen via inline onclick)
  document.querySelectorAll('.js-open-skill').forEach(function (el) {
    el.addEventListener('click', function () {
      openSkillModal(parseInt(el.dataset.skillIndex, 10));
    });
  });
  document.querySelectorAll('.js-close-skill-modal').forEach(function (btn) {
    btn.addEventListener('click', closeSkillModal);
  });
}

if (document.getElementById('photo-modal')) {
  window.openPhotoModal = function (el) {
    document.getElementById('pm-img').src = el.dataset.img || '';
    document.getElementById('pm-img').alt = el.dataset.title || '';
    document.getElementById('pm-title').textContent = el.dataset.title || '';
    document.getElementById('pm-desc').textContent = el.dataset.desc || '';
    document.getElementById('photo-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closePhotoModal = function () {
    document.getElementById('photo-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('photo-modal').addEventListener('click', function (e) {
    if (e.target === this) closePhotoModal();
  });

  // Interessekaarten die de modal openen (voorheen via inline onclick)
  document.querySelectorAll('.js-open-photo').forEach(function (el) {
    el.addEventListener('click', function () { openPhotoModal(el); });
  });
  document.querySelectorAll('.js-close-photo-modal').forEach(function (btn) {
    btn.addEventListener('click', closePhotoModal);
  });
}

// Vaardighedenbalkjes: breedte via data-attribuut instellen (voorheen inline style="--w:...")
document.querySelectorAll('.js-skill-bar').forEach(function (el) {
  const w = el.dataset.width;
  if (w) el.style.setProperty('--w', w + '%');
});
