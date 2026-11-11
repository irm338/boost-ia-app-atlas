// Obsidian: el atlas solo lee los vaults que la persona ya tiene; nunca crea vaults, carpetas ni notas.

/** Abre la carpeta en Obsidian (la registra como vault si hacía falta). */
export const enlaceObsidianCarpeta = (ruta) => `obsidian://open?path=${encodeURIComponent(ruta)}`;
