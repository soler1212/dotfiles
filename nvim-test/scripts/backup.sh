#!/bin/bash

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly LOG_FILE="/tmp/app-$(date +%Y%m%d).log"

log() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" | tee -a "$LOG_FILE"
}

info()  { log "INFO" "$@"; }
warn()  { log "WARN" "$@"; }
error() { log "ERROR" "$@"; }

cleanup() {
    info "Cleaning up temporary files..."
    rm -rf /tmp/app-*.tmp
    info "Done"
}

backup_config() {
    local src="$1"
    local dest="${2:-/tmp/config-backup}"
    info "Backing up $src to $dest"
    cp -r "$src" "$dest"
}

restore_config() {
    local src="$1"
    local dest="${2:-/etc/app/config}"
    info "Restoring $src to $dest"
    cp -r "$src" "$dest"
}

main() {
    info "Starting application"
    trap cleanup EXIT

    if [[ ! -d "$SCRIPT_DIR" ]]; then
        error "Directory not found: $SCRIPT_DIR"
        exit 1
    fi

    backup_config "$SCRIPT_DIR/../configs"
    info "Application completed successfully"
}

main "$@"
