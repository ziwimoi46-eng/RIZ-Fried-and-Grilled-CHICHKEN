(function () {
  'use strict';

  var OWNER_EMAIL = 'rizwanrhan124@gmail.com';
  var OWNER_PASSWORD = 'Password123';
  var HIDDEN_KEY = 'riz_hidden_items';
  var LOGIN_KEY = 'riz_owner_logged_in';

  var isOwner = localStorage.getItem(LOGIN_KEY) === 'true';
  var hiddenItems = new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]'));

  function saveHidden() {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(Array.from(hiddenItems)));
  }

  /* ── Styles ── */
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
    '.riz-remove-wrap{padding-top:8px;border-top:1px solid rgba(0,0,0,.08);margin-top:8px;}',
    '.riz-remove-btn{width:100%;padding:6px 0;background:#dc2626;color:#fff;border:none;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.3px;}',
    '.riz-remove-btn:hover{background:#b91c1c;}',
  ].join('');
  document.head.appendChild(style);

  /* ── Login Button ── */
  var loginBtn = document.createElement('button');
  loginBtn.id = 'riz-owner-btn';
  loginBtn.textContent = isOwner ? '✓ Owner' : 'Owner Login';
  loginBtn.addEventListener('click', function () {
    if (isOwner) {
      if (confirm('Log out as owner?')) doLogout();
    } else {
      openModal();
    }
  });
  document.body.appendChild(loginBtn);

  /* ── Modal ── */
  var overlay = document.createElement('div');
  overlay.id = 'riz-overlay';
  overlay.innerHTML =
    '<div id="riz-modal">' +
      '<button class="riz-close" aria-label="Close">&#x2715;</button>' +
      '<h2>&#x1F512; Owner Login</h2>' +
      '<div id="riz-error">Invalid email or password.</div>' +
      '<input type="email" id="riz-email" placeholder="Email" autocomplete="username" />' +
      '<input type="password" id="riz-pass" placeholder="Password" autocomplete="current-password" />' +
      '<button class="riz-submit">Login</button>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('.riz-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  overlay.querySelector('.riz-submit').addEventListener('click', attemptLogin);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && overlay.classList.contains('open')) attemptLogin();
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  function openModal() {
    overlay.querySelector('#riz-email').value = '';
    overlay.querySelector('#riz-pass').value = '';
    overlay.querySelector('#riz-error').style.display = 'none';
    overlay.classList.add('open');
    setTimeout(function () { overlay.querySelector('#riz-email').focus(); }, 80);
  }

  function closeModal() {
    overlay.classList.remove('open');
  }

  function attemptLogin() {
    var email = overlay.querySelector('#riz-email').value.trim();
    var pass = overlay.querySelector('#riz-pass').value;
    if (email === OWNER_EMAIL && pass === OWNER_PASSWORD) {
      isOwner = true;
      localStorage.setItem(LOGIN_KEY, 'true');
      loginBtn.textContent = '✓ Owner';
      closeModal();
      addAllRemoveButtons();
    } else {
      overlay.querySelector('#riz-error').style.display = 'block';
    }
  }

  function doLogout() {
    isOwner = false;
    localStorage.removeItem(LOGIN_KEY);
    loginBtn.textContent = 'Owner Login';
    document.querySelectorAll('.riz-remove-wrap').forEach(function (el) { el.remove(); });
  }

  /* ── Card Detection ── */
  function getMenuCards() {
    return Array.from(document.querySelectorAll('#menu [class*="bg-card"][class*="rounded-2xl"]'));
  }

  function getCardName(card) {
    var h4 = card.querySelector('h4');
    return h4 ? h4.textContent.trim() : null;
  }

  function addRemoveButton(card) {
    if (card.querySelector('.riz-remove-wrap')) return;
    var name = getCardName(card);
    if (!name) return;

    var wrap = document.createElement('div');
    wrap.className = 'riz-remove-wrap';

    var btn = document.createElement('button');
    btn.className = 'riz-remove-btn';
    btn.textContent = 'Remove / Out of Stock';
    btn.addEventListener('click', function () {
      hiddenItems.add(name);
      saveHidden();
      hideCard(card);
    });

    wrap.appendChild(btn);
    card.appendChild(wrap);

    if (hiddenItems.has(name)) hideCard(card);
  }

  function hideCard(card) {
    card.style.display = 'none';
  }

  function addAllRemoveButtons() {
    getMenuCards().forEach(function (card) { addRemoveButton(card); });
  }

  function applyHiddenState() {
    if (hiddenItems.size === 0) return;
    getMenuCards().forEach(function (card) {
      var name = getCardName(card);
      if (name && hiddenItems.has(name)) hideCard(card);
    });
  }

  /* ── MutationObserver (React re-renders) ── */
  var processing = false;
  var observer = new MutationObserver(function () {
    if (processing) return;
    processing = true;
    requestAnimationFrame(function () {
      if (isOwner) addAllRemoveButtons();
      applyHiddenState();
      processing = false;
    });
  });

  /* ── Init after React mounts ── */
  function waitForMenu() {
    var menuSection = document.querySelector('#menu');
    if (!menuSection) { setTimeout(waitForMenu, 300); return; }
    if (isOwner) addAllRemoveButtons();
    applyHiddenState();
    observer.observe(document.querySelector('#root') || document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForMenu);
  } else {
    waitForMenu();
  }
})();
