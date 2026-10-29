# Arch Linux + Hyprland

Guia d'instal·lació i operació per a aquesta branca de chezmoi. La configuració assumeix Arch Linux, sessió Wayland amb Hyprland, teclat espanyol i touchpad amb toc per clicar, arrossegament amb bloqueig i emulació del botó central. El mòdul lunar necessita Python. Els serveis d'escriptori s'activen automàticament a la sessió.

## Paquets necessaris

Instal·la els components que cobreixen les dreceres, barra, bloqueig, notificacions, wallpaper, captura, àudio, xarxa i Bluetooth:

```bash
sudo pacman -S --needed \
  hyprland xorg-xwayland hyprpaper hyprlock hypridle polkit hyprpolkitagent \
  waybar mako fuzzel kitty firefox thunar thunar-volman gvfs tumbler \
  udisks2 udiskie xdg-user-dirs git \
  grim slurp wl-clipboard cliphist jq \
  pipewire pipewire-audio pipewire-alsa pipewire-pulse pipewire-jack wireplumber \
  networkmanager network-manager-applet nm-connection-editor \
  bluez bluez-utils blueman \
  pavucontrol playerctl brightnessctl \
  xdg-desktop-portal xdg-desktop-portal-hyprland xdg-desktop-portal-gtk \
  dconf gsettings-desktop-schemas adwaita-gtk-theme adwaita-cursors papirus-icon-theme \
  python glib2 libnotify noto-fonts noto-fonts-emoji \
  ttf-jetbrains-mono ttf-nerd-fonts-symbols
```

Per posar en marxa xarxa i Bluetooth una sola vegada:

```bash
sudo systemctl enable --now NetworkManager bluetooth
```

Activa les unitats d'àudio d'usuari si no arrenquen automàticament: `systemctl --user enable --now pipewire.socket pipewire-pulse.socket wireplumber.service`. Els portals s'activen via D-Bus; no cal cap script que els mati o reiniciï.

Si uses un gestor d'inici de sessió, tria la sessió Hyprland. Per iniciar-la des d'un TTY, executa `start-hyprland` després d'entrar; és el wrapper recomanat, amb recuperació d'errors i mode segur. La configuració utilitza Hyprland 0.55+ perquè està escrita amb la seva API Lua nativa. Si el paquet estable de la teva màquina encara és anterior, actualitza Arch abans d'aplicar-la.

`xorg-xwayland` permet executar aplicacions gràfiques antigues que encara necessiten X11 dins la sessió Wayland.
`noto-fonts-emoji` proporciona les icones emoji que mostra el mòdul lunar de Waybar.
`dconf` permet que les preferències GTK establertes amb `gsettings` es desin entre sessions.

### Components opcionals segons ús

```bash
sudo pacman -S --needed \
  base-devel curl wget htop fastfetch pciutils \
  qt5-wayland qt6-wayland neovim ripgrep fd nodejs npm \
  bat fzf zoxide eza wezterm obs-studio
```

Aquests paquets són opcionals: `base-devel`, `curl`, `wget`, `htop`, `fastfetch` i `pciutils` són eines de construcció i diagnòstic; `qt5-wayland` i `qt6-wayland` són per a aplicacions Qt; `neovim`, `ripgrep`, `fd`, `nodejs` i `npm` són per a l'entorn de desenvolupament i Neovim, que encara està exclòs de l'aplicació de chezmoi; `bat`, `fzf`, `zoxide` i `eza` són eines de terminal; `wezterm` és opcional perquè les dreceres obren Kitty; `obs-studio` només cal si vols enregistrar o transmetre pantalla. `python-pipx` només cal si instal·les eines Python a nivell d'usuari. Oh My Posh, NVM i virtualenvwrapper són components separats; instal·la'ls només si els fas servir. Oh My Posh es pot instal·lar amb `curl -s https://ohmyposh.dev/install.sh | bash -s` (guia oficial: https://ohmyposh.dev/docs/installation/linux). Bash n'omet la inicialització si no hi és. Instal·la també els LSP, formatadors i eines de desenvolupament que els plugins de Neovim demanin.

## Pantalla gràfica d'inici de sessió

Si aquest Arch encara no té cap gestor d'inici de sessió, SDDM és una opció dels repositoris oficials i detecta les sessions Wayland instal·lades. Si ja en tens un, conserva aquell i no n'activis un segon:

```bash
sudo pacman -S --needed sddm
sudo systemctl enable --now sddm
```

A la pantalla d'entrada, selecciona **Hyprland**. Per iniciar la sessió des d'un terminal virtual, fes servir `start-hyprland` després d'iniciar sessió.

## Clonar i aplicar

Per a una instal·lació des de zero, segueix el [manual pas a pas](setup-archlinux-hyprland.md).

Per al perfil existent de l'ordinador, inclosa la disposició Btrfs, els paquets i els temps d'Hypridle, consulta el [resum de la instal·lació d'Arch](arch-installation-profile.md).

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

La configuració d'escriptori Hyprland és l'única activa per defecte. `.chezmoiignore` també exclou `README.md`, `docs/`, `.bashrc`, Neovim, WezTerm, els temes d'Oh My Posh i `nvim-test` perquè no acabin a la carpeta personal en una aplicació general.

Tanca la sessió gràfica i entra a Hyprland perquè arrenquin els serveis d'usuari. Els directoris gestionats contenen únicament la configuració nova; Sway, AGS i swaylock s'han retirat del repositori.

Abans d'aplicar, si ja tens personalitzacions als mateixos destins, revisa-les amb `chezmoi diff` i fusiona-les. Per actualitzar i revisar els canvis abans d'aplicar-los:

```bash
chezmoi git pull -- --autostash --rebase origin archlinux
chezmoi diff
chezmoi apply ~/.config/hypr ~/.config/waybar ~/.config/mako ~/.config/fuzzel \
  ~/.local/bin/pm-moon ~/.local/bin/pm-power-menu ~/.local/bin/pm-wallpaper
```

`chezmoi update` aplica automàticament després de baixar els canvis; consulta el manual per revisar primer i aplicar només els camins d'escriptori.

## Què s'inicia amb Hyprland

A `private_dot_config/hypr/hyprland.lua`, els toggles d'autostart estan activats. En entrar a la sessió es propaga l'entorn Wayland a D-Bus/systemd, i s'inicien Waybar amb la config/CSS del repositori, Hyprpaper amb l'últim wallpaper triat, Hypridle, Mako, l'applet de NetworkManager, Blueman, udiskie per als discos extraïbles, l'agent d'autenticació Hyprpolkitagent i dos watchers de cliphist. El paquet `polkit` proporciona el servei d'autorització del sistema que l'agent gràfic necessita. També s'aplica el tema GTK fosc i Papirus. Hypridle bloqueja als 5 minuts, apaga les pantalles als 15 minuts i suspèn als 30 minuts d'inactivitat; també bloqueja abans d'una suspensió manual.

NetworkManager i Bluetooth són serveis de sistema i s'activen amb `systemctl` una vegada. PipeWire/WirePlumber i els portals són gestionats per systemd/D-Bus. No s'inicia AGS, swaybar, Sway IPC ni cap component de Nix.

## Dreceres principals

| Drecera | Acció |
| --- | --- |
| `Super + Return` | Kitty |
| `Super + D` | Launcher Fuzzel |
| `Super + Shift + D` | Fuzzel amb accions addicionals de les aplicacions, com ara obrir una finestra nova |
| `Super + Shift + Return` | Obre Kitty com a finestra flotant centrada |
| `Super + Shift + B` | Firefox |
| `Super + Shift + F` | Thunar |
| `Super + C` | Centra la finestra flotant |
| `Super + Shift + Space` | Alterna la finestra entre flotant i en mosaic |
| `Super + Space` | Canvia el focus entre finestres flotants i en mosaic |
| `Super + F` | Alterna pantalla completa |
| `Super + Shift + Q` | Tanca finestra focalitzada |
| `Super + Shift + C` | Recarrega Hyprland |
| `Super + Shift + I` | Mostra la classe i el títol de la finestra activa |
| `Super + N` | Torna a mostrar la notificació recent que ja havia desaparegut |
| `Super + Shift + N` | Activa/desactiva el mode No molestar de Mako; Waybar mostra `DND` quan és actiu i també permet alternar-lo amb clic |
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
| `Super + Ctrl + Shift + fletxa` | Mou l'espai actual al monitor en aquella direcció |
| `Super + Shift + F7` / `Super + Shift + F8` | Mou l'espai actual al monitor de l'esquerra / dreta |
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

Les dreceres Sway `Super + A` / `Super + Shift + A` per enfocar el pare/fill de l'arbre no tenen un equivalent directe en Hyprland; no les he reassignat a una acció diferent. `Super + Shift + R` reiniciava Sway; Hyprland recarrega la configuració en desar-la (`Super + Shift + C` també ho força), i per reiniciar el compositor cal sortir de la sessió i tornar-hi a entrar.

## Canvis respecte de Sway + AGS

- El panell lunar continua a Waybar; consulta wttr.in, cacheja la resposta una hora i mostra la informació al tooltip.
- El control MPRIS és a Waybar i permet play/pause, anterior i següent amb clics. El gran giny AGS amb caràtula no s'ha traslladat perquè Waybar ja resol els controls diaris.
- Els controls d'àudio es fan amb les tecles multimèdia i el clic a `Audio` obre `pavucontrol`.
- La xarxa i el Bluetooth es gestionen des de Waybar i els applets de NetworkManager/Blueman. Waybar mostra SSID, intensitat i IP; el clic obre l'editor de connexions o el gestor Bluetooth, i el menú de l'applet de xarxa conserva la selecció de punts d'accés.
- El selector de wallpaper és Fuzzel + Hyprpaper i conserva l'últim fons a `~/.local/state/pm-dotfiles/`; si la imatge guardada ja no hi és, restaura el fons inclòs al repositori.
- Les videotrucades i les aplicacions de captura comparteixen pantalla a través de PipeWire i `xdg-desktop-portal-hyprland`; el portal GTK cobreix altres diàlegs com el selector de fitxers.
- El tema s'ha fixat en Catppuccin a Waybar/Mako i Adwaita-dark + Papirus a GTK; s'ha eliminat el selector de temes d'AGS.
- Sway, AGS, swaylock, scripts amb `swaymsg`, perfils de monitors no portables i restes Nix s'han tret. Les imatges de fons s'han mogut a Hyprland.
- `nvim-test` és una fixture de proves de Neovim i queda exclosa del desplegament de chezmoi.

## Resolució de problemes

- Errors de config: `hyprctl configerrors`.
- Sortides de pantalla: `hyprctl monitors all`.
- Barra: comprova que `waybar` i `ttf-jetbrains-mono` estiguin instal·lats i reinicia la sessió Hyprland després d'aplicar.
- Compartir pantalla: obre el selector de pantalla dins la videotrucada o aplicació. Hauria d'aparèixer el selector de Hyprland, amb opcions per compartir monitor, finestra o regió segons l'aplicació. Per provar l'enregistrament amb OBS, selecciona una font de captura de pantalla/portal.
- Si no apareix el selector, comprova que la sessió és Wayland i que systemd d'usuari ha rebut les variables gràfiques: `echo "$XDG_SESSION_TYPE $WAYLAND_DISPLAY $XDG_CURRENT_DESKTOP"` i `systemctl --user show-environment | grep -E '^(WAYLAND_DISPLAY|XDG_CURRENT_DESKTOP|XDG_SESSION_TYPE)='`. Aquí Hyprland les publica en iniciar-se.
- Comprova els serveis i els registres després d'intentar compartir: `systemctl --user status xdg-desktop-portal xdg-desktop-portal-hyprland xdg-desktop-portal-gtk` i `journalctl --user -b -u xdg-desktop-portal -u xdg-desktop-portal-hyprland -u xdg-desktop-portal-gtk`. També comprova PipeWire amb `wpctl status`.
- El portal s'activa sota demanda per D-Bus; no cal habilitar-lo manualment ni matar altres backends. Si queda penjat, tanca primer la videotrucada i torna a entrar a Hyprland. Consulta els registres abans de canviar configuració de systemd o reinstal·lar paquets.
- Àudio: comprova `wpctl status`, PipeWire i WirePlumber.
- Notificacions: Mako s'inicia amb la sessió; `Super + N` o `makoctl restore` recupera l'última notificació caducada. `makoctl mode` mostra els modes actius i `makoctl mode -t do-not-disturb` alterna No molestar.
- Bloqueig abans de suspendre: confirma que Hypridle està actiu i que `loginctl lock-session` inicia Hyprlock.
- Xarxa/Bluetooth: comprova `systemctl status NetworkManager bluetooth`.
- Wallpaper: `hyprctl hyprpaper listactive` comprova el fons actual; si no respon, revisa que Hyprpaper estigui actiu a la sessió.
- Neovim: els paquets d'LSP i formatadors s'han d'instal·lar segons els plugins habilitats.

La configuració s'ha revisat estàticament en Windows. Cal fer la primera validació d'execució a l'Arch real per confirmar la versió de Hyprland, paquets, pantalles i regles específiques d'aplicacions.
