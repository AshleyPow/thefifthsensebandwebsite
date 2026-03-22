/**
 * Google Apps Script — append contact form rows to the active spreadsheet.
 *
 * 1. Paste into Apps Script (Extensions → Apps Script) bound to your sheet.
 * 2. Set EXPECTED_SECRET to match VITE_GOOGLE_FORM_SECRET in your site's .env
 *    (or '' to disable the check — not recommended in production).
 * 3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * 4. Copy the /exec URL into VITE_GOOGLE_SCRIPT_URL.
 */

var EXPECTED_SECRET = 'change-me-to-match-VITE_GOOGLE_FORM_SECRET';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    if (!e || !e.parameter) {
      return jsonResponse({ success: false, error: 'Invalid request' });
    }

    var p = e.parameter;

    if (EXPECTED_SECRET && EXPECTED_SECRET.length > 0) {
      if (p.secret !== EXPECTED_SECRET) {
        return jsonResponse({ success: false, error: 'Unauthorized' });
      }
    }

    var name = (p.name || '').toString().trim();
    var email = (p.email || '').toString().trim();
    var phone = (p.phone || '').toString().trim();
    var eventDate = (p.eventDate || '').toString().trim();
    var message = (p.message || '').toString().trim();

    if (!name || !email || !message) {
      return jsonResponse({ success: false, error: 'Missing required fields' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(),
      name,
      email,
      phone,
      eventDate,
      message,
    ]);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Optional: open the web app URL in a browser to verify deployment. */
function doGet() {
  return ContentService.createTextOutput('Contact form endpoint is running. Use POST from the website.');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
