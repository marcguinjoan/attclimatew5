# ATTCLIMPOLS Ola 5 · Simulador de pràctica

Simulador interactiu del qüestionari ATTCLIMPOLS Ola 5 (v8), amb la mateixa
lògica de blocs, experiments, aleatorització i branques condicionals que
l'instrument real. Pensat per practicar i cronometrar l'enquesta abans del
camp — no és l'eina de recollida de dades del panell.

Comença amb la pàgina de consentiment informat i acaba amb el debriefing, el
bloc del qual s'adapta al grup que l'atzar t'hagi assignat a l'Experiment B.
Es pot navegar endavant i endarrere lliurement, i cap pregunta obliga a
respondre: l'objectiu és cronometrar i revisar el recorregut, no recollir
dades vàlides.

A cada pantalla hi ha una caixa **«Deixar comentari»** per apuntar-hi què no
s'entén, què caldria canviar o qualsevol observació sobre aquella pregunta.

El cartell-estímul de l'Experiment B **no** s'inclou com a imatge, i no s'hi
ha d'afegir: l'expedient de la comissió d'ètica es compromet a que aquell
material no es difongui fora de l'enquesta.

## Com queden les dades al full

Una fila per resposta. Després de les columnes fixes (marques de temps, temps
total i condicions assignades a cada experiment) hi ha, per a cada pregunta i
en l'ordre del qüestionari, la columna de la variable i just a la dreta la del
comentari:

```text
timestamp_servidor | … | expE_versio | gender | gender_comment | age | age_comment | …
```

El nom de la columna surt de l'etiqueta de variable de la pregunta. Quan
l'etiqueta no és un nom net (bateries com `[pol_cc_*]`, o pantalles
informatives sense variable) es fa servir el codi de pregunta, que sempre és
únic. Les respostes de bateries i de conjoints es guarden com a JSON dins de
la seva cel·la.

Les columnes es creen soles la primera vegada que apareix una variable, de
manera que les preguntes condicionals —que no tothom veu— no descol·loquen
res.

## Publicar-lo amb GitHub Pages

1. Puja aquest fitxer `index.html` a un repositori de GitHub (per exemple
   `attclimpols-simulador`).
2. Settings → Pages → Branch: `main` (o `master`) → carpeta `/root` → Save.
3. Al cap d'un parell de minuts, GitHub et donarà una URL del tipus
   `https://<el-teu-usuari>.github.io/attclimpols-simulador/`.
4. Comparteix aquesta URL amb qui vulguis que faci l'enquesta.

## Guardar les respostes a Google Sheets (opcional)

1. Obre el full "ATTCLIMPOLS Ola5 - Respostes del simulador" (ja creat al teu
   Drive).
2. Extensions → Apps Script, enganxa el contingut de `Code.gs` (inclòs en
   aquesta carpeta) i segueix les instruccions que hi ha al capçal del fitxer
   per desplegar-lo com a aplicació web.
3. Copia la URL que acaba en `/exec` i enganxa-la a la constant
   `APPS_SCRIPT_URL` a l'inici del `<script>` dins `index.html`.
4. Torna a pujar `index.html` a GitHub (sobreescrivint l'anterior).

Mentre `APPS_SCRIPT_URL` estigui buida, el simulador funciona igual però el
botó "Guardar respostes" de la pantalla final queda desactivat — no s'envia
res enlloc.
