/**
 * dailystoptoshop - Google Sheet order logger (Apps Script Web App)
 *
 * DEPLOYMENT (from inside the target spreadsheet):
 *  1. Sheet > Extensions > Apps Script. Paste this as Code.gs.
 *  2. Project Settings > Script Properties: add SHEETS_TOKEN = <long random string>
 *     (the SAME value as the Worker secret SHEETS_TOKEN).
 *  3. Deploy > New deployment > Web app. Execute as: Me. Access: Anyone.
 *  4. Copy the /exec URL -> Worker secret SHEETS_WEBAPP_URL.
 */

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty('SHEETS_TOKEN');
    if (!expected || body.token !== expected) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' })).setMimeType(ContentService.MimeType.JSON);
    }
    var o = body.order || {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Order ID', 'Payment ID', 'Items', 'Subtotal', 'Shipping', 'Total', 'Name', 'Phone', 'Email', 'Address', 'Pincode']);
    }
    var items = (o.items || []).map(function (i) { return i.name + ' x' + i.quantity + ' (INR ' + i.lineTotal + ')'; }).join('; ');
    sheet.appendRow([new Date(), o.orderId || '', o.paymentId || '', items, o.subtotal || 0, o.shipping || 0, o.total || 0, o.name || '', o.phone || '', o.email || '', o.address || '', o.pincode || '']);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
