// Kit Boost IA: el catálogo (kit/catalogo.json) y su instalación en las IA del equipo.
//
// Qué se instala y dónde (solo en las IA que existen en la computadora):
//
// | IA          | Skills                              | Agentes                                                     | Instrucciones globales |
// |-------------|-------------------------------------|-------------------------------------------------------------|------------------------|
// | Claude Code | ~/.claude/skills/<slug>             | ~/.claude/agents/<slug>.md                                   | ~/.claude/CLAUDE.md    |
// | Codex       | $CODEX_HOME/skills/<slug>           | $CODEX_HOME/agents/<slug>.toml                               | $CODEX_HOME/AGENTS.md  |
// | Antigravity | ~/.gemini/config/skills/<slug>      | ~/.gemini/config/plugins/user-agents/agents/<slug>.md        | ~/.gemini/GEMINI.md    |
//
// - Las skills propias viven en kit/skills/ y se enlazan (o se copian si el sistema no deja enlazar).
// - Las skills de terceros NO se copian a este repositorio: se descargan de su repositorio original
//   a ~/.boost-ia/terceros/<kit> y se enlazan desde ahí, con el crédito a su autor en el catálogo.
// - Los agentes se escriben en el formato de cada IA a partir de kit/agentes/<slug>.md.
// - Nunca se pisa nada ajeno: si ya existe algo con ese nombre que no puso el kit, se reporta como conflicto.
// - Obsidian: no se crea nada en los vaults. Solo se agrega (entre marcas) un bloque a las instrucciones
//   globales de cada IA con las rutas de los vaults que la persona ya tiene, para que los agentes los lean.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const MARCA = 'boost-ia-kit';
const MARCA_CARPETA = '.instalado-por-boost-ia';
const INICIO_BLOQUE = '<!-- boost-ia:inicio -->';
const FIN_BLOQUE = '<!-- boost-ia:fin -->';

// ---------------------------------------------------------------- catálogo

export function cargarCatalogo(raiz = RAIZ) {
  return JSON.parse(fs.readFileSync(path.join(raiz, 'kit', 'catalogo.json'), 'utf8'));
}

/** Índice plano: id → pieza. Las piezas son agentes, skills propias y skills de terceros. */
export function indice(cat) {
  const idx = new Map();
  for (const a of cat.agentes) idx.set(a.slug, { ...a, tipo: 'agente' });
  for (const s of cat.skills) idx.set(s.slug, { ...s, tipo: 'skill' });
  return idx;
}

/** Frontmatter simple de un agente (sin dependencias). */
export function leerAgente(texto) {
  const m = texto.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) throw new Error('el agente debe empezar con frontmatter entre líneas ---');
  const meta = {};
  let clave = null;
  for (const linea of m[1].split('\n')) {
    const par = linea.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (par) {
      clave = par[1];
      let valor = par[2].trim();
      if (valor.length >= 2 && valor[0] === valor.at(-1) && `"'`.includes(valor[0])) valor = valor.slice(1, -1);
      meta[clave] = valor === '' ? [] : valor;
    } else if (/^\s+- /.test(linea) && clave) {
      (meta[clave] = Array.isArray(meta[clave]) ? meta[clave] : []).push(linea.replace(/^\s+- /, '').trim());
    }
  }
  return { meta, cuerpo: m[2].trim() };
}

const HERRAMIENTAS_ANTIGRAVITY = {
  Read: 'view_file', Write: 'write_to_file', Edit: 'replace_file_content', Grep: 'grep_search', Glob: 'find_by_name',
  Bash: 'run_command', WebFetch: 'read_url_content', WebSearch: 'search_web',
};

/** Las versiones del agente para cada IA. */
export function construirAgente(texto) {
  const { meta, cuerpo } = leerAgente(texto);
  const herramientas = String(meta.tools || 'Read, Grep, Glob').split(',').map((x) => x.trim()).filter(Boolean);
  const skills = Array.isArray(meta.skills) ? meta.skills : [];
  const pie = `\n\n<!-- ${MARCA} -->\n`;
  const claude = ['---', `name: ${meta.name}`, `description: "${meta.description}"`, `tools: ${herramientas.join(', ')}`];
  if (skills.length) claude.push('skills:', ...skills.map((s) => `  - ${s}`));
  claude.push('model: inherit', '---', '', cuerpo + pie);

  const agy = ['---', `name: ${meta.name}`, `description: "${meta.description}"`, 'tools:'];
  agy.push(...[...new Set(herramientas.map((h) => HERRAMIENTAS_ANTIGRAVITY[h]).filter(Boolean))].map((h) => `  - ${h}`));
  if (skills.length) agy.push('skills:', ...skills.map((s) => `  - ${s}`));
  agy.push('mainAgent: true', 'subagent: true', 'commandExecutionPolicy: auto', '---', '', cuerpo + pie);

  const escribe = herramientas.includes('Write') || herramientas.includes('Edit');
  const nota = skills.length ? `\n\n### Skills que usa\nConsulta estas skills cuando apliquen:\n${skills.map((s) => `- \`${s}\``).join('\n')}` : '';
  const codex =
    `# ${MARCA}\nname = "${meta.name}"\ndescription = "${meta.description}"\nsandbox_mode = "${escribe ? 'workspace-write' : 'read-only'}"\n` +
    `model_reasoning_effort = "medium"\n\ndeveloper_instructions = '''\n${cuerpo}${nota}\n'''\n`;
  return { claude: claude.join('\n'), codex, antigravity: agy.join('\n'), meta };
}

// ---------------------------------------------------------------- destinos

/** Las IA presentes en este equipo. */
export function ias(home = os.homedir(), env = process.env) {
  const codex = env.CODEX_HOME ? path.resolve(env.CODEX_HOME) : path.join(home, '.codex');
  const salida = [];
  if (fs.existsSync(path.join(home, '.claude')))
    salida.push({ id: 'claude', nombre: 'Claude Code', skills: path.join(home, '.claude', 'skills'), agentes: path.join(home, '.claude', 'agents'), ext: '.md', instrucciones: path.join(home, '.claude', 'CLAUDE.md') });
  if (fs.existsSync(codex))
    salida.push({ id: 'codex', nombre: 'Codex', skills: path.join(codex, 'skills'), agentes: path.join(codex, 'agents'), ext: '.toml', instrucciones: path.join(codex, 'AGENTS.md') });
  if (fs.existsSync(path.join(home, '.gemini')))
    salida.push({ id: 'antigravity', nombre: 'Antigravity', skills: path.join(home, '.gemini', 'config', 'skills'), agentes: path.join(home, '.gemini', 'config', 'plugins', 'user-agents', 'agents'), ext: '.md', instrucciones: path.join(home, '.gemini', 'GEMINI.md') });
  return salida;
}

export const carpetaTerceros = (home = os.homedir()) => path.join(home, '.boost-ia', 'terceros');

function existe(ruta) {
  try {
    fs.lstatSync(ruta);
    return true;
  } catch {
    return false;
  }
}

/** Lo puso el kit: un enlace a este repo o a la caché de terceros, o una copia con su marca. */
function esNuestro(destino, carpeta, raiz, home) {
  const st = fs.lstatSync(destino);
  if (st.isSymbolicLink()) {
    const real = path.resolve(path.dirname(destino), fs.readlinkSync(destino));
    return real.startsWith(path.resolve(raiz) + path.sep) || real.startsWith(carpetaTerceros(home) + path.sep) || real.includes(`${path.sep}.boost-ia${path.sep}`);
  }
  if (carpeta) return fs.existsSync(path.join(destino, MARCA_CARPETA));
  try {
    return fs.readFileSync(destino, 'utf8').includes(MARCA);
  } catch {
    return false;
  }
}

function borrar(ruta) {
  fs.rmSync(ruta, { recursive: true, force: true });
}

function ponerCarpeta(origen, destino, copiar) {
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  if (!copiar) {
    try {
      fs.symlinkSync(origen, destino, process.platform === 'win32' ? 'junction' : 'dir');
      return 'enlazado';
    } catch {
      /* sin permiso para enlaces: se copia */
    }
  }
  fs.cpSync(origen, destino, { recursive: true, filter: (f) => !/[\\/](\.git|node_modules|\.DS_Store)$/.test(f) });
  fs.writeFileSync(path.join(destino, MARCA_CARPETA), 'Copia instalada por el kit Boost IA; se reemplaza al reinstalar.\n');
  return 'copiado';
}

// ---------------------------------------------------------------- terceros

/**
 * Descarga el repositorio original de un kit de terceros, pero solo las carpetas de las skills
 * pedidas (clon parcial + sparse-checkout): repos como shadcn o HyperFrames tienen miles de archivos.
 * Si ya estaba descargado, suma las carpetas nuevas y lo actualiza.
 */
export function descargarTercero(kit, home = os.homedir(), rutas = []) {
  const carpeta = path.join(carpetaTerceros(home), kit.id);
  const url = `https://github.com/${kit.repo}.git`;
  const git = (...a) => execFileSync('git', a, { stdio: 'pipe', timeout: 600_000 }).toString();
  try {
    if (!fs.existsSync(path.join(carpeta, '.git'))) {
      fs.mkdirSync(path.dirname(carpeta), { recursive: true });
      borrar(carpeta);
      git('clone', '--depth', '1', '--filter=blob:none', '--sparse', '--quiet', ...(kit.rama ? ['--branch', kit.rama] : []), url, carpeta);
    } else {
      git('-C', carpeta, 'pull', '--ff-only', '--quiet');
    }
    let antes = [];
    try {
      antes = git('-C', carpeta, 'sparse-checkout', 'list').split('\n').filter(Boolean);
    } catch {
      /* sin sparse todavía */
    }
    const todas = [...new Set([...antes, ...rutas])];
    if (todas.length) git('-C', carpeta, 'sparse-checkout', 'set', '--no-cone', ...todas.map((r) => `/${r.replace(/^\/+|\/+$/g, '')}/`));
    return { carpeta };
  } catch (e) {
    const detalle = String(e.stderr || e.message || '').trim().split('\n')[0];
    return { error: /ENOENT/.test(String(e.message)) ? 'falta git: instálalo y vuelve a intentar' : `no se pudo descargar ${url}: ${detalle.slice(0, 200)}` };
  }
}

// ---------------------------------------------------------------- plan

/**
 * Qué instalar a partir de lo pedido: ids de piezas, áreas o kits de terceros.
 * Los agentes arrastran las skills que declaran (si están en el catálogo).
 */
export function plan(cat, { piezas = [], areas = [], todo = false } = {}) {
  const idx = indice(cat);
  const errores = [];
  const elegidas = new Set();
  if (todo) for (const id of idx.keys()) elegidas.add(id);
  for (const a of areas) {
    if (!cat.areas.some((x) => x.id === a)) errores.push(`no existe el área «${a}»`);
    for (const [id, p] of idx) if (p.area === a) elegidas.add(id);
  }
  for (const id of piezas) {
    if (idx.has(id)) elegidas.add(id);
    else if (cat.kits.some((k) => k.id === id)) for (const s of cat.skills.filter((s) => s.kit === id)) elegidas.add(s.slug);
    else errores.push(`no existe «${id}» en el catálogo`);
  }
  for (const id of [...elegidas]) {
    const p = idx.get(id);
    if (p.tipo === 'agente') for (const s of p.skills || []) if (idx.get(s)?.tipo === 'skill') elegidas.add(s);
  }
  const lista = [...elegidas].map((id) => idx.get(id));
  return { agentes: lista.filter((p) => p.tipo === 'agente'), skills: lista.filter((p) => p.tipo === 'skill'), errores };
}

// ---------------------------------------------------------------- instalar, quitar, estado

export function instalar(cat, elegido, { raiz = RAIZ, home = os.homedir(), env = process.env, copiar = false, descargar = descargarTercero, avisar = () => {} } = {}) {
  const acciones = [];
  const conflictos = [];
  const errores = [...(elegido.errores || [])];
  const destinos = ias(home, env);
  if (!destinos.length) return { acciones, conflictos, errores, sinIas: true };

  // Origen de cada skill: propia (kit/skills) o descargada de su repositorio.
  const origenes = [];
  const kitsUsados = [...new Set(elegido.skills.filter((s) => s.kit !== 'propia').map((s) => s.kit))];
  const carpetas = {};
  for (const id of kitsUsados) {
    const kit = cat.kits.find((k) => k.id === id);
    avisar(`Descargando ${kit.nombre} (${kit.repo})…`);
    const r = descargar(kit, home, elegido.skills.filter((s) => s.kit === id).map((s) => s.ruta));
    if (r.error) errores.push(`${kit.nombre}: ${r.error}`);
    else carpetas[id] = r.carpeta;
  }
  for (const s of elegido.skills) {
    const origen = s.kit === 'propia' ? path.join(raiz, 'kit', 'skills', s.slug) : carpetas[s.kit] && path.join(carpetas[s.kit], s.ruta);
    if (!origen) continue;
    if (!fs.existsSync(path.join(origen, 'SKILL.md'))) {
      errores.push(`${s.slug}: no encontré SKILL.md en ${s.kit === 'propia' ? `kit/skills/${s.slug}` : `${s.kit}/${s.ruta}`}`);
      continue;
    }
    origenes.push({ slug: s.slug, origen });
  }

  for (const ia of destinos) {
    for (const { slug, origen } of origenes) {
      const destino = path.join(ia.skills, slug);
      if (existe(destino)) {
        if (fs.lstatSync(destino).isSymbolicLink() && path.resolve(path.dirname(destino), fs.readlinkSync(destino)) === origen && !copiar) {
          acciones.push({ ia: ia.id, ruta: destino, que: 'ya estaba' });
          continue;
        }
        if (!esNuestro(destino, true, raiz, home)) {
          conflictos.push({ ia: ia.id, ruta: destino });
          continue;
        }
        borrar(destino);
        acciones.push({ ia: ia.id, ruta: destino, que: `actualizado (${ponerCarpeta(origen, destino, copiar)})` });
      } else acciones.push({ ia: ia.id, ruta: destino, que: ponerCarpeta(origen, destino, copiar) });
    }
    for (const a of elegido.agentes) {
      const fuente = path.join(raiz, 'kit', 'agentes', `${a.slug}.md`);
      if (!fs.existsSync(fuente)) {
        errores.push(`falta kit/agentes/${a.slug}.md`);
        continue;
      }
      const versiones = construirAgente(fs.readFileSync(fuente, 'utf8'));
      const destino = path.join(ia.agentes, `${a.slug}${ia.ext}`);
      if (existe(destino) && !esNuestro(destino, false, raiz, home)) {
        conflictos.push({ ia: ia.id, ruta: destino });
        continue;
      }
      const antes = existe(destino);
      fs.mkdirSync(ia.agentes, { recursive: true });
      fs.writeFileSync(destino, versiones[ia.id]);
      acciones.push({ ia: ia.id, ruta: destino, que: antes ? 'actualizado' : 'creado' });
    }
    if (ia.id === 'antigravity' && elegido.agentes.length) {
      const plugin = path.join(path.dirname(ia.agentes), 'plugin.json');
      if (!fs.existsSync(plugin)) {
        fs.writeFileSync(plugin, JSON.stringify({ name: 'user-agents', displayName: 'User Agents', version: '1.0.0', description: 'Agentes del usuario para Antigravity.' }, null, 2) + '\n');
        acciones.push({ ia: ia.id, ruta: plugin, que: 'creado' });
      }
    }
  }
  return { acciones, conflictos, errores };
}

/** Quita lo que instaló el kit (todo, o solo las piezas indicadas). Nunca toca lo ajeno. */
export function quitar(cat, { piezas = null, raiz = RAIZ, home = os.homedir(), env = process.env } = {}) {
  const acciones = [];
  const quiero = (id) => !piezas || piezas.includes(id);
  for (const ia of ias(home, env)) {
    for (const s of cat.skills) {
      const destino = path.join(ia.skills, s.slug);
      if (quiero(s.slug) && existe(destino) && esNuestro(destino, true, raiz, home)) {
        borrar(destino);
        acciones.push({ ia: ia.id, ruta: destino, que: 'quitado' });
      }
    }
    for (const a of cat.agentes) {
      const destino = path.join(ia.agentes, `${a.slug}${ia.ext}`);
      if (quiero(a.slug) && existe(destino) && esNuestro(destino, false, raiz, home)) {
        borrar(destino);
        acciones.push({ ia: ia.id, ruta: destino, que: 'quitado' });
      }
    }
  }
  return { acciones };
}

/**
 * Estado de cada pieza en cada IA: «kit» (lo puso el kit), «propio» (la persona ya tenía algo con ese
 * nombre) o ausente. También dice qué IA hay y si el bloque de Obsidian está puesto.
 */
export function estado(cat, { raiz = RAIZ, home = os.homedir(), env = process.env } = {}) {
  const destinos = ias(home, env);
  const piezas = {};
  for (const ia of destinos) {
    for (const s of cat.skills) {
      const d = path.join(ia.skills, s.slug);
      if (existe(d)) (piezas[s.slug] ??= {})[ia.id] = esNuestro(d, true, raiz, home) ? 'kit' : 'propio';
    }
    for (const a of cat.agentes) {
      const d = path.join(ia.agentes, `${a.slug}${ia.ext}`);
      if (existe(d)) (piezas[a.slug] ??= {})[ia.id] = esNuestro(d, false, raiz, home) ? 'kit' : 'propio';
    }
  }
  const obsidian = Object.fromEntries(destinos.map((ia) => [ia.id, leerBloque(ia.instrucciones) !== null]));
  return { ias: destinos.map(({ id, nombre }) => ({ id, nombre })), piezas, obsidian };
}

// ---------------------------------------------------------------- Obsidian

/** Texto del bloque de instrucciones globales con las rutas de los vaults de la persona. */
export function textoBloque(vaults) {
  const lista = vaults.length
    ? vaults.map((v) => `- **${v.nombre}**: \`${v.ruta}\``).join('\n')
    : '- (todavía no se detectó ningún vault; abre Boost IA Atlas después de crear uno en Obsidian)';
  return `${INICIO_BLOQUE}
## Boost IA · memoria en Obsidian

Mi memoria vive en estos vaults de Obsidian (los detectó Boost IA Atlas en esta computadora):

${lista}

- Antes de una tarea, busca en esos vaults lo que ya escribí del proyecto o del tema y respétalo.
- No crees vaults, carpetas ni plantillas nuevas: usa la organización que ya tengo.
- Pregúntame antes de escribir en un vault, y nunca guardes contraseñas, claves ni tokens ahí.
${FIN_BLOQUE}`;
}

export function leerBloque(archivo) {
  try {
    const t = fs.readFileSync(archivo, 'utf8');
    const i = t.indexOf(INICIO_BLOQUE);
    const f = t.indexOf(FIN_BLOQUE);
    return i >= 0 && f > i ? t.slice(i, f + FIN_BLOQUE.length) : null;
  } catch {
    return null;
  }
}

/** Pone (o actualiza) el bloque en las instrucciones globales de cada IA. Con `quitar`, lo saca. */
export function bloqueObsidian(vaults, { home = os.homedir(), env = process.env, quitar: sacar = false } = {}) {
  const acciones = [];
  for (const ia of ias(home, env)) {
    let t = '';
    try {
      t = fs.readFileSync(ia.instrucciones, 'utf8');
    } catch {
      /* todavía no existe */
    }
    const actual = leerBloque(ia.instrucciones);
    let nuevo;
    if (sacar) {
      if (!actual) continue;
      nuevo = t.replace(actual, '').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
    } else {
      const bloque = textoBloque(vaults);
      if (actual === bloque) {
        acciones.push({ ia: ia.id, ruta: ia.instrucciones, que: 'ya estaba' });
        continue;
      }
      nuevo = actual ? t.replace(actual, bloque) : `${t.trimEnd()}${t.trim() ? '\n\n' : ''}${bloque}\n`;
    }
    fs.mkdirSync(path.dirname(ia.instrucciones), { recursive: true });
    fs.writeFileSync(ia.instrucciones, nuevo);
    acciones.push({ ia: ia.id, ruta: ia.instrucciones, que: sacar ? 'quitado' : actual ? 'actualizado' : 'agregado' });
  }
  return { acciones };
}
