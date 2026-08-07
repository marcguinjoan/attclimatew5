# Desplegar el simulador ATTCLIMPOLS a GitHub Pages

Aquesta carpeta ja conté tot el que cal:
- `index.html` — el simulador (fitxer autònom, sense dependències de build)
- `Code.gs` — script d'Apps Script per rebre respostes a Google Sheets (opcional, veure README.md)
- `README.md` — explicació general
- `.nojekyll` — evita que GitHub processi el lloc amb Jekyll (no cal per aquest projecte)

## Passos suggerits (per executar amb Claude Code / bash)

1. **Crear el repositori** (si encara no existeix). Amb GitHub CLI (`gh`) autenticat:
   ```bash
   cd /path/to/aquesta/carpeta
   git init
   git add .
   git commit -m "Simulador ATTCLIMPOLS Ola 5"
   gh repo create attclimpols-simulador --public --source=. --remote=origin --push
   ```
   Si `gh` no està autenticat o no és disponible, crear el repo manualment a github.com
   i després:
   ```bash
   git remote add origin https://github.com/<usuari>/attclimpols-simulador.git
   git branch -M main
   git push -u origin main
   ```

2. **Activar GitHub Pages**:
   - Amb `gh`: `gh api repos/<usuari>/attclimpols-simulador/pages -X POST -f "source[branch]=main" -f "source[path]=/"`
   - O manualment: Settings → Pages → Branch `main`, carpeta `/ (root)` → Save.

3. **Comprovar l'URL**: al cap d'1-2 minuts, la pàgina estarà a
   `https://<usuari>.github.io/attclimpols-simulador/`

4. **(Opcional) Domini propi**: si es vol servir des d'un subdomini com
   `simulador.marcguinjoan.com`, crear un fitxer `CNAME` (sense extensió) amb
   una sola línia `simulador.marcguinjoan.com`, pujar-lo al repo, i afegir un
   registre CNAME al DNS apuntant a `<usuari>.github.io`. Aquest pas és
   independent de Google Sites.

5. **(Opcional) Incrustar a Google Sites**: un cop es tingui la URL de
   GitHub Pages, a `sites.marcguinjoan.com` → Insertar → Incrustar →
   Per URL → enganxar l'adreça de GitHub Pages.

## Nota sobre Google Sheets

El botó "Guardar respostes" de `index.html` només funcionarà si s'ha
desplegat `Code.gs` com a aplicació web i s'ha enganxat la URL resultant
a la constant `APPS_SCRIPT_URL` dins `index.html` **abans** de fer el push
(o bé fer un segon commit després d'afegir-la). Veure `README.md` per als
detalls d'aquest pas, que és manual (requereix confirmar permisos al compte
de Google).
