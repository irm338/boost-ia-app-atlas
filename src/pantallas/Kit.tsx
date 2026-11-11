// Portada del kit Boost IA: el regalo de Campuslands. Muestra qué trae el kit, cómo se
// trabaja con él (flujos), el catálogo completo para instalar por piezas o áreas, los kits de
// la comunidad con su crédito y la conexión con los vaults de Obsidian que la persona ya tiene.
import { ArrowRight, Bot, Brain, Check, ChevronRight, Copy, ExternalLink, LoaderCircle, Package, Plug, Rocket, Search, Sparkles, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import orbit from '../assets/marca/orbit.webp';
import { LogoCampuslands, Marca } from '../componentes/BarraSuperior';
import { ajena, instalada, piezas as todasLasPiezas, useKit, type Accion, type Catalogo, type EstadoKit, type Pieza } from '../lib/kit';
import type { Atlas } from '../lib/tipos';

type Filtro = 'todo' | 'agente' | 'skill';

export default function Kit({ atlas }: { atlas: Atlas }) {
  const { datos, error, ejecutar } = useKit();
  const [area, setArea] = useState<string | null>(null);
  const [tipo, setTipo] = useState<Filtro>('todo');
  const [busca, setBusca] = useState('');
  const [ficha, setFicha] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [panel, setPanel] = useState(false);

  const cat = datos?.catalogo;
  const est = datos?.estado;
  const lista = useMemo(() => (cat ? todasLasPiezas(cat) : []), [cat]);
  const porSlug = useMemo(() => new Map(lista.map((p) => [p.slug, p])), [lista]);

  const visibles = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return lista.filter(
      (p) =>
        (!area || p.area === area) &&
        (tipo === 'todo' || p.tipo === tipo) &&
        (!q || `${p.slug} ${p.nombre} ${p.descripcion}`.toLowerCase().includes(q)),
    );
  }, [lista, area, tipo, busca]);

  const trabajo = datos?.trabajo;
  useEffect(() => {
    if (trabajo?.corriendo) setPanel(true);
  }, [trabajo?.corriendo]);

  const lanzar = async (accion: Accion) => {
    setAviso(null);
    const e = await ejecutar(accion);
    if (e) setAviso(e);
    else setPanel(true);
  };

  if (error && !datos)
    return (
      <div className="pantalla-estado">
        <Marca />
        <h1 className="display">No pude leer el kit</h1>
        <p>{error}</p>
      </div>
    );
  if (!cat || !est)
    return (
      <div className="pantalla-estado cargando">
        <Marca />
        <p className="rotulo">Preparando tu kit…</p>
      </div>
    );

  const total = lista.length;
  const puestas = lista.filter((p) => instalada(est, p.slug)).length;
  const ocupado = Boolean(trabajo?.corriendo);
  const pieza = ficha ? porSlug.get(ficha) ?? null : null;

  return (
    <div className="kit">
      <Portada cat={cat} est={est} puestas={puestas} total={total} ocupado={ocupado} instalarTodo={() => lanzar({ accion: 'instalar', todo: true })} />

      <Conexion atlas={atlas} cat={cat} est={est} puestas={puestas} total={total} ocupado={ocupado} lanzar={lanzar} />

      {aviso && (
        <p className="kit-aviso" role="alert">
          {aviso}
        </p>
      )}

      <Flujos cat={cat} porSlug={porSlug} abrir={setFicha} />

      <section className="kit-seccion" id="catalogo" aria-labelledby="titulo-catalogo">
        <header className="kit-seccion-cabeza">
          <p className="rotulo">03 · El catálogo</p>
          <h2 id="titulo-catalogo" className="display">
            Todo lo que trae el kit
          </h2>
          <p>Instala todo de una vez, un área completa o pieza por pieza. Cada tarjeta dice para qué sirve y cómo pedírselo a tu IA.</p>
        </header>

        <div className="kit-filtros">
          <div className="kit-areas" role="tablist" aria-label="Áreas">
            <button role="tab" aria-selected={!area} className={!area ? 'activa' : ''} onClick={() => setArea(null)}>
              Todas <span className="mono">{total}</span>
            </button>
            {cat.areas.map((a) => (
              <button key={a.id} role="tab" aria-selected={area === a.id} className={area === a.id ? 'activa' : ''} style={{ '--area': a.color } as React.CSSProperties} onClick={() => setArea(a.id)}>
                <span className="kit-punto" />
                {a.nombre} <span className="mono">{lista.filter((p) => p.area === a.id).length}</span>
              </button>
            ))}
          </div>
          <div className="kit-filtros-fila">
            <div className="kit-tipo" role="group" aria-label="Tipo">
              {(['todo', 'agente', 'skill'] as Filtro[]).map((t) => (
                <button key={t} className={tipo === t ? 'activo' : ''} aria-pressed={tipo === t} onClick={() => setTipo(t)}>
                  {t === 'todo' ? 'Todo' : t === 'agente' ? 'Agentes' : 'Skills'}
                </button>
              ))}
            </div>
            <label className="kit-busca">
              <Search size={15} aria-hidden="true" />
              <span className="sr">Buscar en el kit</span>
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar: react, seguridad, video…" />
            </label>
          </div>
          {area && (
            <div className="kit-area-banda" style={{ '--area': cat.areas.find((a) => a.id === area)?.color } as React.CSSProperties}>
              <div>
                <strong>{cat.areas.find((a) => a.id === area)?.lema}</strong>
                <p>{cat.areas.find((a) => a.id === area)?.descripcion}</p>
              </div>
              <button className="boton-secundario" disabled={ocupado} onClick={() => lanzar({ accion: 'instalar', areas: [area] })}>
                <Package size={14} /> Instalar el área completa
              </button>
            </div>
          )}
        </div>

        <ul className="kit-rejilla">
          {visibles.map((p, i) => (
            <Tarjeta key={p.slug} p={p} cat={cat} est={est} indice={i} abrir={() => setFicha(p.slug)} />
          ))}
        </ul>
        {!visibles.length && <p className="kit-vacio">Nada coincide con «{busca}». Prueba con otra palabra.</p>}
      </section>

      <Comunidad cat={cat} />

      <footer className="kit-pie">
        <LogoCampuslands className="kit-pie-logo" />
        <p>
          {cat.kit.titulo} · Hecho con cariño en Guatemala para quienes egresan de Campuslands. Las skills de la comunidad son de sus autores y se descargan de sus repositorios originales.
        </p>
      </footer>

      {pieza && <Ficha p={pieza} cat={cat} est={est} ocupado={ocupado} cerrar={() => setFicha(null)} abrir={setFicha} lanzar={lanzar} />}
      {trabajo && panel && <Progreso trabajo={trabajo} cerrar={() => setPanel(false)} />}
    </div>
  );
}

// ---------------------------------------------------------------- portada

function Portada({ cat, est, puestas, total, ocupado, instalarTodo }: { cat: Catalogo; est: EstadoKit; puestas: number; total: number; ocupado: boolean; instalarTodo: () => void }) {
  const kitsUsados = new Set(cat.skills.filter((s) => s.kit !== 'propia').map((s) => s.kit)).size;
  return (
    <section className="kit-portada">
      <div className="kit-portada-texto">
        <p className="kit-sello">
          <Sparkles size={14} /> Regalo de Campuslands para su generación de egresados
        </p>
        <h1 className="display">
          Así trabajamos con IA.
          <br />
          <span className="marca-degradado">Ahora es tuyo.</span>
        </h1>
        <p className="kit-dedicatoria">{cat.kit.dedicatoria} Frontend, backend, seguridad, video e imagen: los mismos agentes y skills que usamos todos los días, conectados con tu memoria en Obsidian.</p>

        <dl className="kit-cifras">
          <div>
            <dt>agentes</dt>
            <dd>{cat.agentes.length}</dd>
          </div>
          <div>
            <dt>skills</dt>
            <dd>{cat.skills.length}</dd>
          </div>
          <div>
            <dt>kits de la comunidad</dt>
            <dd>{kitsUsados}</dd>
          </div>
          <div>
            <dt>instalado</dt>
            <dd>
              {puestas}
              <small>/{total}</small>
            </dd>
          </div>
        </dl>

        <div className="kit-acciones">
          <button className="boton-primario" onClick={instalarTodo} disabled={ocupado || !est.ias.length}>
            {ocupado ? <LoaderCircle size={16} className="girando" /> : <Rocket size={16} />}
            {ocupado ? 'Instalando…' : puestas === total ? 'Actualizar el kit' : 'Instalar todo el kit'}
          </button>
          <a className="kit-enlace" href="#catalogo">
            Elegir pieza por pieza <ArrowRight size={15} />
          </a>
        </div>
        {!est.ias.length && <p className="kit-nota">Primero instala Claude Code, Codex o Antigravity: el kit se instala dentro de ellas.</p>}
      </div>

      <div className="kit-portada-arte" aria-hidden="true">
        <svg className="kit-orbitas" viewBox="0 0 400 400">
          <ellipse cx="200" cy="210" rx="190" ry="76" transform="rotate(-16 200 210)" />
          <ellipse cx="200" cy="210" rx="150" ry="150" className="tenue" />
          <ellipse cx="200" cy="210" rx="118" ry="44" transform="rotate(22 200 210)" />
          <circle cx="372" cy="150" r="5" className="oro" />
          <circle cx="40" cy="262" r="3.5" className="aqua" />
          <circle cx="300" cy="320" r="3" className="cian" />
        </svg>
        <img src={orbit} alt="" className="kit-orbit" width={360} height={521} />
        <div className="kit-pase">
          <span className="rotulo">Pase de abordaje</span>
          <strong>BOOST IA</strong>
          <span className="kit-pase-ruta">
            <span>
              <small>origen</small>Campuslands
            </span>
            <ChevronRight size={14} />
            <span>
              <small>destino</small>tu próximo proyecto
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- conexión: IA, Obsidian, kit

function Conexion({ atlas, cat, est, puestas, total, ocupado, lanzar }: { atlas: Atlas; cat: Catalogo; est: EstadoKit; puestas: number; total: number; ocupado: boolean; lanzar: (a: Accion) => void }) {
  const todas = [
    { id: 'claude', nombre: 'Claude Code' },
    { id: 'codex', nombre: 'Codex' },
    { id: 'antigravity', nombre: 'Antigravity' },
  ];
  const presentes = new Set(est.ias.map((i) => i.id));
  const vaults = atlas.vaults;
  const conectadas = est.ias.filter((i) => est.obsidian[i.id]).length;
  const obsidianListo = est.ias.length > 0 && conectadas === est.ias.length;
  return (
    <section className="kit-seccion kit-conexion" aria-labelledby="titulo-conexion">
      <header className="kit-seccion-cabeza">
        <p className="rotulo">01 · Tu equipo</p>
        <h2 id="titulo-conexion" className="display">
          Tres piezas que trabajan juntas
        </h2>
      </header>
      <ol className="kit-pasos">
        <li className={est.ias.length ? 'listo' : ''}>
          <span className="kit-paso-icono">
            <Bot size={18} />
          </span>
          <h3>Tus IA</h3>
          <p>El kit se instala dentro de las IA de programación que tengas en esta computadora.</p>
          <ul className="kit-ias">
            {todas.map((i) => (
              <li key={i.id} className={presentes.has(i.id) ? 'si' : ''}>
                {presentes.has(i.id) ? <Check size={13} /> : <span className="kit-ia-vacia" />}
                {i.nombre}
              </li>
            ))}
          </ul>
        </li>
        <li className={obsidianListo ? 'listo' : ''}>
          <span className="kit-paso-icono">
            <Brain size={18} />
          </span>
          <h3>Tu memoria</h3>
          <p>
            {vaults.length
              ? `Encontré ${vaults.length === 1 ? 'tu vault' : `tus ${vaults.length} vaults`} de Obsidian: ${vaults.map((v) => v.nombre).join(', ')}. No creo nada en tu Obsidian: solo le digo a tus IA dónde está tu memoria para que la lean.`
              : 'Todavía no encontré vaults de Obsidian en esta computadora. Cuando tengas uno, vuelve aquí y lo conectamos.'}
          </p>
          {vaults.length > 0 && est.ias.length > 0 && (
            <div className="kit-paso-accion">
              {obsidianListo ? (
                <>
                  <span className="kit-ok">
                    <Check size={14} /> Conectado con tus IA
                  </span>
                  <button className="kit-boton-texto" disabled={ocupado} onClick={() => lanzar({ accion: 'obsidian' })}>
                    Actualizar rutas
                  </button>
                </>
              ) : (
                <button className="boton-secundario" disabled={ocupado} onClick={() => lanzar({ accion: 'obsidian' })}>
                  <Plug size={14} /> Conectar mis vaults con mis IA
                </button>
              )}
            </div>
          )}
        </li>
        <li className={puestas === total ? 'listo' : ''}>
          <span className="kit-paso-icono">
            <Package size={18} />
          </span>
          <h3>Tu kit</h3>
          <p>
            {puestas
              ? `${puestas} de ${total} piezas instaladas. Puedes quitar cualquiera cuando quieras; el kit nunca toca lo que ya tenías.`
              : `${cat.agentes.length} agentes y ${cat.skills.length} skills listos para instalar.`}
          </p>
          <div className="kit-barra" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={puestas} aria-label="Piezas instaladas">
            <span style={{ width: `${(puestas / Math.max(total, 1)) * 100}%` }} />
          </div>
        </li>
      </ol>
    </section>
  );
}

// ---------------------------------------------------------------- flujos

function Flujos({ cat, porSlug, abrir }: { cat: Catalogo; porSlug: Map<string, Pieza>; abrir: (slug: string) => void }) {
  const [id, setId] = useState(cat.flujos[0]?.id);
  const flujo = cat.flujos.find((f) => f.id === id) ?? cat.flujos[0];
  const color = (slug: string) => cat.areas.find((a) => a.id === porSlug.get(slug)?.area)?.color ?? 'var(--laton)';
  if (!flujo) return null;
  return (
    <section className="kit-seccion kit-flujos" aria-labelledby="titulo-flujos">
      <header className="kit-seccion-cabeza">
        <p className="rotulo">02 · Cómo trabajo</p>
        <h2 id="titulo-flujos" className="display">
          El orden importa más que la herramienta
        </h2>
        <p>Estos son los recorridos que sigo en cada tipo de trabajo. Toca cualquier paso para ver qué hace esa pieza.</p>
      </header>
      <div className="kit-flujo-tabs" role="tablist">
        {cat.flujos.map((f) => (
          <button key={f.id} role="tab" aria-selected={f.id === flujo.id} className={f.id === flujo.id ? 'activa' : ''} onClick={() => setId(f.id)}>
            <span className="rotulo">{f.para}</span>
            {f.titulo}
          </button>
        ))}
      </div>
      <ol className="kit-flujo" key={flujo.id}>
        {flujo.pasos.map((paso, i) => {
          const p = porSlug.get(paso.pieza);
          return (
            <li key={paso.pieza + i} style={{ '--area': color(paso.pieza), '--i': i } as React.CSSProperties}>
              <span className="kit-flujo-num mono">{String(i + 1).padStart(2, '0')}</span>
              <button className="kit-flujo-pieza" onClick={() => abrir(paso.pieza)}>
                <span className="kit-tipo-mini">{p?.tipo === 'agente' ? 'agente' : 'skill'}</span>
                <span className="mono">{paso.pieza}</span>
              </button>
              <p>{paso.que}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ---------------------------------------------------------------- tarjetas y ficha

function origen(p: Pieza, cat: Catalogo) {
  if (p.tipo === 'agente' || p.kit === 'propia') return { texto: 'Campuslands', propio: true };
  const k = cat.kits.find((x) => x.id === p.kit);
  return { texto: k ? `${k.nombre} · ${k.autor}` : p.kit, propio: false };
}

function Tarjeta({ p, cat, est, indice, abrir }: { p: Pieza; cat: Catalogo; est: EstadoKit; indice: number; abrir: () => void }) {
  const area = cat.areas.find((a) => a.id === p.area);
  const o = origen(p, cat);
  const puesta = instalada(est, p.slug);
  return (
    <li className={`kit-tarjeta ${p.tipo} ${puesta ? 'puesta' : ''}`} style={{ '--area': area?.color, '--i': Math.min(indice, 18) } as React.CSSProperties}>
      <button onClick={abrir} aria-label={`${p.nombre}: ver ficha`}>
        <span className="kit-tarjeta-cabeza">
          <span className="kit-tipo-mini">{p.tipo === 'agente' ? 'agente' : 'skill'}</span>
          <span className="kit-tarjeta-area">{area?.nombre}</span>
          {puesta ? (
            <span className="kit-estado si" title="Instalado">
              <Check size={12} />
            </span>
          ) : ajena(est, p.slug) ? (
            <span className="kit-estado ajeno" title="Ya tenías algo con este nombre">
              ·
            </span>
          ) : null}
        </span>
        <strong>{p.nombre}</strong>
        <span className="mono kit-slug">{p.slug}</span>
        <span className="kit-desc">{p.descripcion}</span>
        <span className={`kit-origen ${o.propio ? 'propio' : ''}`}>{o.propio ? 'Hecho en Campuslands' : o.texto}</span>
      </button>
    </li>
  );
}

function Ficha({ p, cat, est, ocupado, cerrar, abrir, lanzar }: { p: Pieza; cat: Catalogo; est: EstadoKit; ocupado: boolean; cerrar: () => void; abrir: (s: string) => void; lanzar: (a: Accion) => void }) {
  const area = cat.areas.find((a) => a.id === p.area);
  const kit = p.tipo === 'skill' ? cat.kits.find((k) => k.id === p.kit) : null;
  const puesta = instalada(est, p.slug);
  const [copiado, setCopiado] = useState(false);
  const usanEsta = cat.agentes.filter((a) => a.skills.includes(p.slug));
  const enCatalogo = new Set([...cat.agentes.map((a) => a.slug), ...cat.skills.map((s) => s.slug)]);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === 'Escape' && cerrar();
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [cerrar]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(p.pidelo ?? '');
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1600);
    } catch {
      /* sin portapapeles */
    }
  };

  return (
    <div className="kit-ficha-fondo" onClick={cerrar}>
      <aside className="kit-ficha" role="dialog" aria-modal="true" aria-labelledby="ficha-titulo" style={{ '--area': area?.color } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
        <button className="icono-boton kit-ficha-cerrar" onClick={cerrar} aria-label="Cerrar">
          <X size={16} />
        </button>
        <p className="kit-ficha-sobre">
          <span className="kit-tipo-mini">{p.tipo === 'agente' ? 'agente' : 'skill'}</span>
          <span className="kit-punto" /> {area?.nombre}
        </p>
        <h2 id="ficha-titulo" className="display">
          {p.nombre}
        </h2>
        <p className="mono kit-slug">{p.slug}</p>
        <p className="kit-ficha-desc">{p.descripcion}</p>

        {p.pidelo && (
          <div className="kit-pidelo">
            <span className="rotulo">Pídelo así</span>
            <p>«{p.pidelo}»</p>
            <button className="kit-boton-texto" onClick={copiar}>
              {copiado ? <Check size={13} /> : <Copy size={13} />} {copiado ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        )}

        {p.tipo === 'agente' && (
          <>
            <h3 className="rotulo">Skills que usa</h3>
            <div className="kit-chips">
              {p.skills.map((s) =>
                enCatalogo.has(s) ? (
                  <button key={s} className="chip" onClick={() => abrir(s)}>
                    {s}
                  </button>
                ) : (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ),
              )}
            </div>
            {p.subagentes.length > 0 && (
              <>
                <h3 className="rotulo">Puede llamar a</h3>
                <div className="kit-chips">
                  {p.subagentes.map((s) => (
                    <button key={s} className="chip agente" onClick={() => abrir(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {usanEsta.length > 0 && (
          <>
            <h3 className="rotulo">La usan</h3>
            <div className="kit-chips">
              {usanEsta.map((a) => (
                <button key={a.slug} className="chip agente" onClick={() => abrir(a.slug)}>
                  {a.slug}
                </button>
              ))}
            </div>
          </>
        )}

        <h3 className="rotulo">De dónde viene</h3>
        {kit ? (
          <div className="kit-credito">
            <strong>{kit.nombre}</strong> de {kit.autor} · licencia {kit.licencia}
            <a href={`https://github.com/${kit.repo}`} target="_blank" rel="noreferrer">
              github.com/{kit.repo} <ExternalLink size={12} />
            </a>
            {kit.requiere && <span className="kit-requiere">{kit.requiere}</span>}
            <span className="kit-nota">Se descarga de su repositorio original al instalarla.</span>
          </div>
        ) : (
          <div className="kit-credito">
            <strong>Hecho en Campuslands</strong> para este kit, con instrucciones en español y conectado con tu Obsidian.
          </div>
        )}

        <h3 className="rotulo">En tus IA</h3>
        <ul className="kit-ias">
          {est.ias.map((i) => {
            const e = est.piezas[p.slug]?.[i.id];
            return (
              <li key={i.id} className={e ? 'si' : ''}>
                {e ? <Check size={13} /> : <span className="kit-ia-vacia" />}
                {i.nombre}
                {e === 'propio' && <small> (ya tenías una propia)</small>}
              </li>
            );
          })}
          {!est.ias.length && <li>No hay IA instaladas todavía.</li>}
        </ul>

        <div className="kit-ficha-acciones">
          {puesta ? (
            <>
              <button className="boton-secundario" disabled={ocupado} onClick={() => lanzar({ accion: 'instalar', piezas: [p.slug] })}>
                Actualizar
              </button>
              <button className="kit-boton-peligro" disabled={ocupado} onClick={() => lanzar({ accion: 'quitar', piezas: [p.slug] })}>
                <Trash2 size={14} /> Quitar
              </button>
            </>
          ) : (
            <button className="boton-primario" disabled={ocupado || !est.ias.length} onClick={() => lanzar({ accion: 'instalar', piezas: [p.slug] })}>
              <Package size={15} /> Instalar {p.tipo === 'agente' && p.skills.length ? `con sus ${p.skills.filter((s) => enCatalogo.has(s)).length} skills` : ''}
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

// ---------------------------------------------------------------- comunidad

function Comunidad({ cat }: { cat: Catalogo }) {
  const usados = cat.kits.filter((k) => cat.skills.some((s) => s.kit === k.id));
  return (
    <section className="kit-seccion" aria-labelledby="titulo-comunidad">
      <header className="kit-seccion-cabeza">
        <p className="rotulo">04 · Gracias a la comunidad</p>
        <h2 id="titulo-comunidad" className="display">
          Sobre hombros de gigantes
        </h2>
        <p>Buena parte del kit son skills abiertas de otras personas y empresas. No las copiamos: tu computadora las descarga de su repositorio original, con su licencia y su autoría.</p>
      </header>
      <ul className="kit-comunidad">
        {usados.map((k) => (
          <li key={k.id}>
            <a href={`https://github.com/${k.repo}`} target="_blank" rel="noreferrer">
              <span className="kit-comunidad-cabeza">
                <strong>{k.nombre}</strong>
                <ExternalLink size={13} />
              </span>
              <span className="kit-comunidad-autor">
                {k.autor} · {k.licencia}
              </span>
              <span className="kit-desc">{k.que}</span>
              <span className="mono kit-slug">
                {cat.skills.filter((s) => s.kit === k.id).length} skills · {k.repo}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------- progreso

function Progreso({ trabajo, cerrar }: { trabajo: NonNullable<ReturnType<typeof useKit>['datos']>['trabajo'] & object; cerrar: () => void }) {
  const titulo = trabajo.corriendo ? 'Trabajando…' : trabajo.ok ? 'Listo' : 'Terminó con avisos';
  return (
    <div className={`kit-progreso ${trabajo.corriendo ? 'corriendo' : trabajo.ok ? 'ok' : 'aviso'}`} role="status" aria-live="polite">
      <header>
        {trabajo.corriendo ? <LoaderCircle size={16} className="girando" /> : trabajo.ok ? <Check size={16} /> : <X size={16} />}
        <strong>{titulo}</strong>
        {!trabajo.corriendo && (
          <button className="icono-boton" onClick={cerrar} aria-label="Cerrar">
            <X size={14} />
          </button>
        )}
      </header>
      <pre className="mono">{trabajo.log.slice(-14).join('\n') || 'Empezando…'}</pre>
    </div>
  );
}
