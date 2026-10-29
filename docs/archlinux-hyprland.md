# Arch Linux + Hyprland

Guia d'instal·lació i operació per a aquesta branca de chezmoi. La configuració assumeix Arch Linux, sessió Wayland amb Hyprland i el teclat espanyol. El mòdul lunar necessita Python. Els serveis d'escriptori s'activen automàticament a la sessió.

## Paquets necessaris

Instal·la els components que cobreixen les dreceres, barra, bloqueig, notificacions, wallpaper, captura, àudio, xarxa i Bluetooth:

```bash
sudo pacman -S --needed \
  hyprland hyprpaper hyprlock hypridle polkit hyprpolkitagent \
  waybar mako fuzzel kitty firefox thunar neovim git ripgrep fd nodejs npm \
  grim slurp wl-clipboard cliphist jq \
  pipewire pipewire-audio pipewire-alsa wireplumber pipewire-pulse \
  networkmanager network-manager-applet nm-connection-editor \
  bluez bluez-utils blueman \
  pavucontrol playerctl brightnessctl \
  xdg-desktop-portal xdg-desktop-portal-hyprland xdg-desktop-portal-gtk \
  gsettings-desktop-schemas adwaita-gtk-theme adwaita-cursors papirus-icon-theme \
  python glib2 libnotify noto-fonts ttf-jetbrains-mono ttf-nerd-fonts-symbols
```

Per posar en marxa xarxa i Bluetooth una sola vegada:

```bash
sudo systemctl enable --now NetworkManager bluetooth
```

Activa les unitats d'àudio d'usuari si no arrenquen automàticament: `systemctl --user enable --now pipewire.socket pipewire-pulse.socket wireplumber.service`. Els portals s'activen via D-Bus; no cal cap script que els mati o reiniciï.

Si uses un gestor d'inici de sessió, tria la sessió Hyprland. Per iniciar-la des d'un TTY, executa `start-hyprland` després d'entrar; és el wrapper recomanat, amb recuperació d'errors i mode segur. La configuració utilitza Hyprland 0.55+ perquè està escrita amb la seva API Lua nativa. Si el paquet estable de la teva màquina encara és anterior, actualitza Arch abans d'aplicar-la.

### Components opcionals segons ús

```bash
sudo pacman -S --needed bat fzf zoxide eza wezterm
```

Aquests paquets són eines de terminal opcionals; `wezterm` és opcional perquè les dreceres obren Kitty. `python-pipx` només cal si instal·les eines Python a nivell d'usuari. Oh My Posh, NVM i virtualenvwrapper són components separats; instal·la'ls només si els fas servir. Oh My Posh es pot instal·lar amb `curl -s https://ohmyposh.dev/install.sh | bash -s` (guia oficial: https://ohmyposh.dev/docs/installation/linux). Bash n'omet la inicialització si no hi és. Instal·la també els LSP, formatadors i eines de desenvolupament que els plugins de Neovim demanin.

## Pantalla gràfica d'inici de sessió

Si aquest Arch encara no té cap gestor d'inici de sessió, SDDM és una opció dels repositoris oficials i detecta les sessions Wayland instal·lades. Si ja en tens un, conserva aquell i no n'activis un segon:

```bash
sudo pacman -S --needed sddm
sudo systemctl enable --now sddm
```

A la pantalla d'entrada, selecciona **Hyprland**. Per iniciar la sessió des d'un terminal virtual, fes servir `start-hyprland` després d'iniciar sessió.

## Clonar i aplicar

Quan la branca `archlinux` sigui disponible a GitHub:

```bash
sudo pacman -S --needed chezmoi git
chezmoi init --branch archlinux https://github.com/soler1212/dotfiles.git
chezmoi diff
```

`chezmoi init` només prepara la font; el diff et deixa revisar els fitxers que s'escriuran. Després d'instal·lar els paquets requerits, aplica l'escriptori:

```bash
chezmoi apply ~/.config/hypr ~/.config/waybar ~/.config/mako ~/.config/fuzzel \
  ~/.local/bin/pm-moon ~/.local/bin/pm-power-menu ~/.local/bin/pm-wallpaper
```

La configuració d'escriptori Hyprland és l'única activa per defecte. `.chezmoiignore` manté `.bashrc`, Neovim, WezTerm i els temes d'Oh My Posh fora de qualsevol `chezmoi apply` fins que també es migrin explícitament a Arch.

Tanca la sessió gràfica i entra a Hyprland perquè arrenquin els serveis d'usuari. Els directoris gestionats contenen únicament la configuració nova; Sway, AGS i swaylock s'han retirat del repositori.

Abans d'aplicar, si ja tens personalitzacions als mateixos destins, revisa-les amb `chezmoi diff` i fusiona-les. Per actualitzar després que hagis fet `git push` de canvis a la branca:

```bash
chezmoi update
chezmoi diff
chezmoi apply
```

## Què s'inicia amb Hyprland

A `private_dot_config/hypr/hyprland.lua`, els toggles d'autostart estan activats. En entrar a la sessió es propaga l'entorn Wayland a D-Bus/systemd, i s'inicien Waybar amb la config/CSS del repositori, Hyprpaper amb l'últim wallpaper triat, Hypridle, Mako, l'applet de NetworkManager, Blueman, l'agent d'autenticació Hyprpolkitagent i dos watchers de cliphist. El paquet `polkit` proporciona el servei d'autorització del sistema que l'agent gràfic necessita. També s'aplica el tema GTK fosc i Papirus. Hypridle bloqueja la sessió abans de suspendre; no imposa un temporitzador de bloqueig ni de suspensió per inactivitat.

NetworkManager i Bluetooth són serveis de sistema i s'activen amb `systemctl` una vegada. PipeWire/WirePlumber i els portals són gestionats per systemd/D-Bus. No s'inicia AGS, swaybar, Sway IPC ni cap component de Nix.

## Dreceres principals

| Drecera | Acció |
| --- | --- |
| `Super + Return` | Kitty |
| `Super + D` | Launcher Fuzzel |
| `Super + Shift + B` | Firefox |
| `Super + Shift + F` | Thunar |
| `Super + Shift + Q` | Tanca finestra focalitzada |
| `Super + Shift + C` | Recarrega Hyprland |
| `Super + H/J/K/L` o fletxes | Mou el focus |
| `Super + Shift + H/J/K/L` o fletxes | Mou la finestra |
| `Super + R` | Mode resize; fletxes o HJKL, `Shift` per moviment fi, `Esc` per sortir |
| `Super + W` | Alterna grup de finestres (aproxima les pestanyes de Sway) |
| `Super + B` / `Super + V` | Preselecciona direcció del següent split |
| `Super + E` | Alterna layouts Dwindle i Master |
| `Super + 1..9/0` | Canvia als espais 1..10; també funciona amb teclat numèric |
| `Super + Shift + 1..9/0` | Mou finestra a l'espai; també teclat numèric |
| `Super + Ctrl + 1..9/0` | Mou finestra i segueix l'espai; també teclat numèric |
| `Super + Tab` / `Super + Shift + Tab` | Espai següent/anterior |
| `Super + M` / `Super + Shift + M` | Espai anterior / mou-hi la finestra |
| `Super + Shift + E` | Menú per bloquejar, suspendre, reiniciar o apagar; les dues últimes amb confirmació |
| `Super + L` | Manté el focus cap a la dreta; no és una drecera de logout ni bloqueig |
| `Super + Alt + W` | Canvia al següent wallpaper |
| `Super + Alt + Shift + W` | Tria wallpaper amb Fuzzel |
| `Print` | Captura de tots els monitors |
| `Super + Print`, després `S/A/W/Shift+A` | Captura pantalla/àrea/finestra/àrea al porta-retalls |
| `Super + Shift + S` | Selecciona una àrea i la copia |
| `Super + Shift + V` | Historial del porta-retalls |
| Tecles multimèdia/volum/brillantor | `playerctl`, `wpctl`, `brightnessctl` |

Dwindle/Master i els grups Hyprland no són idèntics als modes tabbed/stacking de Sway. Els selectors de perfil de monitor s'han deixat fora perquè depenien de noms i resolucions específics de les sortides. Mira `hyprctl monitors all` abans de crear-los per a la màquina concreta.

## Canvis respecte de Sway + AGS

- El panell lunar continua a Waybar; consulta wttr.in, cacheja la resposta una hora i mostra la informació al tooltip.
- El control MPRIS és a Waybar i permet play/pause, anterior i següent amb clics. El gran giny AGS amb caràtula no s'ha traslladat perquè Waybar ja resol els controls diaris.
- Els controls d'àudio es fan amb les tecles multimèdia i el clic a `Audio` obre `pavucontrol`.
- La xarxa i el Bluetooth es gestionen amb icones de Waybar i els applets de NetworkManager/Blueman. La finestra de connexions del sistema substitueix la llista AP/IP personalitzada d'AGS.
- El selector de wallpaper és Fuzzel + Hyprpaper i conserva l'últim fons a `~/.local/state/pm-dotfiles/`.
- El tema s'ha fixat en Catppuccin a Waybar/Mako i Adwaita-dark + Papirus a GTK; s'ha eliminat el selector de temes d'AGS.
- Sway, AGS, swaylock, scripts amb `swaymsg`, perfils de monitors no portables i restes Nix s'han tret. Les imatges de fons s'han mogut a Hyprland.
- `nvim-test` és una fixture de proves de Neovim i queda exclosa del desplegament de chezmoi.

## Resolució de problemes

- Errors de config: `hyprctl configerrors`.
- Sortides de pantalla: `hyprctl monitors all`.
- Barra: comprova que `waybar` i `ttf-jetbrains-mono` estiguin instal·lats i reinicia la sessió Hyprland després d'aplicar.
- Captura/compartició: comprova `xdg-desktop-portal-hyprland` i `xdg-desktop-portal-gtk`; no executis scripts de reinici de portal.
- Àudio: comprova `wpctl status`, PipeWire i WirePlumber.
- Bloqueig abans de suspendre: confirma que Hypridle està actiu i que `loginctl lock-session` inicia Hyprlock.
- Xarxa/Bluetooth: comprova `systemctl status NetworkManager bluetooth`.
- Neovim: els paquets d'LSP i formatadors s'han d'instal·lar segons els plugins habilitats.

La configuració s'ha revisat estàticament en Windows. Cal fer la primera validació d'execució a l'Arch real per confirmar la versió de Hyprland, paquets, pantalles i regles específiques d'aplicacions.
