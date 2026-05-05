'use strict';

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app       = express();
const PORT      = process.env.PORT || 5000;
const STOCK_FILE = path.join(__dirname, 'stock.json');

app.use(express.json());
app.use(express.static(__dirname));

function readStock() {
  try {
    return JSON.parse(fs.readFileSync(STOCK_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
}

function writeStock(data) {
  fs.writeFileSync(STOCK_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/stock', function (req, res) {
  res.json(readStock());
});

app.post('/api/stock', function (req, res) {
  var body = req.body;
  if (!body || typeof body.name !== 'string' || typeof body.available !== 'boolean') {
    return res.status(400).json({ error: 'Invalid body. Needs { name: string, available: boolean }' });
  }
  var stock = readStock();
  stock[body.name] = body.available;
  writeStock(stock);
  res.json({ ok: true, name: body.name, available: body.available });
});

app.listen(PORT, function () {
  console.log('Riz server running on port ' + PORT);
});
