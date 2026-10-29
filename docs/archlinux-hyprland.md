# Pla de prova: Arch Linux + Hyprland

## Estat inicial del repositori

- El repositori ja es gestiona amb chezmoi. No cal substituir-lo per Stow ni canviar l'organització existent.
- La configuració d'escriptori actual és Sway. Els seus fitxers es conserven com a font de veritat per als keybinds, però diversos scripts i ginys d'AGS invoquen `swaymsg` i no funcionaran a Hyprland.
- Hi ha instruccions d'Ubuntu (`apt`, repositori d'eza) al README antic; no s'han executat ni migrat amb scripts d'instal·lació.
- AGS inclou dos enllaços absoluts a `/nix/store` i accedeix a l'IPC de Sway. Es deixa inactiu durant la prova. Waybar recupera l'indicador lunar d'AGS (fase, il·luminació, propera fase i horaris al tooltip) i el reproductor MPRIS. Els controls interactius del giny lunar, el canvi de tema i el selector de wallpapers encara no s'han traslladat.
- Neovim és una configuració pròpia amb lazy.nvim, `lazy-lock.json`, LSP/Mason, Treesitter, Telescope, Neo-tree, Gitsigns, Trouble i Lspsaga. Es conserva sense modernització massiva.
- `dot_bashrc` inclou `batcat`, nom d'executable habitual a Debian que pot no existir a Arch (on el paquet `bat` acostuma a instal·lar `bat`). També depèn de fzf, zoxide, Oh My Posh, NVM i configuració local de Python.
- Un tema d'Oh My Posh conté camps que semblen tokens, però els valors semblen placeholders. No s'han copiat a la nova configuració ni exposat.
- Aquest entorn de treball és Windows, així que no s'ha pogut consultar l'inventari de paquets de l'Arch objectiu ni provar la configuració dins Hyprland.

## Què queda habilitat per a la prova

La configuració nova és `~/.config/hypr/hyprland.lua` i necessita Hyprland 0.55 o posterior. La sintaxi és l'API Lua nativa (`hl.config`, `hl.bind`, `hl.define_submap`, `hl.dsp`, `hl.on`); no depèn d'un wrapper extern. La configuració usa Kitty, Fuzzel, Firefox i Thunar com a ordres d'aplicació.

L'autostart està desactivat amb `ENABLE_AUTOSTART = false`. Així no s'inicien Waybar, Mako, Hyprpaper, Hypridle, `nm-applet`, `blueman-applet` ni serveis de clipboard. PipeWire, NetworkManager i els portals s'han de mantenir sota systemd/D-Bus; no es dupliquen des del compositor. Les dreceres de teclat funcionen quan el programa requerit ja hi és.

La configuració de Sway i AGS es queda al repositori, però no l'apliquis per fer aquesta prova. Els fitxers existents de Bash, WezTerm i Neovim tampoc no es despleguen amb les ordres de prova d'aquest README. Waybar i el seu script lunar viuen a `~/.config/waybar/` i `~/.local/bin/pm-moon`; aplica'ls explícitament i inicia `waybar` manualment quan vulguis provar-los. El mòdul lunar reutilitza wttr.in, com l'AGS original: el servei pot inferir la ubicació per IP. Desa la resposta localment durant una hora i mostra dades desades si falla la xarxa.

## Paquets per comprovar (no instal·lar en bloc)

Primer compara la llista amb el sistema. Els components que ja funcionen no s'han de reinstal·lar:

```bash
pacman -Q hyprland kitty fuzzel firefox thunar waybar mako hyprpaper hyprlock hypridle playerctl
pacman -Q xdg-desktop-portal xdg-desktop-portal-hyprland xdg-desktop-portal-gtk
pacman -Q pipewire wireplumber networkmanager polkit
pacman -Q grim slurp wl-clipboard cliphist jq brightnessctl
pacman -Q neovim ripgrep fd nodejs npm git
```

Components referenciats per aquesta configuració:

| Ús | Paquets/comandes | Estat |
| --- | --- | --- |
| Compositor i sessió | `hyprland` (0.55+) | Essencial |
| Terminal, launcher, fitxers | `kitty`, `fuzzel`, `thunar`, `firefox` | Essencial per les dreceres configurades |
| Captures | `grim`, `slurp`, `wl-clipboard` | Essencial per les dreceres de captura |
| Historial de clipboard | `cliphist`, `wl-clipboard` | Opcional; només s'utilitza en demanar l'historial |
| Àudio | `pipewire`, `wireplumber` (`wpctl`) | Es manté la instal·lació existent; les dreceres fan servir `wpctl` |
| Brillantor i controls multimèdia/MPRIS | `brightnessctl`, `playerctl` | Opcional si es volen aquestes tecles i el mòdul MPRIS |
| Retalls de captura de finestra | `jq` | Opcional per l'opció `Super+Print`, després `w` |
| Portals Wayland | `xdg-desktop-portal`, `xdg-desktop-portal-hyprland`, `xdg-desktop-portal-gtk` | Només cal corregir si no funcionen els selectors o els diàlegs |
| Barra | `waybar` | Config inicial disponible; no s'inicia per defecte |
| Notificacions/fons/inactivitat | `mako`, `hyprpaper`, `hypridle` | No s'inicien per defecte; configs pendents de revisar |
| Xarxa/Bluetooth i permisos | `networkmanager`, `polkit` i l'agent/applet que ja facis servir | No es reinicien des de Hyprland |
| Neovim | `neovim`, `git`, `ripgrep`, `fd`, `nodejs`, `npm` | Verificar; Mason gestiona alguns servidors LSP |

La configuració de Neovim utilitza Mason per als LSP; comprova el resultat de `:checkhealth` i els servidors requerits des de Neovim abans de decidir paquets addicionals. No instal·lis AUR helpers ni executis instal·ladors remots per aquesta prova.

## Mapa inicial Sway → Hyprland

| Drecera Sway | Acció original | Adaptació preparada | Dependències/canvi |
| --- | --- | --- | --- |
| `Super+Return` | Terminal | Kitty | `kitty` |
| `Super+Shift+Return` | Terminal flotant | Kitty amb regla flotant | `kitty` |
| `Super+d` | Ulauncher | Fuzzel | Es canvia el launcher |
| `Super+Shift+d` | Wofi | Fuzzel | Alias al mateix launcher perquè no s'instal·li Wofi |
| `Super+Shift+b/f` | Browser/file manager | Firefox/Thunar | Comandes configurables a la part superior del Lua |
| `Super+Shift+q` | Tancar contenidor | Tancar finestra activa | Equivalent pràctic |
| `Super+Shift+c` | Recarregar Sway | Recarregar config Hyprland | `Super+Shift+r` de reinici no té equivalent directe; no tanca la sessió |
| `Super+h/j/k/l`, fletxes | Focus direccional | Focus direccional Hyprland | Mateixes tecles |
| `Super+Shift+h/j/k/l`, fletxes | Moure contenidor | Moure finestra | Mateixes tecles |
| `Super+r`, després `h/j/k/l` o fletxes | Mode de redimensionament | Submap de redimensionament | `Shift` dins el mode fa ajust fi |
| `Super+Shift+Space` | Floating toggle | Floating toggle | Equivalent pràctic |
| `Super+Space` | Focus entre tiled/floating | Focus a finestra flotant o tiled | Aproximació; no canvia el mode de la finestra |
| `Super+f` | Fullscreen | Fullscreen | Equivalent |
| `Super+c` | Centrar floating | Centrar finestra | La finestra ha de ser flotant |
| `Super+a`, `Super+Shift+a` | Focus parent/child | Sense bind | Hyprland no té l'arbre de contenidors Sway |
| `Super+s` | Layout stacking | Sense bind | Hyprland no ofereix el layout stacking de Sway |
| `Super+w` | Layout tabbed | Toggle de grup Hyprland | Un grup s'assembla a les pestanyes, però no és el mateix layout |
| `Super+b/v` | Split horitzontal/vertical | Preseleccionar direcció Dwindle | Orienta la propera finestra; no fixa un split de contenidor |
| `Super+e` | Toggle split layout | Canviar Dwindle/Master | Canvi de layout més proper disponible |
| `Super+1..9/0` | Canviar workspace | Workspaces 1..10 | Mateix mapping |
| `Super+Shift+1..9/0` | Moure finestra a workspace | Moure finestra | Mateix mapping |
| `Super+Ctrl+1..9/0` | Moure i seguir | Moure i seguir | Mateix mapping |
| `Super+Tab`, `Super+Shift+Tab` | Workspace següent/anterior | Selector relatiu `e+1` / `e-1` | Ordre segons els workspaces creats |
| `Super+m` | Tornar al workspace anterior | Focalitzar el workspace `previous` | Equivalent previst |
| `Super+Shift+m` | Moure finestra al workspace anterior | Moure finestra a `previous` | Equivalent previst; comprovar amb dos workspaces |
| `Super+Ctrl+Shift+fletxes` | Moure workspace a una sortida | Dispatcher de workspace a sortida | Verificar amb més d'un monitor |
| `Super+Shift+F7/F8` | Moure workspace a sortida esquerra/dreta | Moure workspace a monitor esquerre/dret | Verificar amb més d'un monitor |
| `Super+Shift+e` | Obrir el menú d'energia | Menú Fuzzel amb bloqueig, suspensió, reinici i apagada | Reinici i apagada demanen confirmació; no hi ha opció de logout ni hibernació |
| `Super+l` | Focus cap a la dreta | Focus cap a la dreta | No bloqueja ni tanca la sessió |
| `Print` | Captura de pantalla | Grim pantalla completa | `grim` |
| `Super+Print`, després `s/a/w/Shift+a` | Menú de captures | Submap: pantalla/àrea/finestra/àrea clipboard | `grim`, `slurp`, i `jq` per captura de finestra |
| `Super+Shift+s` | Àrea al clipboard | Àrea al clipboard | `grim`, `slurp`, `wl-copy` |
| `Super+Shift+v` | Historial clipboard | Fuzzel + cliphist | `cliphist`, `fuzzel`, `wl-copy` |
| Tecles XF86 de volum/mic | Àudio PipeWire-Pulse | `wpctl` | Canvi de `pactl` a WirePlumber |
| Tecles XF86 play/next/prev | Controls multimèdia | Mateixes tecles amb playerctl | `playerctl` |
| Tecles XF86 de brillantor | Brillantor ±5%; Shift ±1% | Mateixes tecles amb brightnessctl | `brightnessctl` |
| `Super+F7`, `Super+p` | Canviar pantalla/perfils | Pendent de detectar sortides | Executa `hyprctl monitors all` a l'ordinador objectiu abans de fixar noms |
| `Super+Alt+w` | Següent wallpaper | Pendent d'adaptar el selector | El script actual depèn de `swaymsg`; Hyprpaper encara no té config/font aplicada |

## Comprovacions durant la prova

1. Confirma `hyprctl version` (0.55 o posterior) i que `hyprctl monitors all` mostri les pantalles reals.
2. Aplica només `~/.config/hypr/hyprland.lua`, tanca la sessió gràfica i entra a Hyprland.
3. Revisa errors de configuració amb `hyprctl configerrors`; si n'hi ha, no activis serveis.
4. Confirma els mapatges amb `hyprctl binds` i prova finestres, workspaces, resizing, captures i tecles multimèdia una a una.
5. Valida els portals i l'àudio amb una aplicació real abans d'activar capturadors de pantalla o Bluetooth.
6. Per Neovim, executa `nvim --headless '+checkhealth' +qa` a l'Arch i revisa els avisos de Mason/LSP. Aquest pas no és necessari per provar Hyprland.
7. Per la prova inicial deixa `ENABLE_AUTOSTART = false`. Prova Waybar manualment des del terminal. Hyprpaper, Hypridle, Mako, clipboard watcher i els applets continuen sense iniciar-se automàticament.

## Pendents abans d'activar l'escriptori complet

- Comparar paquets instal·lats a l'Arch i corregir les diferències reals de Bash (`batcat`/`bat`, `fd-find`/`fd`, versions de Node i executables LSP).
- Fer el mapa complet de les dreceres restants i comprovar col·lisions amb `hyprctl binds`; en particular, validar la selecció `previous` de workspace.
- El menú d'energia requereix Fuzzel i Hyprlock; Fuzzel ja és el launcher configurat per aquesta migració.
- Detectar els noms de sortida reals i traslladar els perfils Sway a funcions segures de Hyprland.
- Convertir el selector de wallpapers i els scripts de `swaymsg` a IPC de Hyprland/Hyprpaper.
- Completar els ginys d'AGS pendents (controls gràfics lunar, selector de tema i wallpapers) amb Waybar o eines equivalents; configurar Mako, Hyprpaper, Hyprlock i Hypridle sense duplicar serveis.
- Provar la configuració Neovim a Linux i validar els executables externs utilitzats realment pels plugins.
