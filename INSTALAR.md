# Instalar el Boost IA Atlas

Esta guía sirve para dos lectores: **la IA** que hace la instalación (Claude Code, Codex o Antigravity) y **la persona** que quiera entender qué pasa o hacerlo a mano.

## Antes de empezar: tu invitación

**Repositorio privado, solo por invitación.** Campuslands te envía una invitación de GitHub a tu cuenta. Acéptala (llega a tu correo o en <https://github.com/notifications>) y deja tu sesión de GitHub iniciada en la computadora (`gh auth login`). Sin la invitación aceptada, GitHub responde «no encontrado». No compartas el enlace ni copias del repositorio fuera del grupo invitado.

## La forma más fácil: doble clic

Descarga el último `boost-ia-atlas-vX.Y.Z.zip` de [Releases](https://github.com/anndreloopez012/boost-ia-app-atlas-software/releases/latest), descomprímelo y haz doble clic en `Instalar en Mac.command`, `Instalar en Windows.cmd` o `Instalar en Linux.sh`. El instalador:

1. Copia la app a una carpeta fija: macOS `~/Library/Application Support/Boost IA Atlas`, Windows `%LOCALAPPDATA%\Boost IA Atlas`, Linux `~/.local/share/boost-ia-atlas` (la descarga se puede borrar).
2. Instala Node.js si falta (Homebrew, fnm o nvm sin sudo; winget en Windows) y las dependencias.
3. Detecta vaults, skills y agentes, verifica y genera los datos.
4. Crea el acceso **«Boost IA Atlas»** con su ícono y lo abre.

Avisos del sistema la primera vez: en macOS, **Ajustes del Sistema › Privacidad y seguridad › Abrir igualmente**; en Windows, **Más información › Ejecutar de todas formas**; en Linux, clic derecho › **Ejecutar como programa**. La primera apertura también puede pedir permiso para leer tus carpetas (Documentos, donde suelen estar los vaults): acéptalo.

Después se abre siempre con doble clic. Cada apertura busca cambios en vaults, skills y agentes; la app se apaga sola al dejar de usarla. Si se borra el acceso: `npm run lanzador` lo vuelve a crear.

## La forma corta: que lo haga tu IA

Abre Claude Code, Codex o Antigravity y escribe:

```text
Instala este repositorio: https://github.com/anndreloopez012/boost-ia-app-atlas-software
```

La IA clona el repositorio, instala lo que falte (Node.js, dependencias), detecta tus vaults, skills y agentes, verifica que todo funcione, te pregunta si quieres todo el kit o algunas áreas, lo instala en tus IA, conecta tu memoria de Obsidian y te deja Boost IA abierto en el navegador.

Si la IA dice que no encuentra el repositorio, falta aceptar la invitación o iniciar sesión: `gh auth login` y vuelve a pedírselo.

Las instrucciones exactas que sigue la IA están en [AGENTS.md](AGENTS.md) (Codex y Antigravity lo leen solos; Claude Code lo importa desde [CLAUDE.md](CLAUDE.md); Gemini CLI, desde [GEMINI.md](GEMINI.md)). También existe la skill `/instalar-atlas` en `.agents/skills/` y `.claude/skills/`.


## Qué necesita el equipo

| Requisito | ¿Lo instala el instalador? | Notas |
|---|---|---|
| Node.js 20 o superior | Sí | macOS: Homebrew si ya existe; si no, fnm (o nvm). Linux: fnm (o nvm). Windows: winget. Sin contraseña de administrador salvo en Windows, donde winget puede pedir permiso. |
| Dependencias de npm | Sí | `npm install` dentro del proyecto. |
| Git | No (la IA lo instala si hace falta para clonar) | Solo se usa para clonar y para mostrar el repositorio de cada skill. Sin git el atlas funciona igual. |
| Obsidian | No hace falta | El atlas lee las carpetas de los vaults directamente. |
| Conexión a internet | Solo durante la instalación | Después todo funciona sin conexión (las fuentes tipográficas van incluidas). |

## Paso a paso (lo mismo que hace la IA)

### 1. Conseguir el repositorio

```bash
git clone https://github.com/anndreloopez012/boost-ia-app-atlas-software ~/boost-ia-app-atlas-software
```

Cualquier carpeta sirve. Si tienes una carpeta de proyectos (`~/Documents/PROYECTOS`, `~/Projects`…), la IA la usa.

### 2. Ejecutar el instalador

macOS o Linux:

```bash
bash instalar.sh
```

Windows (PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -File instalar.ps1
```

El instalador:

1. Deja listo **Node.js 20+** si falta.
2. Instala las dependencias (`npm install`).
3. **Detecta** lo que tiene el equipo y escribe `atlas.config.json` (ver [docs/CONFIGURACION.md](docs/CONFIGURACION.md)):
   - vaults de Obsidian, y cuál es el central;
   - carpetas de skills de cada IA y plugins activos;
   - carpetas de agentes;
   - automatizaciones sobre los vaults;
   - un sistema de memoria `.memoria-system`, si lo hay.
4. Corre **`npm run verificar`**: una prueba de humo en un equipo falso que no toca tus datos.
5. **Genera los datos** del atlas en `datos/` (no se suben a git).
6. Muestra un resumen de lo encontrado y cómo abrirlo.

Con `--json` el resumen final sale en JSON, para que la IA lo lea.

### 3. Ajustar si hace falta

Cada opción vuelve a detectar, guardar y generar:

| Situación | Comando |
|---|---|
| No encontró un vault | `npm run instalar -- --vault "/ruta/al/vault"` |
| No tiene ningún vault | Boost IA no crea vaults: que lo cree en Obsidian (gratis) y vuelva a correr el instalador. El kit se instala igual sin vaults. |
| Encontró uno que no quieres | `npm run instalar -- --quitar-vault "Nombre"` |
| El vault central no es el que usas como principal | `npm run instalar -- --centro "Nombre"` |
| Tienes skills en otra carpeta | `npm run instalar -- --skills "Claude=~/mis-skills"` |
| Tienes agentes en otra carpeta | `npm run instalar -- --agentes "Codex=~/mis-agentes"` |
| Marcar como tuyas las skills de tu cuenta de GitHub | `npm run instalar -- --cuenta tu-usuario` |
| Marcar como tuyas las skills que tienen un texto en el nombre | `npm run instalar -- --propia tu-marca` |
| Usar otro puerto | `npm run instalar -- --puerto 5300` |
| Instalaste IAs o skills nuevas | `npm run detectar` |
| Empezar la detección de cero (conserva centro, colores y puerto) | `npm run instalar -- --redetectar` |

### 4. Traducir al español

El atlas muestra todo texto descriptivo en español; las skills nuevas suelen traer su descripción en inglés. Si el resumen dice que hay textos pendientes:

- Desde una terminal normal: `npm run traducir`. Usa tu Claude Code en modo no interactivo (`claude -p`).
- Desde una IA (incluida una sesión de Claude Code, donde `claude -p` está bloqueado):
  1. `npm run traducir -- --lotes /tmp/atlas-lotes` parte lo pendiente en `lote-NN.json`.
  2. La IA traduce cada lote a `resultado-NN.json`, con las reglas de [AGENTS.md](AGENTS.md#traducción).
  3. `npm run traducir -- --importar /tmp/atlas-lotes` incorpora las traducciones.

Las traducciones quedan en `traducciones/es.json`: lo que ya se tradujo en un equipo sirve para todos los que compartan esas skills.

### 5. Instalar el kit

```bash
npm run kit -- --lista
```

```bash
npm run kit -- --todo
```

O solo algunas áreas: `npm run kit -- --area frontend,backend,seguridad`. Necesita git e internet (descarga solo las carpetas de cada skill, unos 45 MB el kit completo) y se instala en las IA que tengas: Claude Code, Codex o Antigravity.

Si tienes vaults de Obsidian, conéctalos con tus IA (agrega un bloque con sus rutas a tus instrucciones globales; no escribe nada en los vaults):

```bash
npm run kit -- --obsidian
```

Cierra y vuelve a abrir tu IA para que cargue lo nuevo.

### 6. Abrir Boost IA

macOS o Linux:

```bash
bash iniciar.sh
```

Windows:

```powershell
powershell -ExecutionPolicy Bypass -File iniciar.ps1
```

Entra a <http://localhost:5190>. Mientras esté abierto, cualquier cambio en tus vaults aparece solo en unos segundos. Para cerrarlo, `Ctrl + C` en esa terminal.

### 7. Actualizar

```bash
git pull
```

```bash
bash instalar.sh
```

```bash
npm run kit -- --todo
```

Se conserva tu configuración, se agrega lo nuevo que aparezca y se actualiza el kit.

## Problemas frecuentes

| Síntoma | Qué hacer |
|---|---|
| `node: command not found` después de instalar | Abre una terminal nueva, o usa `bash iniciar.sh`, que carga Node aunque se haya instalado con fnm o nvm. |
| Windows: «no encuentro winget» | Instala «App Installer» desde Microsoft Store, o Node.js 20+ desde <https://nodejs.org>, y vuelve a ejecutar. |
| Windows: «la ejecución de scripts está deshabilitada» | Usa exactamente `powershell -ExecutionPolicy Bypass -File instalar.ps1`. |
| Linux: falta `unzip` o `curl` | El instalador usa nvm si falta `unzip`. Sin `curl`, instálalo: `sudo apt-get install -y curl`. |
| Linux: los cambios en los vaults no se reflejan solos | Sube el límite de vigilancia: `echo fs.inotify.max_user_watches=524288 \| sudo tee -a /etc/sysctl.conf && sudo sysctl -p`. Mientras tanto usa el botón de actualizar. |
| No aparece un vault | Obsidian no lo tiene registrado, o está en una carpeta poco común: `npm run instalar -- --vault "<ruta>"`. |
| Vaults en iCloud, Dropbox u OneDrive | Funcionan. Si el sistema dejó archivos «solo en la nube», ábrelos una vez en Obsidian (o marca la carpeta como disponible sin conexión) para que el atlas pueda leerlos. |
| Aparece texto en inglés | Son textos nuevos: ver «Traducir al español». |
| El puerto 5190 está ocupado | Vite usa el siguiente libre y lo muestra en la terminal; o fija otro con `--puerto`. |
| `npm run verificar` falla | Lee qué comprobación falló. Si es la detección o la generación, abre un issue con esa salida. |

## Desinstalar

Doble clic en el desinstalador de tu sistema (está en la descarga y en la carpeta de la app):

| Sistema | Desinstalador | También |
|---|---|---|
| macOS | `Desinstalar en Mac.command` | — |
| Windows | `Desinstalar en Windows.cmd` | Menú Inicio › «Desinstalar Boost IA Atlas» |
| Linux | `Desinstalar en Linux.sh` | Clic derecho en el ícono › Desinstalar |

Muestra qué va a quitar y pide confirmar; apaga el atlas si está abierto, quita el kit de tus IA (solo lo que puso el kit; con `--conservar-kit` lo deja), los accesos de doble clic y la app instalada. **Nunca toca tus vaults ni tus notas.** Por terminal: `npm run desinstalar` (`-- --si` para no preguntar). En una copia con git (la de quien desarrolla) solo quita los accesos, los datos generados y la caché: el código queda.

Lo único que el instalador pudo agregar fuera de la app es Node.js (con Homebrew, fnm, nvm o winget), y puede quedarse para otros usos. Si lo quieres quitar, usa el mismo gestor con el que se instaló.
