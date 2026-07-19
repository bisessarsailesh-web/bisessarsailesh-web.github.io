// ══════════════════════════════════════════════════════════
// work.js — Projectdata en modal-logica, alleen voor work.html
// ══════════════════════════════════════════════════════════

const projects = [
  {
    emoji: '💪',
    image: 'img/projects/project-1.jpg',
    title: 'FitTracker — Fitness Webapplicatie',
    tags: ['Schoolproject', 'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'Prisma ORM', 'SQLite / Database', 'JWT Authentication', 'REST API'],
    desc: 'FitTracker is een full-stack fitness webapplicatie die gebruikers helpt bij het plannen en beheren van hun trainingen. De applicatie bevat een veilige login, een database met oefeningen, een workoutplanner en een automatische trainingsgenerator.',
    features: [
      'Gebruikersregistratie en inloggen (JWT-authenticatie)',
      'Oefeningen bekijken en filteren op spiergroep',
      'Persoonlijke workouts aanmaken en beheren',
      'Trainingsplanner voor een volledig weekschema',
      'Automatische workoutgenerator',
      'Responsief ontwerp voor desktop en mobiele apparaten'
    ],
    learned: 'Tijdens dit project heb ik ervaring opgedaan met het ontwikkelen van een complete full-stack applicatie, het bouwen van REST API\'s, databasebeheer met Prisma, gebruikersauthenticatie en het ontwerpen van een gebruiksvriendelijke interface.',
    link: 'https://github.com/bisessarsailesh-web/fittracker'
  }
];

if (document.getElementById('project-modal')) {
  window.openModal = function (i) {
    const p = projects[i];
    const imgEl = document.getElementById('m-img-el');
    if (imgEl) { imgEl.src = p.image || ''; imgEl.alt = p.title; }
    document.getElementById('m-emoji').textContent = p.emoji;
    document.getElementById('m-title').textContent = p.title;
    document.getElementById('m-tags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    document.getElementById('m-desc').textContent = p.desc;
    document.getElementById('m-features').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
    document.getElementById('m-learned').textContent = p.learned;
    const linkBtn = document.getElementById('m-link');
    if (linkBtn) {
      if (p.link) { linkBtn.href = p.link; linkBtn.style.display = 'inline-block'; }
      else { linkBtn.style.display = 'none'; }
    }
    document.getElementById('project-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function () {
    document.getElementById('project-modal').classList.remove('open');
    document.body.style.overflow = '';
  };
  document.getElementById('project-modal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  // Kaarten die de modal openen (voorheen via inline onclick="openModal(i)")
  document.querySelectorAll('.js-open-project').forEach(function (el) {
    el.addEventListener('click', function () {
      openModal(parseInt(el.dataset.projectIndex, 10));
    });
  });
  // Sluitknoppen van de modal
  document.querySelectorAll('.js-close-project-modal').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
}

// Links binnen een kaart die niet de modal mogen openen
document.querySelectorAll('.js-stop-propagation').forEach(function (el) {
  el.addEventListener('click', function (e) { e.stopPropagation(); });
});
