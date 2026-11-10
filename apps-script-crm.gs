// CRM de leads · Constructorres
// Pegar en: Google Sheets > Extensiones > Apps Script. Después: Implementar > Nueva implementación > App web
// Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario. Copiar la URL y pegarla en SHEET_WEBHOOK (index.html).
const COLS = ["fecha","nombre","whatsapp","email","ciudad","reunion","busca","monto","decide","cuando","puntaje","perfil","estado","utm_source","utm_campaign","utm_content"];
function doPost(e) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); sh.setFrozenRows(1); }
  const d = JSON.parse(e.postData.contents || "{}");
  sh.appendRow(COLS.map(c => d[c] ?? ""));
  return ContentService.createTextOutput("ok");
}
