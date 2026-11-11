import { ArrowRight, FolderPlus } from 'lucide-react';
import { useState } from 'react';
import { agregarVault, type VaultListo } from '../lib/datos';

// El resultado sobrevive a que la pantalla cambie: al crearse el vault, el Universo
// ya tiene centro, pero sigue mostrando cómo abrirlo en Obsidian.
let ultimo: VaultListo | null = null;
export const vaultRecienAgregado = () => Boolean(ultimo?.ok);

/**
 * Cuando el atlas no encontró vaults: explica cómo tener uno en Obsidian y deja agregar la
 * carpeta de uno que ya existe. Boost IA nunca crea vaults ni notas: solo lee los tuyos.
 */
export default function EmpezarVault() {
  const [estado, setEstado] = useState<'listo' | 'trabajando'>('listo');
  const [resultado, setResultado] = useState<VaultListo | null>(ultimo);
  const [ruta, setRuta] = useState('');

  const pedir = async (pedido: { ruta: string }) => {
    setEstado('trabajando');
    setResultado(null);
    ultimo = await agregarVault(pedido);
    setResultado(ultimo);
    setEstado('listo');
  };

  if (resultado?.ok) {
    return (
      <div className="empezar" role="status">
        <p className="rotulo">Listo</p>
        <p>
          <strong>{resultado.nombre}</strong> ya está en el atlas desde <code>{resultado.ruta}</code>.
        </p>
        <a className="boton-primario" href={resultado.obsidian}>
          Abrir en Obsidian <ArrowRight size={15} />
        </a>
        <p className="empezar-nota">
          ¿No tienes Obsidian? Es gratis:{' '}
          <a href="https://obsidian.md/download" target="_blank" rel="noreferrer">
            obsidian.md/download
          </a>
          . Luego elige «Abrir carpeta como vault».
        </p>
      </div>
    );
  }

  return (
    <div className="empezar">
      <p className="rotulo">Tu memoria</p>
      <p>
        Boost IA lee los vaults de Obsidian que ya tienes; no crea ninguno. Abre{' '}
        <a href="https://obsidian.md/download" target="_blank" rel="noreferrer">
          Obsidian
        </a>
        , crea o abre tu vault y el atlas lo encontrará solo. Si está en otra carpeta, escríbela aquí:
      </p>
      <details className="empezar-tengo" open>
        <summary>Agregar la carpeta de mi vault</summary>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (ruta.trim()) void pedir({ ruta: ruta.trim() });
          }}
        >
          <input value={ruta} onChange={(e) => setRuta(e.target.value)} placeholder="~/Documents/Mi vault" aria-label="Ruta de la carpeta del vault" spellCheck={false} />
          <button type="submit" className="boton-secundario" disabled={estado === 'trabajando' || !ruta.trim()}>
            <FolderPlus size={14} /> Agregar
          </button>
        </form>
      </details>
      {resultado?.error && <p className="empezar-error">{resultado.error}</p>}
    </div>
  );
}
