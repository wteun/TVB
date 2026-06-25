'use strict';

const YES_MESSAGES = [
  { answer: "Yes. It's beer o'clock.",  sub: "The clock doesn't lie. The tap awaits." },
  { answer: "Absolutely. Right now.",   sub: "Scientifically confirmed. No debate." },
  { answer: "Yes — pour it already.",   sub: "Every indicator is green." },
  { answer: "Without a doubt.",         sub: "The universe has spoken. Cheers." },
  { answer: "Yes. You've earned it.",   sub: "You've waited long enough today." },
  { answer: "Yes. Immediately.",        sub: "Every second of delay is wasted." },
  { answer: "Yes. Obviously.",          sub: "Why are you even still asking?" },
];

const LUNCH_MESSAGES = [
  { answer: "Not yet — it's lunch.",    sub: "Eat first. Beer rewards patience." },
  { answer: "Lunch first, beer after.", sub: "Fuel the machine before you break it." },
];

const PING_PONG_MESSAGES = [
  { answer: "Not yet — ping pong.",      sub: "Win the match. Earn the beer." },
  { answer: "Paddle first, pint next.",  sub: "Priorities: table tennis, then tap." },
];

const WAIT_MESSAGES = [
  { answer: "Not quite yet.",            sub: "Hold tight — beer o'clock is coming." },
  { answer: "Almost. Not quite.",        sub: "The countdown to 15:00 is very much on." },
  { answer: "Patience. Beer is near.",   sub: "Good things come to those who wait." },
  { answer: "Technically: no.",          sub: "But who follows technicalities?" },
];

const BUTTON_MESSAGES = {
  meeting:  [
    { answer: "Absolutely. Immediately.",    sub: "A meeting survived is a beer deserved. Science agrees." },
    { answer: "100%. Right now.",            sub: "Every calendar invite shaved minutes off your life. Compensate." },
    { answer: "Yes. With extra foam.",       sub: "No jury in the world would convict you." },
  ],
  monday:   [
    { answer: "Obviously yes.",              sub: "Monday is just the universe reminding you beer exists." },
    { answer: "Yes. Unconditionally.",       sub: "Monday alone is grounds for emergency beer deployment." },
    { answer: "Absolutely. It's Monday.",   sub: "This needs no further justification." },
  ],
  boss:     [
    { answer: "Yes. Immediately.",           sub: "Being CC'd is emotional labour. Beer is the antidote." },
    { answer: "Yes — and make it a double.", sub: "Unsolicited CC's are a human rights issue." },
  ],
  friday:   [
    { answer: "Yes. And here too.",          sub: "It's Friday everywhere that matters." },
    { answer: "Obviously. It's Friday.",     sub: "The week is legally over after Thursday anyway." },
  ],
  liver:    [
    { answer: "Your liver said: fine.",      sub: "Unanimous decision. No further questions." },
    { answer: "Liver's vote: yes.",          sub: "It's used to it. Don't keep it waiting." },
  ],
  overtime: [
    { answer: "Yes. Immediately.",           sub: "Overtime is unpaid therapy. Beer is the invoice." },
    { answer: "Yes. Double rations.",        sub: "The company owes you. Collect in liquid form." },
  ],
  excel:    [
    { answer: "Yes. Urgently.",              sub: "VLOOKUP trauma qualifies as a medical emergency." },
    { answer: "Yes — the whole case.",       sub: "Conditional formatting alone justifies a brewery visit." },
  ],
  zoom:     [
    { answer: "Yes. Right now.",             sub: "A call that could have been an email deserves a beer." },
    { answer: "Yes. You've suffered enough.", sub: "Zoom fatigue is real and the cure is hops." },
  ],
};

const CASE_RULES = [
  { keys: ['meeting','meetings','standup','stand-up','retro','retrospective','sprint','agile','scrum'],
    verdicts: [
      { emoji:'😵', text:'Approved.', reason:'Any sentence containing the word "synergy" entitles you to at least two beers.' },
      { emoji:'✅', text:'Case accepted.', reason:'Meetings are the tax you pay for having colleagues. Beer is the refund.' },
    ]},
  { keys: ['boss','manager','ceo','cto','management','hr','performance','review'],
    verdicts: [
      { emoji:'😅', text:'Strongly approved.', reason:'Managerial contact is classified as an occupational hazard. Beer is the PPE.' },
      { emoji:'🍺', text:'Verdict: yes.', reason:'Your boss will never know. The beer, however, will always be there for you.' },
    ]},
  { keys: ['monday','tuesday','wednesday','thursday','friday','weekend','saturday','sunday'],
    verdicts: [
      { emoji:'📅', text:'Day of week confirmed.', reason:'Time is a flat circle and beer is the only thing that makes it spin correctly.' },
      { emoji:'✅', text:'Day-based approval granted.', reason:'The calendar itself is evidence enough.' },
    ]},
  { keys: ['email','emails','inbox','slack','teams','ping','notification','message'],
    verdicts: [
      { emoji:'📧', text:'Digital trauma approved.', reason:'Every unread notification is worth approximately 0.1 beers. Add them up.' },
      { emoji:'✅', text:'Case accepted.', reason:'Inbox zero is a myth. Beer is real. Choose real.' },
    ]},
  { keys: ['tired','exhausted','done','finished','dead','drained','burnout'],
    verdicts: [
      { emoji:'😮‍💨', text:'Fatigue approved.', reason:'Your body is 60% water and it is asking to be replaced with something better.' },
      { emoji:'💤', text:'Rest approved — in liquid form.', reason:'Science suggests beer pairs well with exhaustion. We agree.' },
    ]},
  { keys: ['excel','spreadsheet','formula','vlookup','pivot','csv','data'],
    verdicts: [
      { emoji:'📊', text:'URGENTLY approved.', reason:'VLOOKUP is a form of psychological warfare. Beer is the Geneva Convention.' },
      { emoji:'😤', text:'Approved with prejudice.', reason:'Anyone who touches a spreadsheet voluntarily deserves a medal and a beer.' },
    ]},
  { keys: ['deserve','earned','worked hard','worked all','long day','long week'],
    verdicts: [
      { emoji:'🏅', text:'You have earned it.', reason:'The effort has been noted. The beer has been dispatched.' },
      { emoji:'✅', text:'Merit-based approval.', reason:'Hard work is its own reward. Beer is the other reward.' },
    ]},
  { keys: ['sad','upset','bad day','terrible','awful','horrible','worst'],
    verdicts: [
      { emoji:'🤗', text:'Emotional support approved.', reason:'Beer will not solve your problems. But it will make them blurrier and quieter.' },
      { emoji:'❤️', text:'Comfort approval granted.', reason:'Whatever happened today, you made it to 5pm. That counts for a lot.' },
    ]},
  { keys: ['deadline','launch','deploy','release','production','bug','error','crash'],
    verdicts: [
      { emoji:'🚨', text:'Emergency approved.', reason:"Production incidents are beer-eligible by international law. Don't look it up." },
      { emoji:'🍺', text:'Incident approved.', reason:'Every bug fixed is a round earned. Every bug introduced is two rounds.' },
    ]},
  { keys: ['baby','kid','kids','children','toddler','parent','parenting'],
    verdicts: [
      { emoji:'👶', text:'Parental override: approved.', reason:'You are outnumbered by tiny irrational humans. Beer is triage.' },
      { emoji:'✅', text:'Parenting credit applied.', reason:'The amount of beer you deserve scales with the number of "but why?" questions received today.' },
    ]},
];

const CASE_FALLBACKS = [
  { emoji:'🧐', text:'Unverified — approved anyway.', reason:"We couldn't match your specific crisis, but the desperation in your typing was convincing." },
  { emoji:'⚖️', text:'Case reviewed. Beer granted.', reason:'The jury deliberated for 0.3 seconds. The verdict was obvious.' },
  { emoji:'🤷', text:'Unclear — approved on vibes.', reason:"We've seen worse excuses. We've approved worse excuses. Welcome to Just Beer." },
  { emoji:'📋', text:'Insufficient evidence — approved.', reason:'The burden of proof for beer is very low. You cleared it.' },
];

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const SLOTS = {
  lunch:    { start: 12 * 60,      end: 12 * 60 + 30 },
  pingpong: { start: 12 * 60 + 30, end: 13 * 60      },
  beer:     { start: 15 * 60,      end: 24 * 60      },
};

const BEER_EMOJIS = ['🍺','🍺','🍺','🍻','🍺','🍺','🍻','🥂'];

function minutesNow() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}
function inSlot(slot) { const m = minutesNow(); return m >= slot.start && m < slot.end; }
function isBeerTime() { return true; }
function pick(arr)    { return arr[Math.floor(Math.random() * arr.length)]; }

// ── DOM ──────────────────────────────────────────────────────

function updateDay() {
  const now = new Date();
  document.getElementById('currentDay').textContent =
    `${DAYS_EN[now.getDay()].toUpperCase()} · AMSTERDAM`;
  const el = document.getElementById('scheduleDate');
  if (el) el.textContent = now.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

let currentSlot = null;
function updateActiveSlot() {
  const key = Object.keys(SLOTS).find(k => inSlot(SLOTS[k])) ?? null;
  if (key === currentSlot) return;
  document.querySelectorAll('.schedule-row').forEach(r => r.classList.remove('is-now'));
  if (key) document.querySelector(`.schedule-row[data-slot="${key}"]`)?.classList.add('is-now');
  currentSlot = key;
}

// ── Beer rain ────────────────────────────────────────────────

const beerRain = document.getElementById('beerRain');
let rainTimeouts = [];

function launchBeerRain() {
  rainTimeouts.forEach(id => clearTimeout(id));
  rainTimeouts = [];
  beerRain.innerHTML = '';
  for (let i = 0; i < 45; i++) {
    const id = setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'beer-drop';
      el.textContent = pick(BEER_EMOJIS);
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${1.2 + Math.random() * 2}rem`;
      const dur = 2.2 + Math.random() * 2.5;
      el.style.animationDuration = `${dur}s`;
      beerRain.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }, i * 60);
    rainTimeouts.push(id);
  }
}

// ── Hero ─────────────────────────────────────────────────────

const answerEl  = document.getElementById('answerText');
const subEl     = document.getElementById('answerSub');
const badgeEl   = document.getElementById('verdictBadge');
const badgeText = document.getElementById('badgeText');
const scanLine  = document.getElementById('scanLine');

function showHeroResult(yes, msg) {
  answerEl.classList.remove('show','yes','no');
  subEl.classList.remove('show');
  badgeEl.classList.remove('yes','no');
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

function checkBeer() {
  showHeroResult(true, pick(YES_MESSAGES));
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

// ── Instant verdict buttons ──────────────────────────────────

const instantResponse = document.getElementById('instantResponse');
const instantAnswer   = document.getElementById('instantAnswer');
const instantSub      = document.getElementById('instantSub');
let activeBtn = null;

document.querySelectorAll('.fun-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = pick(BUTTON_MESSAGES[btn.dataset.reason] ?? YES_MESSAGES);

    btn.classList.remove('wiggle');
    void btn.offsetWidth;
    btn.classList.add('wiggle');

    instantAnswer.classList.remove('show');
    instantSub.classList.remove('show');
    void instantAnswer.offsetWidth;

    instantAnswer.textContent = msg.answer;
    instantSub.textContent    = msg.sub;
    instantResponse.classList.add('visible');

    requestAnimationFrame(() => {
      instantAnswer.classList.add('show', 'yes');
      instantSub.classList.add('show');
    });

    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');
    activeBtn = btn;

    showHeroResult(true, msg);
  });
});

// ── Make your case ───────────────────────────────────────────

const caseInput   = document.getElementById('caseInput');
const caseResp    = document.getElementById('caseResponse');
const caseEmoji   = document.getElementById('caseEmoji');
const caseVerdict = document.getElementById('caseVerdict');
const caseReason  = document.getElementById('caseReason');
const charCount   = document.getElementById('charCount');

caseInput.addEventListener('input', () => {
  charCount.textContent = `${caseInput.value.length} / 280`;
});

let shakeTimeout = null;
function judgeCase() {
  const text = caseInput.value.trim().toLowerCase();
  if (!text) {
    clearTimeout(shakeTimeout);
    caseInput.classList.remove('shake-input');
    void caseInput.offsetWidth;
    caseInput.classList.add('shake-input');
    shakeTimeout = setTimeout(() => caseInput.classList.remove('shake-input'), 500);
    caseInput.placeholder = 'You need to actually type something... 🤨';
    return;
  }

  const rule    = CASE_RULES.find(r => r.keys.some(k => text.includes(k)));
  const verdict = pick(rule ? rule.verdicts : CASE_FALLBACKS);

  caseEmoji.textContent   = verdict.emoji;
  caseVerdict.textContent = verdict.text;
  caseReason.textContent  = verdict.reason;

  caseResp.classList.remove('visible');
  void caseResp.offsetWidth;
  caseResp.classList.add('visible');

  showHeroResult(true, { answer: verdict.text, sub: verdict.reason });
}

document.getElementById('caseSubmit').addEventListener('click', judgeCase);
caseInput.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') judgeCase();
});

// ── Countdown to 17:00 Amsterdam ─────────────────────────────

const countdownBlock = document.getElementById('countdownBlock');
const countdownLabel = document.getElementById('countdownLabel');
const countdownTime  = document.getElementById('countdownTime');

function getAmsterdamHMS() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(new Date());
  return {
    h: +parts.find(p => p.type === 'hour').value,
    m: +parts.find(p => p.type === 'minute').value,
    s: +parts.find(p => p.type === 'second').value,
  };
}

function updateCountdown() {
  countdownLabel.textContent = "IT'S ALWAYS BEER O'CLOCK";
  countdownTime.textContent  = '🍺🍺🍺';
  countdownBlock.classList.add('countdown--done');
}

// ── Init ─────────────────────────────────────────────────────

updateDay();
updateActiveSlot();
updateCountdown();
setInterval(updateActiveSlot, 30 * 1000);
setInterval(updateCountdown, 1000);
window.addEventListener('load', () => setTimeout(checkBeer, 300));
