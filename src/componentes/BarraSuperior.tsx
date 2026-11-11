import { Moon, RefreshCw, Search, Sun } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import logoCampuslands from '../assets/marca/campuslands.svg?raw';
import { AvisoVersion } from './Actualizacion';
import { cargarRecientes, recargarDatos, regenerarEnServidor, useBuscandoCambios, useDatos } from '../lib/datos';
import { hace } from '../lib/formato';
import { rutaVault, type Ruta } from '../lib/rutas';
import { alternarTema, useTema } from '../lib/tema';
import type { Atlas } from '../lib/tipos';
import { desdeNovedades } from '../lib/visita';

// Seis secciones: el Kit (portada) y las cinco del atlas, cada una con un propósito claro. Lo demás se hace
// desde el centro de mando (⌘K), así la barra no se llena de botones.
const secciones = (atlas: Atlas | null): { vistas: Ruta['vista'][]; hash: string; etiqueta: string }[] => [
  { vistas: ['kit'], hash: '#/', etiqueta: 'Kit' },
  { vistas: ['universo'], hash: '#/universo', etiqueta: 'Universo' },
  { vistas: ['hoy'], hash: '#/hoy', etiqueta: 'Hoy' },
  { vistas: ['vault'], hash: rutaVault(atlas?.centro ?? ''), etiqueta: 'Vaults' },
  { vistas: ['skills'], hash: '#/skills', etiqueta: 'Skills' },
  { vistas: ['sistema', 'agentes'], hash: '#/sistema', etiqueta: 'Sistema' },
];

/** Marca de Boost IA: una flecha que despega dentro de una órbita (el «boost»
 *  sobre el universo de Campuslands). El satélite dorado es el logro del egresado. */
export function Marca() {
  const id = useId();
  return (
    <svg className="marca-icono" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00d9a4" />
          <stop offset="1" stopColor="#2caaff" />
        </linearGradient>
      </defs>
      <ellipse cx="16" cy="18" rx="13.6" ry="6.4" fill="none" stroke="currentColor" strokeOpacity=".38" strokeWidth="1.3" transform="rotate(-18 16 18)" />
      <path d="M16 3.6 23.4 20.2 16 16.4 8.6 20.2Z" fill={`url(#${id})`} />
      <path d="M16 16.4v9.4" stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".55" />
      <circle cx="27.4" cy="11" r="1.9" fill="#ffc56b" />
    </svg>
  );
}

/** Logo oficial de Campuslands (hereda el color del texto: sirve en ambos temas). */
export function LogoCampuslands({ className = '' }: { className?: string }) {
  return <span className={`logo-campuslands ${className}`} role="img" aria-label="Campuslands" dangerouslySetInnerHTML={{ __html: logoCampuslands }} />;
}

export default function BarraSuperior({ atlas, ruta, abrirBuscador }: { atlas: Atlas | null; ruta: Ruta; abrirBuscador: () => void }) {
  const tema = useTema();
  const [actualizando, setRegenerando] = useState(false);
  // También gira mientras el servidor busca cambios por su cuenta (al abrir la app).
  const buscando = useBuscandoCambios();
  const regenerando = actualizando || buscando;
  // Un punto discreto en «Hoy» cuando hay notas tuyas nuevas desde la última visita.
  const recientes = useDatos('recientes', cargarRecientes);
  const hayNovedades = (recientes.datos?.notas ?? []).some((x) => !x.g && Date.parse(x.m) > desdeNovedades(7));
  const [aviso, setAviso] = useState<string | null>(null);

  // El centro de mando también puede pedir una actualización.
  useEffect(() => {
    const pedido = () => void actualizar();
    window.addEventListener('atlas:actualizar', pedido);
    return () => window.removeEventListener('atlas:actualizar', pedido);
  });

  const actualizar = async () => {
    setRegenerando(true);
    setAviso(null);
    try {
      const r = await regenerarEnServidor();
      if (!r.ok) setAviso(r.salida.split('\n')[0] || 'No se pudo regenerar');
      recargarDatos();
    } catch {
      setAviso('El servidor no responde');
    } finally {
      setRegenerando(false);
    }
  };

  return (
    <header className="barra">
      <a className="marca" href="#/" aria-label="Boost IA · inicio">
        <Marca />
        <span className="marca-texto">
          <span className="display">Boost<span className="marca-degradado"> IA</span></span>
          <span className="rotulo">Atlas · Campuslands</span>
        </span>
      </a>

      <nav className="navegacion" aria-label="Secciones">
        {secciones(atlas).map((s) => {
          const activa = s.vistas.includes(ruta.vista);
          return (
            <a key={s.etiqueta} href={s.hash} className={activa ? 'activa' : ''} aria-current={activa ? 'page' : undefined}>
              {s.etiqueta}
              {s.vistas.includes('hoy') && hayNovedades && !activa && <span className="punto-novedad" aria-label="hay novedades" />}
            </a>
          );
        })}
      </nav>

      <div className="barra-acciones">
        <AvisoVersion />
        <button className="buscar-boton" onClick={abrirBuscador} aria-label="Buscar o pedir algo (⌘K)">
          <Search size={15} />
          <span>Buscar o pedir</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="icono-boton estado-datos" onClick={actualizar} disabled={regenerando} title={aviso ?? 'Volver a leer vaults, skills y agentes'}>
          <RefreshCw size={15} className={regenerando ? 'girando' : ''} />
          <span className="mono">{regenerando ? 'buscando cambios…' : atlas ? hace(atlas.generado) : '—'}</span>
        </button>
        <button className="icono-boton boton-tema" onClick={alternarTema} aria-label={tema === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
          {tema === 'oscuro' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
