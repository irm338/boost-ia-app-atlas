# Boost IA Atlas · instrucciones para agentes de IA

> Codex y Antigravity leen este archivo solos; Claude Code lo importa desde `CLAUDE.md`; Gemini CLI, desde `GEMINI.md`.
> **Si te pidieron instalar este repositorio, sigue «Instalar» de principio a fin.** La persona solo te dio la URL y dijo «instala»: tú te encargas de todo, sin pedirle pasos manuales salvo los que dicen «pregunta».

## Qué es

El regalo de **Campuslands** a sus egresados: la forma de trabajar con IA de su mentor, lista para instalar. Son dos cosas en una app local:

1. **El kit Boost IA** (`kit/`): 27 agentes y más de 100 skills para frontend, backend, calidad, seguridad, despliegue, video e imagen, que se instalan en Claude Code, Codex y Antigravity. Las skills de terceros se descargan de su repositorio original (con su autor y licencia); las propias viven en `kit/skills`.
2. **El atlas**: una página web local que dibuja los **vaults de Obsidian que la persona ya tiene**, sus skills y sus agentes. Solo lee: **nunca crea vaults, carpetas ni notas**.

Corre en la computadora de la persona y no sube nada a internet. No necesita cuentas ni llaves de API. Interfaz y textos en español.

## Instalar

Objetivo: que la persona termine con Boost IA abierto en el navegador, el kit instalado en sus IA, sus vaults conectados y sabiendo cómo volver a abrirlo.

1. **Conseguir el repositorio.** Si ya estás dentro de él (existe `instalar.sh`), sigue al paso 2. Si solo tienes la URL, clónalo en la carpeta de proyectos de la persona: usa la primera que exista de `~/Documents/PROYECTOS`, `~/Projects`, `~/proyectos`, `~/code`; si ninguna existe, `~/boost-ia-app-atlas-software`.
   - `git clone <url> <carpeta>`. Si es privado y git pide credenciales, usa `gh repo clone <dueño>/<repo> <carpeta>`; si `gh` no tiene sesión, **pregunta** a la persona si puede ejecutar `gh auth login` (el dueño del repositorio debe haberle dado acceso).
   - Si falta git: macOS `xcode-select --install` (abre un diálogo) o `brew install git`; Windows `winget install --id Git.Git -e --silent`; Linux el gestor de la distribución (`sudo apt-get install -y git`, `sudo dnf install -y git`). Alternativa sin git: descargar el ZIP del repositorio y descomprimirlo.
2. **Ejecutar el instalador** desde la raíz del repositorio. Instala Node.js 20+ si falta (sin sudo: Homebrew si ya existe, si no fnm o nvm; en Windows, winget), instala dependencias, detecta vaults, skills y agentes, corre `npm run verificar` y genera los datos:
   - macOS / Linux: `bash instalar.sh --json`
   - Windows: `powershell -ExecutionPolicy Bypass -File instalar.ps1 --json`
   Con `--json` lo último que imprime es un resumen en JSON: `vaults`, `sugerenciasDeVaults`, `centro`, `skills`, `agentes`, `totales`, `siguiente`.
3. **Revisar el resumen y ajustar** (cada ajuste regenera los datos):
   - `vaults` vacío → **pregunta** dónde están sus vaults de Obsidian y agrégalos: `npm run instalar -- --vault "<ruta>" --json`. **No crees vaults ni notas**: si no tiene ninguno, explícale que lo cree en Obsidian (es gratis, «Crear vault») y que el atlas lo encontrará solo. Sin vaults el kit se instala igual.
   - `sugerenciasDeVaults` → carpetas con `.obsidian` que Obsidian no tiene registradas. **Pregunta** si son suyas antes de agregarlas.
   - `centro` → el vault del que nacen los demás (se eligió solo). Si la persona tiene otro principal: `npm run instalar -- --centro "<nombre>"`.
   - Skills propias: las que viven fuera de las carpetas de las IAs ya cuentan como suyas. Para marcar las de su cuenta de GitHub o por nombre: `--cuenta <usuario>` y `--propia <texto>`.
4. **Traducir lo pendiente.** Regla del proyecto: todo texto descriptivo en español. Si `totales.sinTraducir` > 0:
   - Fuera de una sesión de Claude Code: `npm run traducir`.
   - Desde cualquier IA (incluida Claude Code): `npm run traducir -- --lotes <carpeta-temporal>`; traduce cada `lote-NN.json` (lista de `{ clave, tipo, texto }`) a `resultado-NN.json` (`{ "<clave>": "<traducción>" }`, todas las claves, JSON válido) con las reglas de «Traducción»; luego `npm run traducir -- --importar <carpeta-temporal>`. Si son muchos lotes y puedes, repártelos entre subagentes.
5. **Instalar el kit.** **Pregunta** si quiere todo el kit o solo algunas áreas (`frontend`, `backend`, `calidad`, `seguridad`, `despliegue`, `video`, `metodo`, `memoria`; `npm run kit -- --lista` muestra todo). Luego:
   - Todo: `npm run kit -- --todo` · por áreas: `npm run kit -- --area frontend,seguridad` · piezas sueltas: `npm run kit -- code-reviewer playwright`.
   - Necesita git e internet (baja solo las carpetas de cada skill, ~45 MB el kit completo). Instala solo en las IA que existan; nunca pisa lo que la persona ya tenía (lo reporta como conflicto).
   - Si hay vaults, conecta la memoria: `npm run kit -- --obsidian` agrega un bloque entre marcas en `CLAUDE.md`, `AGENTS.md` y `GEMINI.md` globales con las rutas de sus vaults. No escribe nada en los vaults.
   - También se puede hacer todo desde la portada de la app (botón «Instalar todo el kit»).
6. **Abrirlo.** El instalador ya creó el acceso de doble clic «Boost IA Atlas» (lista en `lanzadores` del resumen; macOS: `~/Applications` y el Escritorio; Windows: Escritorio y menú Inicio; Linux: menú de aplicaciones y Escritorio). Ábrelo una vez para la persona con `npm run abrir` (o `bash iniciar.sh` / `iniciar.ps1`): busca cambios, deja el servidor en segundo plano y abre `siguiente.url`. No hace falta dejar ningún proceso tuyo corriendo.
7. **Confirmar y contar.** `npm run verificar` debe terminar en «Todo en orden». Resume a la persona qué encontró (vaults y su centro, skills por IA, agentes, automatizaciones) y dile qué piezas del kit quedaron en cada IA y, con el texto de `siguiente.dobleClic`, que desde ahora abre Boost IA con **doble clic** en «Boost IA Atlas»: cada vez que lo abre busca cambios en sus vaults, skills y agentes, y se apaga solo al cerrar la pestaña.

**Actualizar una instalación existente:** `git pull`, luego `bash instalar.sh --json` (o `instalar.ps1`). Conserva su configuración y agrega lo nuevo que encuentre.

## Comandos

| Comando | Para qué |
|---|---|
| `bash instalar.sh` · `instalar.ps1` | Instalación completa (también para actualizar) |
| `bash iniciar.sh` · `iniciar.ps1` · `npm run abrir` | Abrir la app (instala primero si hace falta; `--dev` / `-Dev` para el modo desarrollo) |
| `npm run kit -- <opciones>` | El kit: `--lista`, `--estado`, `--todo`, `--area <ids>`, ids sueltos, `--obsidian`, `--obsidian-quitar`, `--quitar [ids]`, `--copiar`, `--json` |
| `npm run lanzador` | Volver a crear el acceso de doble clic «Boost IA Atlas» |
| `npm run desinstalar -- --si --json` | Desinstalar: apaga, quita el kit de sus IA (salvo `--conservar-kit`), los accesos y la app instalada (nunca los vaults; una copia con git conserva el código). Pregúntale a la persona antes |
| `npm run actualizar -- --json` | Instalar la versión nueva de Releases (`--buscar` solo revisa); conserva configuración y datos. En una copia con git, usar `git pull` |
| `npm run instalar -- <opciones>` | Instalador sin el paso de Node.js (`--vault`, `--quitar-vault`, `--centro`, `--skills IA=ruta`, `--agentes IA=ruta`, `--cuenta`, `--propia`, `--puerto`, `--redetectar`, `--solo-detectar`, `--json`) |
| `npm run detectar` | Volver a buscar vaults, skills y agentes nuevos sin generar datos |
| `npm run datos` | Regenerar los datos |
| `npm run traducir` | Traducir al español lo pendiente (`--lotes`, `--importar`) |
| `npm run verificar` | Prueba de humo en un equipo falso + revisión de estas instrucciones |
| `npm run dev` · `npm run build` | Servidor de desarrollo · compilación con revisión de tipos |

## Cómo se adapta a cada equipo

- `scripts/lib/detectar.mjs` busca:
  - **Vaults:** el registro de Obsidian (`obsidian.json` en macOS, Windows y Linux, incluido Flatpak y Snap); si no existe, carpetas con `.obsidian` en Documentos, Escritorio, Dropbox, OneDrive e iCloud.
  - **Skills:** `~/.claude/skills`, `$CODEX_HOME/skills` (o `~/.codex/skills`), `~/.gemini/config/skills`, `~/.gemini/antigravity/skills`, `~/.gemini/skills`, los builtin de Antigravity, `~/.agents/skills` y las skills de los **plugins activos** de Claude Code y Codex.
  - **Agentes:** `~/.claude/agents`, `~/.codex/agents`, `~/.gemini/agents`, agentes de plugins y `<proyecto>/.claude|.codex|.gemini|.agents/agents` dentro de las carpetas de proyectos.
  - **Automatizaciones:** launchd (macOS), systemd de usuario y cron (Linux) que tocan las rutas de los vaults.
  - **Sistema de memoria:** un `.memoria-system/` junto a los vaults (opcional) aporta propósito, colores, orden y enrutado.
- El resultado queda en `atlas.config.json` (local, ignorado por git). Formato en `docs/CONFIGURACION.md`.
- Prioridad: variables `ATLAS_*` > `atlas.config.json` > detección automática.

## Reglas para cualquier cambio en este repositorio

- **Obsidian en solo lectura:** el atlas y el kit leen los vaults que la persona ya tiene; nada crea vaults, carpetas ni plantillas. Lo único que se escribe en un vault es lo que la persona pide desde la app (marcar una tarea, capturar una idea).
- **Terceros con crédito:** las skills de otras personas nunca se copian a este repositorio; se declaran en `kit/catalogo.json` (repo, carpeta, licencia, autor) y se descargan del original.
- **Reutilizable:** nada de rutas, usuarios, nombres de vaults ni cuentas fijas en el código. Todo sale de la detección o de `atlas.config.json`. Funciona en macOS, Windows y Linux; lo que dependa de un sistema se detecta y se omite sin romper.
- **Todo en español:** interfaz, documentación, comentarios de código y commits. En inglés solo los nombres propios (vaults, skills, agentes, productos, comandos, código).
- **Sin datos personales en git:** `datos/` y `atlas.config.json` están ignorados. `traducciones/es.json` solo guarda traducciones de descripciones.
- **Al terminar cada cambio:** `npm run verificar` y `npm run build` deben pasar; actualiza README, `INSTALAR.md`, este archivo (si cambia la instalación o las reglas) y `CHANGELOG.md`.
- **Git:** una rama por cambio (`feat/…`, `fix/…`) creada desde el punto común de `dev` y `main`; commits `feat(<pantalla>): <explicación>` o `fix(<pantalla>): …`; fusión `--no-ff` en `dev` y en `main`, que quedan iguales. Sin líneas `Co-Authored-By` ni menciones a asistentes de IA.
- **El catálogo:** al sumar o quitar piezas edita `kit/catalogo.json` (y `kit/agentes/<slug>.md` o `kit/skills/<slug>/`); `npm run verificar` comprueba que todo cuadre.
- **La skill de instalación** vive en `.agents/skills/instalar-atlas/SKILL.md` (Antigravity y Codex) con una copia idéntica en `.claude/skills/instalar-atlas/SKILL.md` (Claude Code). Si cambias una, copia la otra: `npm run verificar` lo comprueba.
- **Límite de Antigravity:** cada archivo de reglas (este incluido) se corta a 24 KB.

## Traducción

Al traducir lotes (paso 4):

- Español neutro latinoamericano, profesional y natural, con tuteo («usa», «pides»).
- No traduzcas nombres de skills, agentes, vaults, productos, marcas, librerías, herramientas, comandos, código entre comillas invertidas, rutas, archivos, URLs, flags ni variables.
- `titulo`: título corto con mayúscula solo al inicio. `frase`: traducción fiel y fluida, conserva comillas, paréntesis y markdown en línea. `activador`: frase natural que diría un usuario hispanohablante. `documento` y `manual`: markdown; traduce solo la prosa y deja intactos encabezados, listas, tablas, bloques de código y enlaces.
- Si un texto ya está en español, devuélvelo igual. Valida que el JSON cargue y tenga todas las claves antes de importar.

## Mapa del repositorio

| Ruta | Qué hay |
|---|---|
| `instalar.sh`, `instalar.ps1`, `iniciar.sh`, `iniciar.ps1` | Arranque por sistema operativo |
| `Instalar en Mac.command`, `Instalar en Windows.cmd`, `Instalar en Linux.sh` | Instaladores de doble clic de la descarga (copian la app a una ubicación fija, instalan, crean el acceso y la abren) |
| `scripts/abrir.mjs`, `scripts/lanzador.mjs`, `instalador/` | La app de doble clic: arranque, acceso por sistema operativo e íconos |
| `kit/catalogo.json` | El kit: áreas, agentes, skills (propias y de terceros con su repo), kits de la comunidad y flujos de «Cómo trabajo» |
| `kit/agentes/`, `kit/skills/` | Agentes del kit (una fuente, se convierten al formato de cada IA al instalar) y skills propias |
| `scripts/kit.mjs`, `scripts/lib/kit.mjs` | Instalar, quitar y ver el estado del kit; bloque de Obsidian en las instrucciones globales |
| `scripts/instalar.mjs` | Detección + configuración + verificación + datos |
| `scripts/lib/detectar.mjs` | Qué tiene cada equipo |
| `scripts/lib/config.mjs` | Configuración efectiva (`ATLAS_*` > `atlas.config.json` > detección) |
| `scripts/generar-datos.mjs` y `scripts/lib/` | Lectura de vaults, skills, agentes, traducciones y secretos → `datos/` |
| `scripts/verificar.mjs` | Prueba de humo en un HOME temporal |
| `scripts/traducir.mjs` | Traducción de lo pendiente |
| `vite.config.ts` | Servidor: datos, adjuntos de los vaults, regeneración y vigilancia en vivo |
| `src/` | Página React: Kit (portada), Universo, Hoy, Vaults, Skills y Sistema, más el centro de mando ⌘K |
| `docs/` | Arquitectura, formato de datos, configuración y flujo de Git |
