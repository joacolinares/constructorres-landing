// CRM de leads · Constructorres — Google Apps Script
// Pegar en la planilla: Extensiones > Apps Script. Implementar como App web (Ejecutar como: Yo · Acceso: Cualquier usuario).
// La clave NO va en el repositorio: reemplazar PEGAR_CLAVE por la clave del equipo.
const KEY = "PEGAR_CLAVE";
const COLS = ["fecha","nombre","whatsapp","email","ciudad","reunion","busca","monto","decide","cuando","puntaje","perfil","estado","utm_source","utm_campaign","utm_content","notas"];
function sheet_() { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads"); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean_(v) { v = v == null ? "" : String(v).slice(0, 2000); return /^[=+\-@]/.test(v) ? "'" + v : v; }
function doPost(e) {
  const d = JSON.parse((e.postData && e.postData.contents) || "{}");
  const sh = sheet_();
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    if (d.action === "update") {
      if (d.key !== KEY) return out_({ ok: false, error: "key" });
      const r = Number(d.row);
      if (!(r >= 2 && r <= sh.getLastRow())) return out_({ ok: false, error: "row" });
      ["estado", "notas"].forEach(f => { if (d[f] !== undefined) sh.getRange(r, COLS.indexOf(f) + 1).setValue(clean_(d[f])); });
      return out_({ ok: true });
    }
    sh.appendRow(COLS.map(c => c === "notas" ? "" : clean_(c === "estado" ? (d[c] || "Nuevo") : d[c])));
    return out_({ ok: true });
  } finally { lock.releaseLock(); }
}
function doGet(e) {
  const p = e.parameter || {};
  if (p.key !== KEY) return out_({ ok: false, error: "key" });
  const sh = sheet_(), n = sh.getLastRow();
  const vals = n > 1 ? sh.getRange(2, 1, n - 1, COLS.length).getValues() : [];
  const rows = vals.map((v, i) => { const o = { row: i + 2 }; COLS.forEach((c, j) => o[c] = v[j] instanceof Date ? v[j].toISOString() : v[j]); return o; });
  return out_({ ok: true, rows: rows, serverTime: new Date().toISOString() });
}
