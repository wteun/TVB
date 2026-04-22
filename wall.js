'use strict';

// Detects whether firebase-config.js has been filled in
function isConfigured() {
  return typeof FIREBASE_CONFIG !== 'undefined' &&
         FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY';
}

const wallList    = document.getElementById('wallList');
const wallEmpty   = document.getElementById('wallEmpty');
const wallSetup   = document.getElementById('wallSetup');
const wallCount   = document.getElementById('wallCount');
const liveIndicator = document.getElementById('liveIndicator');

if (!isConfigured()) {
  if (wallSetup)  wallSetup.style.display  = 'block';
  if (wallList)   wallList.style.display   = 'none';
} else {
  initWall();
}

function initWall() {
  firebase.initializeApp(FIREBASE_CONFIG);
  const db       = firebase.database();
  const msgRef   = db.ref('messages').orderByChild('ts').limitToLast(50);

  if (liveIndicator) liveIndicator.classList.add('live');

  let count = 0;

  msgRef.on('value', snapshot => {
    const messages = [];
    snapshot.forEach(child => messages.unshift({ id: child.key, ...child.val() }));
    count = messages.length;
    renderWall(messages);
    if (wallCount) wallCount.textContent = count;
  });
}

function renderWall(messages) {
  if (!wallList) return;
  if (messages.length === 0) {
    if (wallEmpty) wallEmpty.style.display = 'block';
    return;
  }
  if (wallEmpty) wallEmpty.style.display = 'none';

  wallList.innerHTML = '';
  messages.forEach((msg, i) => {
    const el = document.createElement('div');
    el.className = 'wall-card' + (i === 0 ? ' wall-card--new' : '');
    el.innerHTML = `
      <div class="wall-card-top">
        <span class="wall-card-emoji">${msg.emoji || '🍺'}</span>
        <span class="wall-card-time">${timeAgo(msg.ts)}</span>
      </div>
      <p class="wall-card-text">${escapeHtml(msg.text)}</p>
      <p class="wall-card-verdict">${escapeHtml(msg.verdict)}</p>
    `;
    wallList.appendChild(el);
  });
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function escapeHtml(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// Called from app.js after a verdict is generated
window.postToWall = function(text, verdict, emoji) {
  if (!isConfigured()) return;
  const db = firebase.database();
  db.ref('messages').push({ text, verdict, emoji, ts: Date.now() });
};
