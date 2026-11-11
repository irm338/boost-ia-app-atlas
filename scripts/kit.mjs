#!/usr/bin/env node
// Instalador del kit Boost IA desde la terminal (la app usa las mismas funciones).
//
//   npm run kit -- --lista                     catálogo por área, con lo que ya está instalado
//   npm run kit -- --estado                    qué hay en cada IA y si el bloque de Obsidian está puesto
//   npm run kit -- --todo                      instala todo el kit
//   npm run kit -- --area frontend,seguridad   instala esas áreas completas
//   npm run kit -- code-reviewer superpowers   instala piezas sueltas o kits de terceros por su id
//   npm run kit -- --obsidian                  conecta las IA con los vaults que ya tienes (no crea nada en ellos)
//   npm run kit -- --quitar [ids…]             quita lo que puso el kit (todo o lo indicado)
//
// Opciones: --copiar (copia en vez de enlazar), --json (salida para máquinas).
// Sale con 0 si todo quedó bien y con 1 si hubo errores o conflictos.
import { CONFIG, abreviar } from './lib/config.mjs';
import { bloqueObsidian, cargarCatalogo, estado, indice, instalar, plan, quitar } from './lib/kit.mjs';

const args = process.argv.slice(2);
const bandera = (b) => args.includes(b);
const valor = (b) => {
  const i = args.indexOf(b);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null;
};
const json = bandera('--json');
// Ids sueltos: todo lo que no es bandera ni el valor de --area.
const ids = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--area');
const cat = cargarCatalogo();
const salir = (datos, ok = true) => {
  if (json) process.stdout.write(JSON.stringify(datos, null, 2) + '\n');
  process.exit(ok ? 0 : 1);
};
const log = (...t) => !json && console.log(...t);

function informe(r) {
  for (const a of r.acciones || []) log(`  ${a.que.padEnd(22)} ${a.ia.padEnd(12)} ${abreviar(a.ruta)}`);
  for (const c of r.conflictos || []) log(`  conflicto              ${c.ia.padEnd(12)} ${abreviar(c.ruta)} (ya existe y no es del kit: no lo toqué)`);
  for (const e of r.errores || []) log(`  error  ${e}`);
  if (r.sinIas) log('  No encontré Claude Code, Codex ni Antigravity en esta computadora. Instala al menos una y vuelve a correr esto.');
}

if (bandera('--lista')) {
  const est = estado(cat);
  if (json) salir({ catalogo: cat, estado: est });
  for (const area of cat.areas) {
    log(`\n${area.nombre.toUpperCase()}  (--area ${area.id})`);
    for (const p of [...indice(cat).values()].filter((p) => p.area === area.id)) {
      const puesto = Object.keys(est.piezas[p.slug] || {}).length ? '●' : '○';
      log(`  ${puesto} ${p.tipo === 'agente' ? 'agente' : 'skill '}  ${p.slug.padEnd(34)} ${p.nombre}`);
    }
  }
  log(`\nKits de terceros (se descargan de su repositorio original):`);
  for (const k of cat.kits) log(`  ${k.id.padEnd(20)} ${k.nombre} · ${k.autor} · github.com/${k.repo} (${k.licencia})`);
  salir({});
}

if (bandera('--estado')) {
  const est = estado(cat);
  if (json) salir(est);
  log(`IA en este equipo: ${est.ias.map((i) => i.nombre).join(', ') || 'ninguna'}`);
  const instaladas = Object.entries(est.piezas).filter(([, v]) => Object.values(v).includes('kit'));
  log(`Piezas del kit instaladas: ${instaladas.length} de ${cat.agentes.length + cat.skills.length}`);
  for (const [ia, puesto] of Object.entries(est.obsidian)) log(`Obsidian en ${ia}: ${puesto ? 'conectado' : 'sin conectar (npm run kit -- --obsidian)'}`);
  salir(est);
}

if (bandera('--obsidian') || bandera('--obsidian-quitar')) {
  const vaults = CONFIG.vaults.map((v) => ({ nombre: v.nombre, ruta: v.ruta }));
  log(bandera('--obsidian-quitar') ? 'Quitando el bloque de Obsidian…' : `Conectando las IA con ${vaults.length} vault(s): ${vaults.map((v) => v.nombre).join(', ') || 'ninguno'}`);
  const r = bloqueObsidian(vaults, { quitar: bandera('--obsidian-quitar') });
  informe(r);
  salir(r);
}

if (bandera('--quitar')) {
  const r = quitar(cat, { piezas: ids.length ? ids : null });
  log(`Quitando ${ids.length ? ids.join(', ') : 'todo lo del kit'}…`);
  informe(r);
  salir(r);
}

const areas = (valor('--area') || '').split(',').filter(Boolean);
const piezas = ids.filter((i) => !areas.includes(i));
if (!bandera('--todo') && !areas.length && !piezas.length) {
  log('Dime qué instalar: --todo, --area <ids> o ids de piezas. Usa --lista para ver el catálogo.');
  salir({ error: 'sin pedido' }, false);
}
const elegido = plan(cat, { todo: bandera('--todo'), areas, piezas });
log(`Instalando ${elegido.agentes.length} agentes y ${elegido.skills.length} skills…`);
const r = instalar(cat, elegido, { copiar: bandera('--copiar'), avisar: log });
informe(r);
log(r.errores.length || r.conflictos.length ? '\nTerminó con avisos (revisa arriba).' : '\nListo. Abre tu IA de nuevo para que cargue lo nuevo.');
salir(r, !r.errores.length && !r.conflictos.length);
