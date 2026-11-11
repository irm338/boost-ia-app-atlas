---
name: instalar-atlas
description: Instala y deja funcionando Boost IA Atlas en este equipo (Node.js si falta, dependencias, detección de los vaults de Obsidian que ya existen y de las skills y agentes de Claude Code, Codex y Antigravity), instala el kit Boost IA de Campuslands (agentes y skills de frontend, backend, seguridad, video e imagen), conecta la memoria de Obsidian y lo abre en el navegador. Úsala cuando pidan instalar, configurar, actualizar o abrir Boost IA o el atlas, instalar el kit o una parte, o agregar un vault.
---

# Instalar Boost IA Atlas

La persona solo dio la URL del repositorio y dijo «instala». Haz todo tú; pregunta únicamente donde se indica. Detalle completo y casos raros: `AGENTS.md` e `INSTALAR.md` en la raíz del repositorio.

## Pasos

1. **Repositorio.** Si no estás dentro de él, clónalo en la carpeta de proyectos de la persona (`~/Documents/PROYECTOS`, `~/Projects`, `~/proyectos` o `~/code`, la primera que exista; si no, `~/boost-ia-app-atlas-software`). Privado → `gh repo clone <dueño>/<repo>`; sin sesión en `gh`, pregunta si puede ejecutar `gh auth login`.
2. **Instalador** (deja Node.js 20+ listo si falta, sin sudo):
   - macOS / Linux: `bash instalar.sh --json`
   - Windows: `powershell -ExecutionPolicy Bypass -File instalar.ps1 --json`
3. **Resumen JSON** (lo último que imprime):
   - `vaults` vacío → pregunta dónde están sus vaults y agrégalos con `npm run instalar -- --vault "<ruta>" --json`. **Nunca crees vaults ni notas**: si no tiene, que lo cree en Obsidian.
   - `sugerenciasDeVaults` → pregunta si son suyos antes de agregarlos.
   - `centro` → cámbialo con `--centro "<nombre>"` si la persona usa otro vault como principal.
4. **Español.** Si `totales.sinTraducir` > 0: `npm run traducir -- --lotes <carpeta>`, traduce cada `lote-NN.json` a `resultado-NN.json` (`{ clave: traducción }`, reglas en AGENTS.md → «Traducción») y `npm run traducir -- --importar <carpeta>`.
5. **El kit.** Pregunta si quiere todo o algunas áreas (`npm run kit -- --lista`). Luego `npm run kit -- --todo` o `npm run kit -- --area frontend,seguridad`. Con vaults: `npm run kit -- --obsidian` (solo agrega un bloque con sus rutas a las instrucciones globales de cada IA; no toca los vaults).
6. **Abrir.** El instalador ya dejó el acceso de doble clic «Boost IA Atlas» (`lanzadores` en el resumen). Ábrelo una vez con `npm run abrir`.

## Comprobar

- `npm run verificar` termina en «Todo en orden» y `npm run kit -- --estado` muestra lo instalado en cada IA.
- La portada muestra el kit; sus tres tarjetas dicen qué IA hay, si la memoria está conectada y cuántas piezas quedaron.
- Cuéntale a la persona qué quedó y que desde ahora abre Boost IA con **doble clic** en «Boost IA Atlas». Que cierre y vuelva a abrir su IA para que cargue el kit.

## Actualizar

`git pull`, `bash instalar.sh --json` y `npm run kit -- --todo` (o las áreas que tenía): conserva su configuración y actualiza el kit.
