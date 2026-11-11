#!/usr/bin/env node
// Escribe docs/KIT.md a partir de kit/catalogo.json: la guía para alumnos con cada área,
// cada agente y cada skill (qué es, para qué sirve y cómo pedirlo), y los créditos.
//   npm run kit:docs            reescribe docs/KIT.md
//   npm run kit:docs -- --revisar   sale con 1 si docs/KIT.md quedó viejo (lo usa verificar)
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ, cargarCatalogo } from './lib/kit.mjs';

const cat = cargarCatalogo();
const destino = path.join(RAIZ, 'docs', 'KIT.md');
const celda = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const kit = (id) => cat.kits.find((k) => k.id === id);
const origen = (s) => (s.kit === 'propia' ? 'Campuslands' : `[${kit(s.kit).nombre}](https://github.com/${kit(s.kit).repo})`);

const l = [];
l.push('# El kit Boost IA, pieza por pieza', '');
l.push('> Este archivo se genera con `npm run kit:docs` a partir de `kit/catalogo.json`. No lo edites a mano.', '');
l.push(`${cat.kit.dedicatoria}`, '');
l.push('## Antes de empezar: ¿qué es cada cosa?', '');
l.push('- **IA de programación:** un programa como Claude Code, Codex o Antigravity que lee tu proyecto, escribe código y corre comandos por ti. El kit se instala dentro de ellas.');
l.push('- **Skill:** un manual. Es una carpeta con un archivo `SKILL.md` que explica *cuándo* usarla y *cómo* hacer algo paso a paso. Tu IA la lee sola cuando tu pedido encaja; tú no tienes que nombrarla.');
l.push('- **Agente:** un especialista. Es un archivo con su rol, sus reglas, sus herramientas y las skills que usa. Tu IA le delega tareas completas («revisa este código», «audita la seguridad»).');
l.push('- **Vault de Obsidian:** la carpeta donde guardas tus notas. Los agentes del kit la leen para recordar lo que ya decidiste. El kit nunca crea notas por ti.');
l.push('- **Kit de la comunidad:** skills abiertas de otras personas o empresas. No se copian a este repositorio: tu computadora las descarga de su repositorio original, con su licencia.', '');
l.push('## Cómo trabajo', '');
l.push('El orden importa más que la herramienta. Estos son los recorridos que sigo en cada tipo de trabajo:', '');
for (const f of cat.flujos) {
  l.push(`### ${f.titulo} (${f.para})`, '');
  f.pasos.forEach((p, i) => l.push(`${i + 1}. \`${p.pieza}\`: ${p.que}`));
  l.push('');
}
l.push('## Las áreas', '');
l.push('| Área | Lema | Agentes | Skills |', '|---|---|---|---|');
for (const a of cat.areas) l.push(`| [${a.nombre}](#${a.id}) | ${a.lema} | ${cat.agentes.filter((x) => x.area === a.id).length} | ${cat.skills.filter((x) => x.area === a.id).length} |`);
l.push('');
for (const a of cat.areas) {
  l.push(`<a id="${a.id}"></a>`, '', `## ${a.nombre}`, '', `**${a.lema}.** ${a.descripcion}`, '');
  l.push(`Instalar el área completa: \`npm run kit -- --area ${a.id}\``, '');
  const agentes = cat.agentes.filter((x) => x.area === a.id);
  if (agentes.length) {
    l.push('### Agentes', '', '| Agente | Qué hace | Pídelo así |', '|---|---|---|');
    for (const x of agentes) l.push(`| **${celda(x.nombre)}**<br>\`${x.slug}\` | ${celda(x.descripcion)} | ${x.pidelo ? `«${celda(x.pidelo)}»` : ''} |`);
    l.push('');
  }
  const skills = cat.skills.filter((x) => x.area === a.id);
  if (skills.length) {
    l.push('### Skills', '', '| Skill | Qué hace | Viene de |', '|---|---|---|');
    for (const x of skills) l.push(`| **${celda(x.nombre)}**<br>\`${x.slug}\` | ${celda(x.descripcion)}${x.pidelo ? ` Pídelo así: «${celda(x.pidelo)}»` : ''} | ${origen(x)} |`);
    l.push('');
  }
}
l.push('## Gracias a la comunidad', '');
l.push('| Kit | Autor | Licencia | Skills | Qué aporta |', '|---|---|---|---|---|');
for (const k of cat.kits) l.push(`| [${k.nombre}](https://github.com/${k.repo}) | ${k.autor} | ${k.licencia} | ${cat.skills.filter((s) => s.kit === k.id).length} | ${celda(k.que)}${k.requiere ? ` **Requiere:** ${celda(k.requiere)}` : ''} |`);
l.push('');
const texto = l.join('\n');

if (process.argv.includes('--revisar')) {
  const actual = fs.existsSync(destino) ? fs.readFileSync(destino, 'utf8') : '';
  if (actual !== texto) {
    console.error('docs/KIT.md no coincide con kit/catalogo.json: corre npm run kit:docs');
    process.exit(1);
  }
  process.exit(0);
}
fs.writeFileSync(destino, texto);
console.log(`docs/KIT.md listo: ${cat.agentes.length} agentes, ${cat.skills.length} skills, ${cat.kits.length} kits.`);
