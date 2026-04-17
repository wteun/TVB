'use strict';

const YES_MESSAGES = [
  { answer: "Yes. It's beer o'clock.", sub: "The clock doesn't lie. The tap awaits." },
  { answer: "Absolutely. Right now.",  sub: "Scientifically confirmed. No debate." },
  { answer: "Yes — pour it already.",  sub: "Every indicator is green." },
  { answer: "Without a doubt.",        sub: "The universe has spoken. Cheers." },
  { answer: "Yes. You've earned it.",  sub: "You've waited long enough today." },
  { answer: "Yes. Immediately.",       sub: "Every second of delay is wasted." },
  { answer: "Yes. Obviously.",         sub: "Why are you even still asking?" },
];

const LUNCH_MESSAGES = [
  { answer: "Not yet — it's lunch.",   sub: "Eat first. Beer rewards patience." },
  { answer: "Lunch break, not beer.",  sub: "Fuel up now, celebrate later." },
];

const PING_PONG_MESSAGES = [
  { answer: "Not yet — ping pong.",    sub: "Win the match. Earn the beer." },
  { answer: "Paddle first, pint next.", sub: "Priorities: table tennis, then tap." },
];

const WAIT_MESSAGES = [
  { answer: "Not quite yet.",          sub: "Hold tight — beer o'clock is coming." },
  { answer: "Almost. Not quite.",      sub: "The countdown to 15:00 is on." },
  { answer: "Patience. Beer is near.", sub: "Good things come to those who wait." },
  { answer: "Technically: no.",        sub: "But who follows technicalities?" },
];

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

// Schedule windows (in minutes since midnight)
const SLOTS = {
  lunch:    { start: 12 * 60,      end: 12 * 60 + 30 },
  pingpong: { start: 12 * 60 + 30, end: 13 * 60      },
  beer:     { start: 15 * 60,      end: 24 * 60      },
};

function minutesNow() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}
function inSlot(slot) {
  const m = minutesNow();
  return m >= slot.start && m < slot.end;
}
function isBeerTime() { return inSlot(SLOTS.beer); }

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function updateDay() {
  const now = new Date();
  const day = DAYS_EN[now.getDay()].toUpperCase();
  document.getElementById('currentDay').textContent = `${day} · AMSTERDAM`;
  const dateEl = document.getElementById('scheduleDate');
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}

// Highlight the slot that's currently active
function updateActiveSlot() {
  document.querySelectorAll('.schedule-row').forEach(r => r.classList.remove('is-now'));
  let activeKey = null;
  if (inSlot(SLOTS.lunch))    activeKey = 'lunch';
  else if (inSlot(SLOTS.pingpong)) activeKey = 'pingpong';
  else if (inSlot(SLOTS.beer))     activeKey = 'beer';
  if (activeKey) {
    const row = document.querySelector(`.schedule-row[data-slot="${activeKey}"]`);
    if (row) row.classList.add('is-now');
  }
}

// ── Beer emoji rain ──
const BEER_EMOJIS = ['🍺','🍺','🍺','🍻','🍺','🍺','🍺','🍻','🥂'];
const beerRain = document.getElementById('beerRain');

function launchBeerRain() {
  beerRain.innerHTML = '';
  const count = 45;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'beer-drop';
      el.textContent = BEER_EMOJIS[Math.floor(Math.random() * BEER_EMOJIS.length)];
      el.style.left     = `${Math.random() * 100}vw`;
      el.style.fontSize = `${1.2 + Math.random() * 2}rem`;
      const dur = 2.2 + Math.random() * 2.5;
      el.style.animationDuration = `${dur}s`;
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

  let msg;
  if (yes)                        msg = pick(YES_MESSAGES);
  else if (inSlot(SLOTS.lunch))   msg = pick(LUNCH_MESSAGES);
  else if (inSlot(SLOTS.pingpong)) msg = pick(PING_PONG_MESSAGES);
  else                            msg = pick(WAIT_MESSAGES);

  answerEl.classList.remove('show', 'yes', 'no');
  subEl.classList.remove('show');
  badgeEl.classList.remove('yes', 'no');
  void answerEl.offsetWidth;

  answerEl.textContent  = msg.answer;
  subEl.textContent     = msg.sub;
  badgeText.textContent = yes ? 'Yes,\nnow.' : 'Not\nyet.';

  requestAnimationFrame(() => {
    answerEl.classList.add('show', yes ? 'yes' : 'no');
    subEl.classList.add('show');
    badgeEl.classList.add(yes ? 'yes' : 'no');
  });

  document.body.classList.toggle('is-yes', yes);

  scanLine.classList.remove('flash');
  void scanLine.offsetWidth;
  scanLine.classList.add('flash');

  if (yes) launchBeerRain();
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

updateDay();
updateActiveSlot();
setInterval(updateActiveSlot, 30 * 1000);

window.addEventListener('load', () => setTimeout(checkBeer, 300));
