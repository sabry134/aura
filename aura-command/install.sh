#!/bin/sh
set -e

error() {
    echo "Error: $1" >&2
    exit 1
}

command -v curl >/dev/null 2>&1 || error "curl is required but not installed"
command -v unzip >/dev/null 2>&1 || error "unzip is required but not installed"

INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "Downloading aura.zip..."
curl -fsSL "https://raw.githubusercontent.com/sabry134/aura/main/aura-command/aura.zip" -o "${TMP_DIR}/aura.zip"

echo "Extracting aura..."
unzip -o "${TMP_DIR}/aura.zip" -d "${TMP_DIR}" >/dev/null 2>&1

if [ ! -f "${TMP_DIR}/aura" ]; then
    error "Failed to find aura binary"
fi

mv "${TMP_DIR}/aura" "${INSTALL_DIR}/aura"
chmod +x "${INSTALL_DIR}/aura"

if [ -x "${INSTALL_DIR}/aura" ]; then
    echo "✅ Successfully installed aura to ${INSTALL_DIR}/aura"
    echo
    echo "Running 'aura help':"
    "${INSTALL_DIR}/aura" help
else
    error "Installation failed"
fi
