// Gopika's Diwali Surprise Website
// Plain JavaScript - No external packages required.

// SELECT ELEMENTS

const $ = (selector) => document.querySelector(selector);

const introScreen = $('#introScreen');
const mainContent = $('#mainContent');
const canvas = $('#fireworksCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationFrame = null;

let audioContext = null;
let musicOn = false;
let musicTimer = null;


// CREATE BACKGROUND SPARKLES

function createSparkles() {

  const layer = $('#sparkleLayer');

  for (let i = 0; i < 48; i++) {

    const star = document.createElement('span');

    star.className = 'sparkle';

    star.textContent =
      Math.random() > 0.5 ? '✦' : '·';

    star.style.left = `${Math.random() * 100}%`;

    star.style.top = `${Math.random() * 100}%`;

    star.style.setProperty(
      '--size',
      `${5 + Math.random() * 10}px`
    );

    star.style.setProperty(
      '--duration',
      `${2.5 + Math.random() * 4}s`
    );

    star.style.setProperty(
      '--delay',
      `${Math.random() * 5}s`
    );

    layer.appendChild(star);

  }

}

createSparkles();


// OPEN WEBSITE

function openWebsite() {

  introScreen.classList.add('leaving');

  mainContent.classList.remove('hidden');

  document.body.classList.add('site-open');

  window.setTimeout(() => {

    introScreen.style.display = 'none';

  }, 950);

  burst(
    window.innerWidth / 2,
    window.innerHeight * 0.42,
    85
  );

}

$('#openSurpriseBtn').addEventListener(
  'click',
  openWebsite
);


// LIGHT DIYA

function lightDiya() {

  const diya = $('#interactiveDiya');

  diya.classList.remove('unlit');

  diya.classList.add('lit');

  $('#diyaMessage').textContent =
    'May your life always be filled with happiness and light! ✨';

  burst(
    window.innerWidth * 0.5,
    window.innerHeight * 0.58,
    28
  );

}

$('#lightDiyaBtn').addEventListener(
  'click',
  lightDiya
);

$('#interactiveDiya').addEventListener(
  'click',
  lightDiya
);


// OPEN AND CLOSE MODALS

function openModal(id) {

  const modal = document.getElementById(id);

  modal.classList.add('open');

  modal.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';

}


function closeModal(modal) {

  modal.classList.remove('open');

  modal.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

}


// GIFT INTERACTION

function openGift() {

  $('#giftBtn').classList.add('opened');

  $('#giftMessage').textContent =
    'A little happiness, wrapped up just for you. ♡';

  openModal('giftModal');

  burst(
    window.innerWidth / 2,
    window.innerHeight / 2,
    65
  );

}

$('#giftBtn').addEventListener(
  'click',
  openGift
);

$('#openGiftTextBtn').addEventListener(
  'click',
  openGift
);


// SECRET LETTER

function openLetter() {

  $('#letterBtn').classList.add('opened');

  openModal('letterModal');

}

$('#letterBtn').addEventListener(
  'click',
  openLetter
);

$('#openLetterTextBtn').addEventListener(
  'click',
  openLetter
);


// MAKE A WISH

$('#wishBtn').addEventListener('click', () => {

  $('#wishMessage').textContent =
    'A shooting star is carrying your wish tonight...';

  openModal('wishModal');

  burst(
    window.innerWidth / 2,
    window.innerHeight * 0.34,
    90
  );

});


// CLOSE MODALS

document.querySelectorAll('[data-close]').forEach(
  (element) => {

    element.addEventListener('click', () => {

      closeModal(
        document.getElementById(element.dataset.close)
      );

    });

  }
);


// CLOSE USING ESCAPE KEY

document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {

    document.querySelectorAll('.modal.open').forEach(
      closeModal
    );

  }

});


// FIREWORKS CANVAS

function resizeCanvas() {

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width =
    Math.floor(window.innerWidth * dpr);

  canvas.height =
    Math.floor(window.innerHeight * dpr);

  canvas.style.width =
    `${window.innerWidth}px`;

  canvas.style.height =
    `${window.innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

}

window.addEventListener(
  'resize',
  resizeCanvas
);

resizeCanvas();


// FIREWORKS BURST

function burst(x, y, count = 55) {

  const palette = [
    '#ffe6a3',
    '#f6bd68',
    '#e98a9d',
    '#d8a4ee',
    '#fff2d2',
    '#f58b51'
  ];

  for (let i = 0; i < count; i++) {

    const angle =
      (Math.PI * 2 * i) / count +
      Math.random() * 0.18;

    const speed =
      1.2 + Math.random() * 4.4;

    particles.push({

      x,
      y,

      vx: Math.cos(angle) * speed,

      vy: Math.sin(angle) * speed,

      life: 50 + Math.random() * 38,

      maxLife: 88,

      size: 1 + Math.random() * 2.3,

      color:
        palette[
          Math.floor(Math.random() * palette.length)
        ],

      gravity: 0.035 + Math.random() * 0.035

    });

  }

  if (!animationFrame) {

    animateFireworks();

  }

}


// ANIMATE FIREWORKS

function animateFireworks() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  particles = particles.filter(
    (p) => p.life > 0
  );

  for (const p of particles) {

    p.x += p.vx;

    p.y += p.vy;

    p.vy += p.gravity;

    p.vx *= 0.988;

    p.vy *= 0.988;

    p.life -= 1;

    ctx.globalAlpha = Math.max(
      0,
      p.life / p.maxLife
    );

    ctx.fillStyle = p.color;

    ctx.shadowBlur = 10;

    ctx.shadowColor = p.color;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }

  ctx.globalAlpha = 1;

  ctx.shadowBlur = 0;

  if (particles.length) {

    animationFrame =
      requestAnimationFrame(animateFireworks);

  } else {

    cancelAnimationFrame(animationFrame);

    animationFrame = null;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

  }

}


// FULL CELEBRATION

function celebration() {

  const positions = [

    [
      window.innerWidth * .18,
      window.innerHeight * .30
    ],

    [
      window.innerWidth * .5,
      window.innerHeight * .22
    ],

    [
      window.innerWidth * .82,
      window.innerHeight * .32
    ],

    [
      window.innerWidth * .32,
      window.innerHeight * .55
    ],

    [
      window.innerWidth * .7,
      window.innerHeight * .58
    ]

  ];

  positions.forEach(([x, y], index) => {

    window.setTimeout(() => {

      burst(x, y, 72);

    }, index * 280);

  });

}


// CELEBRATION BUTTONS

$('#celebrateBtn').addEventListener(
  'click',
  celebration
);

$('#heroFireworksBtn').addEventListener(
  'click',
  celebration
);

$('#replayBtn').addEventListener('click', () => {

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  celebration();

});


// OPTIONAL BACKGROUND MUSIC
// Soft synthesized tones, not a copyrighted recording.


function playSoftTone() {

  if (!audioContext || !musicOn) {
    return;
  }

  const now = audioContext.currentTime;

  const notes = [
    261.63,
    329.63,
    392.00,
    329.63
  ];

  const noteIndex =
    Math.floor(now / 2.4) % notes.length;

  const osc =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();

  const lowpass =
    audioContext.createBiquadFilter();

  osc.type = 'sine';

  osc.frequency.value =
    notes[noteIndex];

  lowpass.type = 'lowpass';

  lowpass.frequency.value = 700;

  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.035,
    now + 0.25
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 2.1
  );

  osc.connect(lowpass);

  lowpass.connect(gain);

  gain.connect(audioContext.destination);

  osc.start(now);

  osc.stop(now + 2.2);

}


// TOGGLE MUSIC

async function toggleMusic() {

  const button = $('#musicBtn');

  if (!audioContext) {

    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) {

      button.querySelector('span').textContent =
        'Audio unavailable';

      return;

    }

    audioContext = new AudioContextClass();

  }

  if (audioContext.state === 'suspended') {

    await audioContext.resume();

  }

  musicOn = !musicOn;

  if (musicOn) {

    playSoftTone();

    musicTimer = window.setInterval(
      playSoftTone,
      2400
    );

    button.querySelector('span').textContent =
      'Music on';

    button.setAttribute(
      'aria-label',
      'Turn festive tones off'
    );

  } else {

    window.clearInterval(musicTimer);

    musicTimer = null;

    button.querySelector('span').textContent =
      'Music off';

    button.setAttribute(
      'aria-label',
      'Turn festive tones on'
    );

  }

}

$('#musicBtn').addEventListener(
  'click',
  toggleMusic
);