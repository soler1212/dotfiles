#!/bin/bash
# Matar instàncies exactes de forma neta
pkill -x ags
pkill -x gjs
pkill -f "nix run.*agsFull"

# Donar un segon per alliberar el D-Bus
sleep 1

# Llançar ags tal i com ho fas manualment
cd ~/.config/ags
/nix/var/nix/profiles/default/bin/nix run github:aylur/ags#agsFull --extra-experimental-features 'nix-command flakes' -- run moon/
