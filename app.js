'use strict';

// ── Messages ────────────────────────────────────────────────

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
    { answer: "Absolutely. Immediately.",  sub: "A meeting survived is a beer deserved. Science agrees.", yes: true },
    { answer: "100%. Right now.",          sub: "Every calendar invite shaved minutes off your life. Compensate.", yes: true },
    { answer: "Yes. With extra foam.",     sub: "No jury in the world would convict you.", yes: true },
  ],
  monday:   [
    { answer: "Obviously yes.",            sub: "Monday is just the universe reminding you beer exists.", yes: true },
    { answer: "Yes. Unconditionally.",     sub: "Monday alone is grounds for emergency beer deployment.", yes: true },
    { answer: "Absolutely. It's Monday.", sub: "This needs no further justification.", yes: true },
  ],
  boss:     [
    { answer: "Yes. Immediately.",         sub: "Being CC'd is emotional labour. Beer is the antidote.", yes: true },
    { answer: "Yes — and make it a double.", sub: "Unsolicited CC's are a human rights issue.", yes: true },
  ],
  friday:   [
    { answer: "Yes. And here too.",        sub: "It's Friday everywhere that matters.", yes: true },
    { answer: "Obviously. It's Friday.",   sub: "The week is legally over after Thursday anyway.", yes: true },
  ],
  liver:    [
    { answer: "Your liver said: fine.",    sub: "Unanimous decision. No further questions.", yes: true },
    { answer: "Liver's vote: yes.",        sub: "It's used to it. Don't keep it waiting.", yes: true },
  ],
  overtime: [
    { answer: "Yes. Immediately.",         sub: "Overtime is unpaid therapy. Beer is the invoice.", yes: true },
    { answer: "Yes. Double rations.",      sub: "The company owes you. Collect in liquid form.", yes: true },
  ],
  excel:    [
    { answer: "Yes. Urgently.",            sub: "VLOOKUP trauma qualifies as a medical emergency.", yes: true },
    { answer: "Yes — the whole case.",     sub: "Conditional formatting alone justifies a brewery visit.", yes: true },
  ],
  zoom:     [
    { answer: "Yes. Right now.",           sub: "A call that could have been an email deserves a beer.", yes: true },
    { answer: "Yes. You've suffered enough.", sub: "Zoom fatigue is real and the cure is hops.", yes: true },
  ],
};

// ── Case input keyword matching ──────────────────────────────

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
      { emoji:'📅', text:'Day of week confirmed.', reason:"Time is a flat circle and beer is the only thing that makes it spin correctly." },
      { emoji:'✅', text:'Day-based approval granted.', reason:'The calendar itself is evidence enough.' },
    ]},
  { keys: ['email','emails','inbox','slack','teams','ping','notification','message'],
    verdicts: [
      { emoji:'📧', text:'Digital trauma approved.', reason:'Every unread notification is worth approximately 0.1 beers. Add them up.' },
      { emoji:'✅', text:'Case accepted.', reason:'Inbox zero is a myth. Beer is real. Choose real.' },
    ]},
  { keys: ['tired','exhausted','done','finished','dead','tired','drained','burnout'],
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
  { emoji:'🧐', text:'Unverified — approved anyway.', reason:'We couldn\'t match your specific crisis, but the desperation in your typing was convincing.' },
  { emoji:'⚖️', text:'Case reviewed. Beer granted.', reason:'The jury deliberated for 0.3 seconds. The verdict was obvious.' },
  { emoji:'🤷', text:'Unclear — approved on vibes.', reason:'We\'ve seen worse excuses. We\'ve approved worse excuses. Welcome to Just Beer.' },
  { emoji:'📋', text:'Insufficient evidence — approved.', reason:'The burden of proof for beer is very low. You cleared it.' },
];

// ── Schedule & time ──────────────────────────────────────────

const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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
function pick(arr)    { return arr[Math.floor(Math.random() * arr.length)]; }

// ── DOM helpers ──────────────────────────────────────────────

function updateDay() {
  const now = new Date();
  document.getElementById('currentDay').textContent =
    `${DAYS_EN[now.getDay()].toUpperCase()} · AMSTERDAM`;
  const el = document.getElementById('scheduleDate');
  if (el) el.textContent = now.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function updateActiveSlot() {
  document.querySelectorAll('.schedule-row').forEach(r => r.classList.remove('is-now'));
  const key = Object.keys(SLOTS).find(k => inSlot(SLOTS[k]));
  if (key) {
    const row = document.querySelector(`.schedule-row[data-slot="${key}"]`);
    if (row) row.classList.add('is-now');
  }
}

// ── Beer rain ────────────────────────────────────────────────

const BEER_EMOJIS = ['🍺','🍺','🍺','🍻','🍺','🍺','🍻','🥂'];
const beerRain = document.getElementById('beerRain');

function launchBeerRain() {
  beerRain.innerHTML = '';
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'beer-drop';
      el.textContent = BEER_EMOJIS[Math.floor(Math.random() * BEER_EMOJIS.length)];
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${1.2 + Math.random() * 2}rem`;
      const dur = 2.2 + Math.random() * 2.5;
      el.style.animationDuration = `${dur}s`;
      beerRain.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 100);
    }, i * 60);
  }
}

// ── Hero check ───────────────────────────────────────────────

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
  const yes = isBeerTime();
  let msg;
  if (yes)                         msg = pick(YES_MESSAGES);
  else if (inSlot(SLOTS.lunch))    msg = pick(LUNCH_MESSAGES);
  else if (inSlot(SLOTS.pingpong)) msg = pick(PING_PONG_MESSAGES);
  else                             msg = pick(WAIT_MESSAGES);
  showHeroResult(yes, msg);
}

document.getElementById('checkBtn').addEventListener('click', checkBeer);

// ── Instant verdict buttons ──────────────────────────────────

const instantAnswer = document.getElementById('instantAnswer');
const instantSub    = document.getElementById('instantSub');
const instantBlock  = document.getElementById('instantResponse');

document.querySelectorAll('.fun-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const reason = btn.dataset.reason;
    const pool   = BUTTON_MESSAGES[reason] || YES_MESSAGES;
    const msg    = pick(pool);

    // Wiggle the clicked button
    btn.classList.remove('wiggle');
    void btn.offsetWidth;
    btn.classList.add('wiggle');

    // Show response
    instantAnswer.classList.remove('show');
    instantSub.classList.remove('show');
    void instantAnswer.offsetWidth;

    instantAnswer.textContent = msg.answer;
    instantSub.textContent    = msg.sub;
    instantBlock.classList.add('visible');

    requestAnimationFrame(() => {
      instantAnswer.classList.add('show', 'yes');
      instantSub.classList.add('show');
    });

    showHeroResult(true, msg);
    launchBeerRain();

    // Highlight the active button
    document.querySelectorAll('.fun-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Make your case ───────────────────────────────────────────

const caseInput   = document.getElementById('caseInput');
const caseSubmit  = document.getElementById('caseSubmit');
const caseResp    = document.getElementById('caseResponse');
const caseEmoji   = document.getElementById('caseEmoji');
const caseVerdict = document.getElementById('caseVerdict');
const caseReason  = document.getElementById('caseReason');
const charCount   = document.getElementById('charCount');

caseInput.addEventListener('input', () => {
  charCount.textContent = `${caseInput.value.length} / 280`;
});

function judgeCase() {
  const text = caseInput.value.trim().toLowerCase();
  if (!text) {
    caseInput.classList.add('shake-input');
    setTimeout(() => caseInput.classList.remove('shake-input'), 500);
    caseInput.placeholder = 'You need to actually type something... 🤨';
    return;
  }

  let verdict = null;
  for (const rule of CASE_RULES) {
    if (rule.keys.some(k => text.includes(k))) {
      verdict = pick(rule.verdicts);
      break;
    }
  }
  if (!verdict) verdict = pick(CASE_FALLBACKS);

  caseEmoji.textContent   = verdict.emoji;
  caseVerdict.textContent = verdict.text;
  caseReason.textContent  = verdict.reason;

  caseResp.classList.remove('visible');
  void caseResp.offsetWidth;
  caseResp.classList.add('visible');

  showHeroResult(true, { answer: verdict.text, sub: verdict.reason });
  launchBeerRain();
}

caseSubmit.addEventListener('click', judgeCase);
caseInput.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') judgeCase();
});

// ── Init ─────────────────────────────────────────────────────

updateDay();
updateActiveSlot();
setInterval(updateActiveSlot, 30 * 1000);

window.addEventListener('load', () => setTimeout(checkBeer, 300));
