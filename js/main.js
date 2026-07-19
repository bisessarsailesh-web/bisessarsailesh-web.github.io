// ══════════════════════════════════════════════════════════
// main.js — Gedeelde functionaliteit, geladen op elke pagina
// ══════════════════════════════════════════════════════════

// ── Page Transition (unieke slide-curtain, op elke pagina) ──
(function () {
  function createOverlay() {
    const el = document.createElement('div');
    el.id = 'pt-overlay';
    el.innerHTML = '<span class="pt-label">Bisessar Sailesh</span>';
    document.body.appendChild(el);
    return el;
  }

  // Bij laden: gordijn schuift naar links weg en onthult de pagina
  const revealOverlay = createOverlay();
  requestAnimationFrame(function () {
    revealOverlay.classList.add('pt-reveal');
  });
  revealOverlay.addEventListener('animationend', function () {
    revealOverlay.remove();
  });

  // Bij klikken op interne link: gordijn schuift van rechts naar binnen
  document.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    const isInternalPage = href && href.endsWith('.html') && !href.startsWith('http') && link.target !== '_blank';
    if (!isInternalPage) return;

    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      const closeOverlay = createOverlay();
      closeOverlay.style.transform = 'translateX(100%)';
      void closeOverlay.offsetWidth;
      closeOverlay.classList.add('pt-cover');
      setTimeout(function () { window.location.href = href; }, 480);
    });
  });
})();

// ── Mobiel hamburgermenu (op elke pagina) ──
(function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });
})();

// ── Sound Wave (alleen als aanwezig op deze pagina) ──
const waveEl = document.getElementById('soundWave');
if (waveEl) {
  for (let i = 0; i < 16; i++) {
    const b = document.createElement('div');
    b.className = 'wave-bar';
    const h = 8 + Math.random() * 28;
    b.style.cssText = `--d:${0.3+Math.random()*0.5}s;--h:${h}px;animation-delay:${Math.random()*0.5}s;height:${h/2}px`;
    waveEl.appendChild(b);
  }
}

// ── AI Intro met echte spraak (alleen op index.html) ──
if (document.getElementById('ai-overlay')) {
  const introMsg = "Goedendag. Ik ben Bisessar Sailesh, web developer. Welkom op mijn portfolio. Ik ben klaar om jouw volgende digitale project te bouwen. Zullen we beginnen?";
  let charIdx = 0; let skipped = false; let speechDone = false; let typeDone = false;

  function speakIntro() {
    if (!window.speechSynthesis) { speechDone = true; return; }

    const utter = new SpeechSynthesisUtterance(introMsg);
    utter.lang = 'nl-NL';
    utter.rate = 0.90;
    utter.pitch = 0.60;
    utter.volume = 1;

    function trySpeak() {
      const voices = speechSynthesis.getVoices();
      const preferred = [
        'Google Nederlands',
        'Microsoft Ruben',
        'Microsoft Maarten',
        'Microsoft Frank',
        'Microsoft Arnaud Online',
        'Microsoft Bart',
        'nl-NL-Standard-B',
        'nl-NL-Wavenet-B',
      ];

      let chosen = null;
      for (const name of preferred) {
        chosen = voices.find(v => v.name.includes(name));
        if (chosen) break;
      }
      if (!chosen) {
        chosen = voices.find(v => v.lang === 'nl-NL')
              || voices.find(v => v.lang === 'nl-BE')
              || voices.find(v => v.lang.startsWith('nl'));
      }
      if (!chosen) {
        chosen = voices.find(v => v.lang.startsWith('en-GB'))
              || voices.find(v => v.lang.startsWith('en'));
        if (chosen) utter.lang = 'en-GB';
      }
      if (chosen) utter.voice = chosen;

      utter.onend = () => { speechDone = true; checkBothDone(); };
      utter.onerror = () => { speechDone = true; checkBothDone(); };
      speechSynthesis.speak(utter);
    }

    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) { trySpeak(); }
      else {
        speechSynthesis.onvoiceschanged = trySpeak;
        setTimeout(trySpeak, 800);
      }
    };
    loadVoices();
  }

  function typeAI() {
    if (skipped) return;
    const el = document.getElementById('ai-text');
    if (charIdx <= introMsg.length) {
      el.innerHTML = introMsg.slice(0, charIdx) + '<span class="cursor-blink">|</span>';
      charIdx++;
      setTimeout(typeAI, charIdx < 20 ? 55 : 38);
    } else {
      el.innerHTML = introMsg;
      typeDone = true;
      checkBothDone();
    }
  }

  function checkBothDone() {
    if (typeDone && speechDone && !skipped) {
      setTimeout(() => { if (!skipped) finishIntro(); }, 800);
    }
  }

  function finishIntro() {
    skipped = true;
    if (window.speechSynthesis) speechSynthesis.cancel();
    const overlay = document.getElementById('ai-overlay');
    overlay.style.transition = 'opacity .8s';
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 800);
  }

  window.skipIntro = function () {
    skipped = true;
    if (window.speechSynthesis) speechSynthesis.cancel();
    document.getElementById('ai-text').innerHTML = introMsg;
    finishIntro();
  };

  const skipBtn = document.getElementById('skip-btn');
  if (skipBtn) skipBtn.addEventListener('click', function () { skipIntro(); });

  setTimeout(() => { speakIntro(); typeAI(); }, 900);
}
