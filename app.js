'use strict';

const YES_MESSAGES = [
  { answer: "Ja. Het is tijd.", sub: "De klok liegt niet. De biertap wacht." },
  { answer: "Absoluut. Nu.", sub: "Wetenschappelijk bewezen. Geen discussie." },
  { answer: "Ja — schenk maar in.", sub: "Alle indicatoren staan op groen." },
  { answer: "Zonder twijfel.", sub: "Het universum heeft gesproken. Proost." },
  { answer: "Ja. U verdient het.", sub: "U heeft lang genoeg gewacht." },
  { answer: "Ja. Onmiddellijk.", sub: "Elke seconde uitstel is verloren tijd." },
  { answer: "Ja. Vanzelfsprekend.", sub: "Waarom vraagt u dit eigenlijk nog?" },
];

const DAYS_NL = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

function isBeerTime() { return true; }

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('clock').textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const day = DAYS_NL[now.getDay()].toUpperCase();
  document.getElementById('currentDay').textContent = `${day} · AMSTERDAM`;
}

// ── Beer emoji rain ──
const BEER_EMOJIS = ['🍺','🍺','🍺','🍻','🍺','🍺','🍺','🍻','🥂'];
const beerRain = document.getElementById('beerRain');
let rainTimer = null;

function launchBeerRain() {
  beerRain.innerHTML = '';
  clearTimeout(rainTimer);

  const count = 40;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'beer-drop';
      el.textContent = BEER_EMOJIS[Math.floor(Math.random() * BEER_EMOJIS.length)];
      el.style.left     = `${Math.random() * 100}vw`;
      el.style.fontSize = `${1.2 + Math.random() * 2}rem`;
      const dur = 2.2 + Math.random() * 2.5;
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay   = '0s';
      beerRain.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }, i * 60);
  }
}

// ── Main ──
const answerEl  = document.getElementById('answerText');
const subEl     = document.getElementById('answerSub');
const badgeEl   = document.getElementById('verdictBadge');
const badgeText = document.getElementById('badgeText');
const scanLine  = document.getElementById('scanLine');

function checkBeer() {
  const yes = isBeerTime();
  const msg = pick(YES_MESSAGES);

  answerEl.classList.remove('show', 'yes', 'no');
  subEl.classList.remove('show');
  badgeEl.classList.remove('yes', 'no');
  void answerEl.offsetWidth;

  answerEl.textContent  = msg.answer;
  subEl.textContent     = msg.sub;
  badgeText.textContent = 'Ja,\nnu.';

  requestAnimationFrame(() => {
    answerEl.classList.add('show', 'yes');
    subEl.classList.add('show');
    badgeEl.classList.add('yes');
  });

  document.body.classList.add('is-yes');

  scanLine.classList.remove('flash');
  void scanLine.offsetWidth;
  scanLine.classList.add('flash');

  launchBeerRain();
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

setInterval(updateClock, 1000);
updateClock();

window.addEventListener('load', () => setTimeout(checkBeer, 300));
