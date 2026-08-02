#!/usr/bin/env bash
# Build script for nvim-test project

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
BUILD_LOG="$PROJECT_ROOT/build.log"

log() { echo "[$(date '+%H:%M:%S')] $*"; }
warn() { log "WARN: $*" >&2; }
error() { log "ERROR: $*" >&2; exit 1; }

clean() {
    log "Cleaning previous build..."
    rm -rf "$DIST_DIR"
    mkdir -p "$DIST_DIR"
}

build_python() {
    log "Building Python modules..."
    python3 -m py_compile "$PROJECT_ROOT/src"/*.py 2>&1 | tee -a "$BUILD_LOG" || true
}

build_scripts() {
    log "Checking shell scripts..."
    for script in "$PROJECT_ROOT"/scripts/*.sh; do
        if [[ -f "$script" ]]; then
            bash -n "$script" && log "  ✓ $(basename "$script")" || warn "  ✗ $(basename "$script") failed syntax check"
        fi
    done
}

main() {
    log "Starting build process..."
    clean
    build_python
    build_scripts
    log "Build completed successfully"
}

main "$@"
