/**
 * ATTCLIMPOLS Ola 5 · Simulador — receptor de respostes
 *
 * Instal·lació (a fer un sol cop):
 * 1. Obre el full "ATTCLIMPOLS Ola5 - Respostes del simulador" a Google Sheets.
 * 2. Extensions > Apps Script.
 * 3. ESBORRA tot el que hi hagi a l'editor, inclòs el "function myFunction() {}"
 *    que hi surt per defecte, i enganxa-hi tot aquest fitxer al seu lloc.
 *    IMPORTANT: doPost i doGet han de quedar com a funcions de primer nivell.
 *    Si les poses a dins de myFunction() o de qualsevol altra funció, Google no
 *    les trobarà i el simulador no podrà enviar-hi res.
 * 4. Desa (icona de disquet).
 * 5. Desplega > Nova implementació.
 *    - Tipus: "Aplicació web"
 *    - Executar com a: "Jo (el teu correu)"
 *    - Qui té accés: "Qualsevol persona"
 * 6. Autoritza els permisos quan Google t'ho demani (és el teu propi script).
 * 7. Copia la URL que et dona ("URL de l'aplicació web") — acaba en /exec.
 * 8. Enganxa aquesta URL a la constant APPS_SCRIPT_URL de l'HTML del simulador.
 *
 * Format del full: una fila per resposta. Després de les columnes fixes hi ha,
 * per a cada pregunta i en l'ordre del qüestionari, una columna amb el nom de
 * la variable i just a la dreta la del comentari. Per exemple:
 *
 *     ... | gender | gender_comment | age | age_comment | ...
 *
 * Les columnes es creen soles la primera vegada que apareix una variable, de
 * manera que les preguntes condicionals (que no tothom veu) no trenquen res.
 */

var SHEET_NAME = 'Respostes';
var FIXED_COLS = [
  'timestamp_servidor',
  'timestamp_client',
  'temps_total_segons',
  'expA_condicio',
  'expB_condicio',
  'expD_grup',
  'expE_versio'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = {};
    }
    var assign = data.assign || {};
    var flat = data.flat || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // Capçalera actual (o creació inicial)
    var header;
    if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
      header = FIXED_COLS.slice();
      sheet.appendRow(header);
      sheet.setFrozenRows(1);
    } else {
      header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // Afegeix les columnes noves que aparegui aquesta resposta, conservant
    // l'ordre en què arriben (variable seguida del seu comentari).
    var known = {};
    for (var i = 0; i < header.length; i++) known[header[i]] = true;

    var newCols = [];
    for (var key in flat) {
      if (!known[key]) {
        newCols.push(key);
        known[key] = true;
      }
    }
    if (newCols.length) {
      sheet.getRange(1, header.length + 1, 1, newCols.length).setValues([newCols]);
      header = header.concat(newCols);
    }

    // Munta la fila seguint l'ordre de la capçalera
    var values = {
      timestamp_servidor: new Date(),
      timestamp_client: data.timestampClient || '',
      temps_total_segons: data.totalSeconds || '',
      expA_condicio: assign.expA_condition || '',
      expB_condicio: assign.expB_condition || '',
      expD_grup: assign.expD_group || '',
      expE_versio: assign.expE_version || ''
    };
    for (var k in flat) values[k] = flat[k];

    var row = [];
    for (var c = 0; c < header.length; c++) {
      var name = header[c];
      row.push(values.hasOwnProperty(name) && values[name] !== null ? values[name] : '');
    }
    sheet.appendRow(row);

    return json({ status: 'ok', columnes: header.length, novesColumnes: newCols.length });
  } catch (err) {
    return json({ status: 'error', message: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return json({ status: 'El receptor funciona. Usa POST per enviar respostes.' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
