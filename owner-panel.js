(function () {
  'use strict';

  var OWNER_EMAIL    = 'rizwanrhan124@gmail.com';
  var OWNER_PASSWORD = 'Password123';
  var LOGIN_KEY      = 'riz_owner_logged_in';
  var POLL_INTERVAL  = 30000; /* re-fetch every 30 s for cross-device sync */

  /* ── ?admin=1 in URL auto-opens login ── */
  var adminParam = new URLSearchParams(window.location.search).get('admin') === '1';

  var isOwner  = localStorage.getItem(LOGIN_KEY) === 'true';
  var stockMap = {};

  /* ─────────────────────────────── Styles ─── */
  var style = document.createElement('style');
  style.textContent = [
    '#riz-owner-btn{position:fixed;top:16px;right:16px;z-index:99999;background:#b91c1c;color:#fff;border:none;padding:7px 16px;border-radius:999px;cursor:pointer;font-size:12px;font-weight:700;letter-spacing:.4px;box-shadow:0 2px 10px rgba(0,0,0,.35);font-family:inherit;}',
    '#riz-owner-btn:hover{background:#991b1b;}',

    '#riz-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:999999;align-items:center;justify-content:center;}',
    '#riz-overlay.open{display:flex;}',
    '#riz-modal{background:#111827;color:#f9fafb;padding:36px 30px 30px;border-radius:18px;width:360px;max-width:92vw;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.5);}',
    '#riz-modal h2{margin:0 0 22px;font-size:19px;font-weight:800;font-family:inherit;}',
    '#riz-modal input{display:block;width:100%;padding:11px 14px;margin-bottom:13px;border-radius:9px;border:1px solid #374151;background:#1f2937;color:#f9fafb;font-size:14px;box-sizing:border-box;font-family:inherit;outline:none;}',
    '#riz-modal input:focus{border-color:#b91c1c;}',
    '#riz-modal .riz-submit{width:100%;padding:12px;background:#b91c1c;color:#fff;border:none;border-radius:9px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;}',
    '#riz-modal .riz-submit:hover{background:#991b1b;}',
    '#riz-modal .riz-close{position:absolute;top:14px;right:16px;background:none;border:none;color:#9ca3af;font-size:22px;cursor:pointer;line-height:1;}',
    '#riz-error{color:#f87171;font-size:13px;margin-bottom:12px;display:none;font-family:inherit;}',

    '.riz-card-oos{opacity:.45;pointer-events:none;}',
    '.riz-card-oos .riz-owner-wrap{pointer-events:auto;}',
    '.riz-oos-badge{display:inline-block;background:#dc2626;color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:5px;letter-spacing:.5px;margin-bottom:6px;font-family:inherit;text-transform:uppercase;}',

    '.riz-owner-wrap{padding-top:8px;border-top:1px solid rgba(0,0,0,.08);margin-top:8px;}',
    '.riz-toggle-btn{width:100%;padding:6px 0;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.3px;}',
    '.riz-toggle-btn.riz-mark-oos{background:#dc2626;color:#fff;}',
    '.riz-toggle-btn.riz-mark-oos:hover{background:#b91c1c;}',
    '.riz-toggle-btn.riz-mark-in{background:#16a34a;color:#fff;}',
    '.riz-toggle-btn.riz-mark-in:hover{background:#15803d;}',
  ].join('');
  document.head.appendChild(style);

  /* ─────────────────── Login Button (always visible) ─── */
  var loginBtn = document.createElement('button');
  loginBtn.id = 'riz-owner-btn';
  loginBtn.textContent = isOwner ? '✓ Owner' : 'Owner Login';
  loginBtn.addEventListener('click', function () {
    isOwner ? (confirm('Log out as owner?') && doLogout()) : openModal();
  });
  document.body.appendChild(loginBtn);

  /* ────────────────────────────────── Modal ─── */
  var overlay = document.createElement('div');
  overlay.id = 'riz-overlay';
  overlay.innerHTML =
    '<div id="riz-modal">' +
      '<button class="riz-close" aria-label="Close">&#x2715;</button>' +
      '<h2>&#x1F512; Admin Login</h2>' +
      '<div id="riz-error">Access Denied. Invalid email or password.</div>' +
      '<input type="email" id="riz-email" placeholder="Email" autocomplete="username" />' +
      '<input type="password" id="riz-pass" placeholder="Password" autocomplete="current-password" />' +
      '<button class="riz-submit">Login</button>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('.riz-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  overlay.querySelector('.riz-submit').addEventListener('click', attemptLogin);
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Enter')  attemptLogin();
    if (e.key === 'Escape') closeModal();
  });

  function openModal() {
    overlay.querySelector('#riz-email').value = '';
    overlay.querySelector('#riz-pass').value  = '';
    overlay.querySelector('#riz-error').style.display = 'none';
    overlay.classList.add('open');
    setTimeout(function () { overlay.querySelector('#riz-email').focus(); }, 80);
  }
  function closeModal() { overlay.classList.remove('open'); }

  function attemptLogin() {
    var email = overlay.querySelector('#riz-email').value.trim();
    var pass  = overlay.querySelector('#riz-pass').value;
    if (email === OWNER_EMAIL && pass === OWNER_PASSWORD) {
      isOwner = true;
      localStorage.setItem(LOGIN_KEY, 'true');
      loginBtn.textContent = '✓ Owner';
      closeModal();
      processAllCards();
    } else {
      overlay.querySelector('#riz-error').style.display = 'block';
    }
  }

  function doLogout() {
    isOwner = false;
    localStorage.removeItem(LOGIN_KEY);
    loginBtn.textContent = 'Owner Login';
    document.querySelectorAll('.riz-owner-wrap').forEach(function (el) { el.remove(); });
  }

  /* ─────────────────── Stock API helpers ─── */
  function fetchStock(callback) {
    fetch('/api/stock')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        stockMap = data;
        if (callback) callback();
      })
      .catch(function (err) {
        console.warn('[RizPanel] Could not fetch stock:', err);
        if (callback) callback();
      });
  }

  function postStock(name, available) {
    fetch('/api/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, available: available })
    }).catch(function (err) {
      console.warn('[RizPanel] Could not update stock:', err);
    });
  }

  /* ─────────────────────── Apply OOS visual ─── */
  function applyOOSVisual(card, isOOS) {
    var existing = card.querySelector('.riz-oos-badge');
    if (isOOS) {
      if (!existing) {
        var badge = document.createElement('span');
        badge.className = 'riz-oos-badge';
        badge.textContent = 'Out of Stock';
        var h4 = card.querySelector('h4');
        if (h4 && h4.parentNode) h4.parentNode.insertBefore(badge, h4);
      }
      card.classList.add('riz-card-oos');
    } else {
      if (existing) existing.remove();
      card.classList.remove('riz-card-oos');
    }
  }

  /* ─────────────── Card detection ─── */
  function getMenuCards() {
    return Array.from(document.querySelectorAll('#menu [class*="bg-card"][class*="rounded-2xl"]'));
  }
  function getCardName(card) {
    var h4 = card.querySelector('h4');
    return h4 ? h4.textContent.trim() : null;
  }

  /* ─────────────── Process a card ─── */
  function processCard(card) {
    var name = getCardName(card);
    if (!name) return;

    var available = Object.prototype.hasOwnProperty.call(stockMap, name)
      ? stockMap[name] : true;
    var isOOS = !available;

    applyOOSVisual(card, isOOS);

    if (!isOwner) return;

    var wrap = card.querySelector('.riz-owner-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'riz-owner-wrap';
      card.appendChild(wrap);
    }
    wrap.innerHTML = '';

    var btn = document.createElement('button');
    btn.className = 'riz-toggle-btn ' + (isOOS ? 'riz-mark-in' : 'riz-mark-oos');
    btn.textContent = isOOS ? '✓ Mark In Stock' : 'Mark Out of Stock';
    btn.addEventListener('click', function () {
      var nowOOS = !stockMap[name];
      stockMap[name] = !nowOOS;
      postStock(name, !nowOOS);
      applyOOSVisual(card, nowOOS);
      btn.className  = 'riz-toggle-btn ' + (nowOOS ? 'riz-mark-in' : 'riz-mark-oos');
      btn.textContent = nowOOS ? '✓ Mark In Stock' : 'Mark Out of Stock';
    });
    wrap.appendChild(btn);
  }

  function processAllCards() {
    getMenuCards().forEach(function (card) { processCard(card); });
  }

  /* ──────────────── MutationObserver ─── */
  var processing = false;
  var observer = new MutationObserver(function () {
    if (processing) return;
    processing = true;
    requestAnimationFrame(function () { processAllCards(); processing = false; });
  });

  /* ────────── Cross-device polling ─── */
  function startPolling() {
    setInterval(function () { fetchStock(processAllCards); }, POLL_INTERVAL);
  }

  /* ────────────────────────── Init ─── */
  function waitForMenu() {
    var menuSection = document.querySelector('#menu');
    if (!menuSection) { setTimeout(waitForMenu, 300); return; }

    fetchStock(function () {
      processAllCards();
      startPolling();
      /* auto-open login if ?admin=1 and not already logged in */
      if (adminParam && !isOwner) openModal();
    });

    observer.observe(document.querySelector('#root') || document.body, {
      childList: true, subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForMenu);
  } else {
    waitForMenu();
  }
})();
