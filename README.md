# Dotfiles: Arch Linux + Hyprland

Dotfiles personals gestionats amb [chezmoi](https://www.chezmoi.io/). La branca `archlinux` prepara la migració de l'entorn anterior Ubuntu + Sway cap a Arch Linux + Hyprland, mantenint Neovim, els keybinds principals i les eines personals.

## Estat de la migració

La configuració nova de Hyprland és optativa i no inicia serveis automàticament. `chezmoi init` només clona la font: no executis `chezmoi apply` sense revisar abans el diff, perquè la resta del repositori encara conté la configuració antiga de Sway, AGS, Bash, WezTerm i Neovim.

<!-- Hyprland autostart toggle and Waybar/script destinations from private_dot_config/hypr/hyprland.lua, private_dot_config/waybar/, and private_dot_local/bin/ -->

- Configuració Hyprland Lua: `private_dot_config/hypr/hyprland.lua` → `~/.config/hypr/hyprland.lua`.
- Barra Waybar, amb fase lunar i reproductor MPRIS: `private_dot_config/waybar/` → `~/.config/waybar/`; no s'inicia automàticament.
- Script lunar: `private_dot_local/bin/executable_pm-moon` → `~/.local/bin/pm-moon`; consulta wttr.in i desa les dades una hora.
- Autostart per defecte: desactivat (`ENABLE_AUTOSTART = false`).
- Versió necessària: Hyprland 0.55 o posterior per carregar configuració Lua nativa.
- Inventari, dependències i mapa de dreceres: [docs/archlinux-hyprland.md](docs/archlinux-hyprland.md).

## Preparar la prova a Arch

Primer comprova si chezmoi ja hi és:

```bash
command -v chezmoi
```

Si falta chezmoi o Git, instal·la'ls des dels repositoris oficials. `--needed` evita reinstal·lar paquets que ja hi siguin:

```bash
sudo pacman -S --needed chezmoi git
```

La branca `archlinux` encara és local i no s'ha publicat a GitHub. `chezmoi init` pot clonar el repositori públic actual, però encara no conté aquests canvis. Per provar exactament aquesta adaptació sense fer push, copia el bundle creat al costat del checkout cap a l'Arch (per exemple, amb una memòria USB) i importa la branca local:

```bash
chezmoi init https://github.com/soler1212/dotfiles.git
git -C ~/.local/share/chezmoi fetch /ruta/al/dotfiles-archlinux.bundle archlinux:refs/heads/archlinux
git -C ~/.local/share/chezmoi switch archlinux
```

Substitueix `/ruta/al/dotfiles-archlinux.bundle` per la ubicació on hagis copiat el bundle. `chezmoi init` només clona la font; no desplega cap dotfile.

Revisa el diff general i després el del fitxer Hyprland:

```bash
chezmoi diff
chezmoi diff ~/.config/hypr/hyprland.lua
```

Quan vulguis provar només Hyprland, aplica únicament aquest destí:

```bash
chezmoi apply ~/.config/hypr/hyprland.lua
```

Si després vols provar la barra, aplica la configuració i l'script lunar i inicia `waybar` manualment des d'un terminal dins Hyprland:

```bash
chezmoi apply ~/.config/waybar/config ~/.config/waybar/style.css ~/.local/bin/pm-moon
waybar
```

Entra a la sessió Hyprland des del gestor d'inici de sessió. Si Hyprland ja era obert abans d'afegir el fitxer Lua, reinicia la sessió perquè la detecció del fitxer de configuració es fa en iniciar el compositor.

## Desplegament i reversió

No facis servir `chezmoi init --apply` ni `chezmoi apply` sense indicar el destí mentre la migració sigui en proves. Per retirar el fitxer de prova, tanca la sessió Hyprland i executa:

```bash
chezmoi destroy ~/.config/hypr/hyprland.lua ~/.config/waybar/config ~/.config/waybar/style.css ~/.local/bin/pm-moon
```

Confirma que el destí és exactament aquest fitxer abans d'acceptar la retirada. El repositori local de chezmoi es pot conservar per reprendre la prova o eliminar manualment quan ja no el necessitis.

## Configuració anterior

Els fitxers originals de Sway i AGS es conserven com a referència durant la migració. El panell lunar i la informació MPRIS ja tenen una adaptació inicial a Waybar; els controls gràfics del giny lunar, els selectors de tema i de wallpaper encara no s'han traslladat. Altres scripts depenen de `swaymsg` o de rutes Nix antigues; no els activis en una sessió Hyprland.

## Components personals

- Neovim amb lazy.nvim, LSP i mapatges personalitzats.
- Bash, Oh My Posh i WezTerm.
- Configuració anterior de Sway i ginys AGS, conservada com a referència.
