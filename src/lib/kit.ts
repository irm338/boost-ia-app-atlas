// Kit Boost IA en la página: catálogo, estado de instalación y acciones contra /__atlas/kit.
import { useCallback, useEffect, useRef, useState } from 'react';
import { recargarDatos } from './datos';

export interface Area {
  id: string;
  nombre: string;
  lema: string;
  color: string;
  descripcion: string;
}

export interface Kit {
  id: string;
  nombre: string;
  autor: string;
  repo: string;
  licencia: string;
  que: string;
  requiere?: string;
}

export interface PiezaBase {
  slug: string;
  area: string;
  nombre: string;
  descripcion: string;
  pidelo?: string;
}

export interface AgenteKit extends PiezaBase {
  tipo: 'agente';
  skills: string[];
  subagentes: string[];
}

export interface SkillKit extends PiezaBase {
  tipo: 'skill';
  /** id del kit de terceros, o «propia» */
  kit: string;
  ruta?: string;
}

export type Pieza = AgenteKit | SkillKit;

export interface Flujo {
  id: string;
  titulo: string;
  para: string;
  pasos: { pieza: string; que: string }[];
}

export interface Catalogo {
  kit: { nombre: string; titulo: string; autor: string; repo: string; dedicatoria: string };
  areas: Area[];
  agentes: Omit<AgenteKit, 'tipo'>[];
  skills: Omit<SkillKit, 'tipo'>[];
  kits: Kit[];
  flujos: Flujo[];
}

export type EstadoIA = 'kit' | 'propio';

export interface EstadoKit {
  ias: { id: string; nombre: string }[];
  /** slug → { ia → kit | propio } */
  piezas: Record<string, Record<string, EstadoIA>>;
  /** ia → tiene el bloque de Obsidian puesto */
  obsidian: Record<string, boolean>;
}

export interface Trabajo {
  id: number;
  accion?: string;
  corriendo: boolean;
  log: string[];
  ok: boolean | null;
}

export interface RespuestaKit {
  catalogo: Catalogo;
  estado: EstadoKit;
  trabajo: Trabajo | null;
}

export type Accion = { accion: 'instalar'; piezas?: string[]; areas?: string[]; todo?: boolean } | { accion: 'quitar'; piezas?: string[] } | { accion: 'obsidian' | 'obsidian-quitar' };

/** Todas las piezas en una lista, con su tipo. */
export function piezas(cat: Catalogo): Pieza[] {
  return [...cat.agentes.map((a) => ({ ...a, tipo: 'agente' as const })), ...cat.skills.map((s) => ({ ...s, tipo: 'skill' as const }))];
}

/** Instalada por el kit en al menos una IA. */
export const instalada = (est: EstadoKit, slug: string) => Object.values(est.piezas[slug] ?? {}).includes('kit');

/** La persona ya tenía algo con ese nombre (el kit no lo toca). */
export const ajena = (est: EstadoKit, slug: string) => Object.values(est.piezas[slug] ?? {}).includes('propio') && !instalada(est, slug);

/**
 * Datos del kit con sondeo mientras corre una instalación. `ejecutar` lanza una acción y
 * devuelve un error legible si el servidor la rechaza.
 */
export function useKit() {
  const [datos, setDatos] = useState<RespuestaKit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const corriendo = useRef(false);

  const leer = useCallback(async () => {
    try {
      const r = await fetch('/__atlas/kit');
      const j = (await r.json()) as RespuestaKit & { error?: string };
      if (!r.ok) throw new Error(j.error || `El servidor respondió ${r.status}`);
      setDatos(j);
      setError(null);
      // Al terminar un trabajo, el atlas vuelve a leer skills y agentes.
      if (corriendo.current && !j.trabajo?.corriendo) recargarDatos();
      corriendo.current = Boolean(j.trabajo?.corriendo);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'El servidor no responde');
    }
  }, []);

  useEffect(() => {
    void leer();
  }, [leer]);

  useEffect(() => {
    if (!datos?.trabajo?.corriendo) return;
    const t = window.setInterval(() => void leer(), 900);
    return () => window.clearInterval(t);
  }, [datos?.trabajo?.corriendo, leer]);

  const ejecutar = useCallback(
    async (accion: Accion): Promise<string | null> => {
      try {
        const r = await fetch('/__atlas/kit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(accion) });
        const j = (await r.json()) as { ok: boolean; error?: string };
        if (!j.ok) return j.error || 'No se pudo empezar';
        corriendo.current = true;
        await leer();
        return null;
      } catch {
        return 'El servidor no responde';
      }
    },
    [leer],
  );

  return { datos, error, ejecutar, recargar: leer };
}
