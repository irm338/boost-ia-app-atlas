#!/usr/bin/env bash
# Desinstalador para Linux. Quita «Boost IA Atlas» del menú de aplicaciones y del
# Escritorio y borra la app de ~/.local/share/boost-ia-atlas. Antes muestra qué va a
# quitar y pide confirmación. Tus vaults y tus notas no se tocan.
#   bash "Desinstalar en Linux.sh"   (o doble clic: «Ejecutar como programa»)
set -eo pipefail
INSTALADA="${XDG_DATA_HOME:-$HOME/.local/share}/boost-ia-atlas"
AQUI="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$INSTALADA/scripts/desinstalar.mjs" ]; then APP="$INSTALADA"; else APP="$AQUI"; fi
# shellcheck disable=SC1091
source "$APP/scripts/entorno.sh"
cargar_node
if ! command -v node >/dev/null 2>&1; then
  echo "No encontré Node.js. Para desinstalar a mano: borra ~/.local/share/applications/boost-ia-atlas.desktop, el acceso del Escritorio y la carpeta $INSTALADA."
  exit 1
fi
if [ -t 0 ]; then
  node "$APP/scripts/desinstalar.mjs"
  read -r -p "Presiona Enter para cerrar…" _
else
  # Abierto sin terminal (doble clic o menú): se pregunta con una ventana.
  PREGUNTA="¿Desinstalar el Boost IA Atlas? Se quitan la app y sus accesos; tus vaults y tus notas no se tocan."
  if command -v zenity >/dev/null 2>&1; then
    zenity --question --title="Boost IA Atlas" --text="$PREGUNTA" --ok-label="Desinstalar" --cancel-label="Cancelar" || exit 0
  elif command -v kdialog >/dev/null 2>&1; then
    kdialog --title "Boost IA Atlas" --yesno "$PREGUNTA" || exit 0
  else
    command -v notify-send >/dev/null 2>&1 && notify-send "Boost IA Atlas" "Para desinstalar, ejecuta en una terminal: bash \"$APP/Desinstalar en Linux.sh\""
    exit 0
  fi
  node "$APP/scripts/desinstalar.mjs" --si
  command -v notify-send >/dev/null 2>&1 && notify-send "Boost IA Atlas" "Desinstalado. Tus vaults y tus notas siguen intactos." || true
fi
