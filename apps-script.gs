/**
 * Riz Fried & Grilled Chicken — Stock Manager
 * Google Apps Script Web App
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Delete any existing code, paste this entire file
 * 4. Click "Deploy" → "New deployment"
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy → copy the Web App URL
 * 9. Paste that URL into Replit Secrets as APPS_SCRIPT_URL
 *
 * SHEET STRUCTURE (Sheet must be named "Stock"):
 * Column A: item name   (e.g. "Chicken Popcorn")
 * Column B: available   (TRUE or FALSE)
 *
 * Row 1 is the header row:
 *   item | available
 */

var SHEET_NAME = 'Stock';

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

/* ── GET /exec  → returns all stock as JSON ── */
function doGet(e) {
  var sheet = getSheet();
  var rows  = sheet.getDataRange().getValues(); /* [[item, available], ...] */
  var result = {};

  for (var i = 1; i < rows.length; i++) {
    var name      = String(rows[i][0]).trim();
    var available = rows[i][1];
    if (!name) continue;
    /* Sheets stores booleans as TRUE/FALSE or "TRUE"/"FALSE" strings */
    result[name] = (available === true || String(available).toUpperCase() === 'TRUE');
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── POST /exec  body: { name, available } → updates row ── */
function doPost(e) {
  try {
    var body      = JSON.parse(e.postData.contents);
    var name      = String(body.name).trim();
    var available = body.available === true || body.available === 'true';

    var sheet = getSheet();
    var rows  = sheet.getDataRange().getValues();

    for (var i = 1; i < rows.length; i++) {
      if (String(rows[i][0]).trim() === name) {
        sheet.getRange(i + 1, 2).setValue(available);
        return ContentService
          .createTextOutput(JSON.stringify({ ok: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    /* Item not found — add a new row */
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1).setValue(name);
    sheet.getRange(lastRow + 1, 2).setValue(available);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, added: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
