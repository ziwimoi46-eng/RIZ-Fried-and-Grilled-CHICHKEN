'use strict';

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const axios   = require('axios');

const app            = express();
const PORT           = process.env.PORT || 5000;
const STOCK_FILE     = path.join(__dirname, 'stock.json');
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';

app.use(express.json());
app.use(express.static(__dirname));

/* ── Local JSON fallback helpers ── */
function readStock() {
  try { return JSON.parse(fs.readFileSync(STOCK_FILE, 'utf8')); }
  catch (e) { return {}; }
}
function writeStock(data) {
  fs.writeFileSync(STOCK_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* ── GET /api/stock ── */
app.get('/api/stock', function (req, res) {
  if (!APPS_SCRIPT_URL) {
    return res.json(readStock());
  }
  axios.get(APPS_SCRIPT_URL, { maxRedirects: 10, timeout: 8000 })
    .then(function (r) { res.json(r.data); })
    .catch(function (err) {
      console.warn('[stock] Google Sheets fetch failed, using local fallback:', err.message);
      res.json(readStock());
    });
});

/* ── POST /api/stock ── */
app.post('/api/stock', function (req, res) {
  var body = req.body;
  if (!body || typeof body.name !== 'string' || typeof body.available !== 'boolean') {
    return res.status(400).json({ error: 'Needs { name: string, available: boolean }' });
  }

  /* Always update local stock.json immediately so fallback stays current */
  var local = readStock();
  local[body.name] = body.available;
  writeStock(local);

  if (!APPS_SCRIPT_URL) {
    return res.json({ ok: true, source: 'local' });
  }

  axios.post(APPS_SCRIPT_URL, { name: body.name, available: body.available }, {
    maxRedirects: 10,
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
  })
    .then(function (r) { res.json(Object.assign({}, r.data, { source: 'sheets' })); })
    .catch(function (err) {
      console.warn('[stock] Google Sheets write failed, saved locally only:', err.message);
      res.json({ ok: true, source: 'local-only', error: err.message });
    });
});

app.listen(PORT, function () {
  var mode = APPS_SCRIPT_URL ? 'Google Sheets mode' : 'local stock.json mode';
  console.log('Riz server running on port ' + PORT + ' — ' + mode);
});
