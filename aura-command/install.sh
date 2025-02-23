#!/bin/sh
# This script installs aura.
# You can run it directly:
#   curl -fsSL https://raw.githubusercontent.com/sabry134/aura/main/aura-command/install.sh | sh

set -e

{ # this ensures the entire script is downloaded

# Function to output error message and exit
error() {
    echo "Error: $1" >&2
    exit 1
}

# Check for required commands
command -v curl >/dev/null 2>&1 || error "curl is required but not installed"
command -v sed >/dev/null 2>&1 || error "sed is required but not installed"
command -v unzip >/dev/null 2>&1 || error "unzip is required but not installed"

# Detect operating system
OS="$(uname -s)"
case "${OS}" in
    Linux*)   OS_NAME=linux;;
    Darwin*)  OS_NAME=darwin;;
    *)        error "Unsupported operating system: ${OS}";;
esac

# Detect architecture
ARCH="$(uname -m)"
case "${ARCH}" in
    x86_64*)  ARCH_NAME=amd64;;
    arm64*)   ARCH_NAME=arm64;;
    aarch64*) ARCH_NAME=arm64;;
    *)        error "Unsupported architecture: ${ARCH}";;
esac

# Use the main branch as a source of assets
BRANCH="main"

echo "Installing aura from branch ${BRANCH}..."

# Construct download URL (ensure your asset naming and location match)
BINARY_NAME="aura_${OS_NAME}_${ARCH_NAME}.zip"
DOWNLOAD_URL="https://raw.githubusercontent.com/sabry134/aura/${BRANCH}/aura-command/${BINARY_NAME}"

# Create a temporary directory for download and extraction
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# Download the asset
echo "Downloading from ${DOWNLOAD_URL}..."
curl -fsSL "$DOWNLOAD_URL" -o "${TMP_DIR}/${BINARY_NAME}"

# Determine installation directory
if [ "$(id -u)" -eq 0 ]; then
    INSTALL_DIR="/usr/local/bin"
else
    INSTALL_DIR="$HOME/.local/bin"
    mkdir -p "$INSTALL_DIR"
fi

# Unzip the downloaded archive
unzip -o "${TMP_DIR}/${BINARY_NAME}" -d "${TMP_DIR}" >/dev/null 2>&1

# Find the aura binary (assumes the binary file name starts with "aura")
AURA_BINARY=$(find "${TMP_DIR}" -type f \( -name "aura" -o -name "aura_v*" \) | head -n 1)
if [ -z "$AURA_BINARY" ]; then
    error "Could not find aura binary in the archive"
fi

# Move the binary to the install directory and make it executable
mv "${AURA_BINARY}" "${INSTALL_DIR}/aura"
chmod +x "${INSTALL_DIR}/aura"

# Verify installation by running "aura help"
if [ -x "${INSTALL_DIR}/aura" ]; then
    echo "✨ Successfully installed aura to ${INSTALL_DIR}/aura"
    echo
    echo "Running 'aura help':"
    "${INSTALL_DIR}/aura" help
else
    error "Installation failed: Could not install binary to ${INSTALL_DIR}/aura"
fi

}
