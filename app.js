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

const NO_MESSAGES = [
  { answer: "Nog niet. Bijna.", sub: "De klok tikt. Het bier wacht." },
  { answer: "Helaas. Nog niet.", sub: "Probeer het over vijf minuten opnieuw." },
  { answer: "Nee. Maar vlak bij.", sub: "Uw geduld wordt binnenkort beloond." },
  { answer: "Technisch gezien: nee.", sub: "Maar wie houdt zich aan de techniek?" },
  { answer: "Nog niet.", sub: "Frustreer uzelf. Check dan opnieuw." },
  { answer: "De tijd is er niet.", sub: "Helaas. Dat kan veranderen." },
];

const ALWAYS_YES_HOURS = new Set([12, 13, 17, 18, 19, 20, 21, 22]);
const WEEKEND_YES_FROM = 11;

const DAYS_NL = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];

function isBeerTime() {
  const now = new Date();
  const h   = now.getHours();
  const m   = now.getMinutes();
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  if (isWeekend && h >= WEEKEND_YES_FROM) return true;
  if (ALWAYS_YES_HOURS.has(h)) return true;
  if (!isWeekend && h === 16 && m >= 30) return Math.random() > 0.4;
  if (Math.random() < 0.05) return true;
  return false;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('clock').textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  // Update eyebrow date line
  const day = DAYS_NL[now.getDay()].toUpperCase();
  document.getElementById('currentDay').textContent = `${day} · AMSTERDAM`;
}

const answerEl  = document.getElementById('answerText');
const subEl     = document.getElementById('answerSub');
const badgeEl   = document.getElementById('verdictBadge');
const badgeText = document.getElementById('badgeText');
const scanLine  = document.getElementById('scanLine');

function checkBeer() {
  const yes = isBeerTime();
  const msg = yes ? pick(YES_MESSAGES) : pick(NO_MESSAGES);

  // Reset
  answerEl.classList.remove('show', 'yes', 'no');
  subEl.classList.remove('show');
  badgeEl.classList.remove('yes', 'no');
  void answerEl.offsetWidth;

  // Set content
  answerEl.textContent = msg.answer;
  subEl.textContent    = msg.sub;
  badgeText.textContent = yes ? 'Ja,\nnu.' : 'Nog\nniet.';

  // Apply classes
  requestAnimationFrame(() => {
    answerEl.classList.add('show', yes ? 'yes' : 'no');
    subEl.classList.add('show');
    badgeEl.classList.add(yes ? 'yes' : 'no');
  });

  // Body theme
  document.body.classList.toggle('is-yes', yes);

  // Scan flash
  scanLine.classList.remove('flash');
  void scanLine.offsetWidth;
  scanLine.classList.add('flash');
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

setInterval(updateClock, 1000);
updateClock();

window.addEventListener('load', () => setTimeout(checkBeer, 300));
