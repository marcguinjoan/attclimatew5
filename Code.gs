/**
 * ATTCLIMPOLS Ola 5 · Simulador — receptor de respostes
 *
 * Instal·lació (a fer un sol cop):
 * 1. Obre el full "ATTCLIMPOLS Ola5 - Respostes del simulador" a Google Sheets.
 * 2. Extensions > Apps Script.
 * 3. Esborra el contingut per defecte de Code.gs i enganxa-hi tot aquest fitxer.
 * 4. Desa (icona de disquet).
 * 5. Desplega > Nova implementació.
 *    - Tipus: "Aplicació web"
 *    - Executar com a: "Jo (el teu correu)"
 *    - Qui té accés: "Qualsevol persona"
 * 6. Autoritza els permisos quan Google t'ho demani (és el teu propi script).
 * 7. Copia la URL que et dona ("URL de l'aplicació web") — acaba en /exec.
 * 8. Enganxa aquesta URL a la constant APPS_SCRIPT_URL de l'HTML del simulador.
 *
 * Cada vegada que algú acaba l'enquesta al simulador i clica "Guardar respostes",
 * s'afegirà una fila nova en aquest full.
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Respostes');
  if (!sheet) {
    sheet = ss.insertSheet('Respostes');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'timestamp_servidor',
      'timestamp_client',
      'temps_total_segons',
      'expA_condicio',
      'expB_condicio',
      'expD_grup',
      'expE_versio',
      'respostes_json',
      'temps_per_pantalla_json'
    ]);
  }

  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = {};
  }
  var assign = data.assign || {};

  sheet.appendRow([
    new Date(),
    data.timestampClient || '',
    data.totalSeconds || '',
    assign.expA_condition || '',
    assign.expB_condition || '',
    assign.expD_group || '',
    assign.expE_version || '',
    JSON.stringify(data.answers || {}),
    JSON.stringify(data.timings || [])
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'El receptor funciona. Usa POST per enviar respostes.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
