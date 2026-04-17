'use strict';

const YES_MESSAGES = [
  { answer: "JA! Het is BIERTIJD! 🍺", reason: "De klok liegt nooit. Pils, graag." },
  { answer: "ABSOLUUT JA! 🎉", reason: "Wetenschappelijk bewezen: nu is het perfecte moment." },
  { answer: "100% JA! 🍻", reason: "Je telefoon, je baas én de sterren zeggen: drink er eentje." },
  { answer: "OH JA! 🙌", reason: "De thermometer geeft 'Bierdorst' aan. Ga maar." },
  { answer: "JAZEKER! 🥂", reason: "Alle signalen staan op groen. Zelfs je kat knikt." },
  { answer: "YES! PROOST! 🥳", reason: "Het universum heeft je gekozen voor een koud biertje." },
  { answer: "ABSOLUUT! 🍺🍺", reason: "Je verdient het. Je hebt zo hard gezocht naar een excuus." },
  { answer: "TUURLIJK! 🤩", reason: "Zelfs de bierviltjes zijn opgewonden. Geniet ervan." },
];

const NO_MESSAGES = [
  { answer: "Nee... nog even niet. 😢", reason: "Maar het scheelt niet veel hoor." },
  { answer: "Helaas, nog niet. 😞", reason: "Misschien over 5 minuten opnieuw proberen?" },
  { answer: "Nope. 🙅", reason: "Je geweten zegt nee. Je maag zegt ook nee. Maar je hart..?" },
  { answer: "Nog niet, sorry. 😬", reason: "De bierklok staat op 'bijna'. Hou vol." },
  { answer: "Technisch gezien: nee. 🤓", reason: "Maar wie houdt zich aan de techniek?" },
  { answer: "Nog. Niet. 😤", reason: "Frustreer jezelf nog 5 minuten en check dan opnieuw." },
  { answer: "Het lot zegt: nee. ☁️", reason: "Maar de buurman is al begonnen, voor de statistiek." },
];

const ALWAYS_YES_HOURS = new Set([12, 13, 17, 18, 19, 20, 21, 22]);
const WEEKEND_YES_FROM = 11;

function isBeerTime() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const day = now.getDay(); // 0=Sun, 6=Sat
  const isWeekend = day === 0 || day === 6;

  // Always beer time on weekends from 11:00
  if (isWeekend && h >= WEEKEND_YES_FROM) return true;

  // Core beer hours on weekdays
  if (ALWAYS_YES_HOURS.has(h)) return true;

  // 'Almost' beer time edge cases - 50/50 after 16:30
  if (!isWeekend && h === 16 && m >= 30) return Math.random() > 0.4;

  // 5% chaos factor (because life is short)
  if (Math.random() < 0.05) return true;

  return false;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('clock').textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

// --- Confetti ---
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame = null;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function launchConfetti() {
  resizeCanvas();
  particles = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: 6 + Math.random() * 8,
    d: 20 + Math.random() * 60,
    color: ['#f5a623','#ffd700','#4ade80','#f472b6','#60a5fa','#a78bfa'][Math.floor(Math.random()*6)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltSpeed: 0.05 + Math.random() * 0.1,
    speed: 1.5 + Math.random() * 3,
  }));
  if (animFrame) cancelAnimationFrame(animFrame);
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let alive = false;
  for (const p of particles) {
    p.tiltAngle += p.tiltSpeed;
    p.y += p.speed;
    p.x += Math.sin(p.d / 30) * 1.2;
    p.tilt = Math.sin(p.tiltAngle) * 12;
    if (p.y < canvas.height + 20) alive = true;
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt, p.y);
    ctx.lineTo(p.x + p.tilt + p.r * Math.cos(p.tiltAngle), p.y + p.r * Math.sin(p.tiltAngle));
    ctx.stroke();
  }
  if (alive) animFrame = requestAnimationFrame(drawConfetti);
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- Main logic ---
const card      = document.getElementById('card');
const mainEmoji = document.getElementById('mainEmoji');
const answerEl  = document.getElementById('answerText');
const reasonEl  = document.getElementById('reasonText');
const foamEl    = document.getElementById('foamOverlay');

function checkBeer() {
  const yes = isBeerTime();
  const msg = yes ? pick(YES_MESSAGES) : pick(NO_MESSAGES);

  // Reset animations
  answerEl.classList.remove('show','yes','no');
  reasonEl.classList.remove('show');
  foamEl.classList.remove('show');

  void answerEl.offsetWidth; // reflow

  answerEl.textContent = msg.answer;
  reasonEl.textContent = msg.reason;
  answerEl.classList.add('show', yes ? 'yes' : 'no');
  reasonEl.classList.add('show');

  if (yes) {
    mainEmoji.textContent = '🍺';
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    setTimeout(() => foamEl.classList.add('show'), 200);
    launchConfetti();
    document.body.style.setProperty('--amber', '#f5a623');
  } else {
    mainEmoji.textContent = ['😢','😩','🥲','😔','☁️'][Math.floor(Math.random()*5)];
    if (animFrame) { cancelAnimationFrame(animFrame); ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

// Clock ticking every second
setInterval(updateClock, 1000);
updateClock();

// Auto-check on load
window.addEventListener('load', () => setTimeout(checkBeer, 400));
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
