# Configurar Arch Linux amb Hyprland

Aquesta guia instal·la els paquets que fan servir aquests dotfiles, prepara chezmoi sense modificar encara els fitxers personals, aplica només l'escriptori Hyprland i explica com iniciar sessió i actualitzar la configuració després. Cal que la branca `archlinux` ja estigui publicada al repositori abans de començar.

Si Arch ja està instal·lat, no repeteixis el particionament, el formatatge ni la instal·lació del sistema base. Segueix el [perfil de la instal·lació existent](arch-installation-profile.md) i comença per comprovar els paquets i serveis.

Per instal·lar programes més endavant, consulta el [manual curt de paquets per a Arch](installar-paquets-arch.md), que explica `pacman`, `yay`/AUR, Flatpak i AppImage.

## 1. Actualitzar Arch

Entra amb el teu usuari habitual, que ha de tenir permisos `sudo`, i actualitza el sistema:

```bash
sudo pacman -Syu
```

Si s'actualitza el kernel o components gràfics, reinicia abans de continuar.

## 2. Instal·lar l'escriptori i les eines

Instal·la els paquets necessaris per a les dreceres, la barra, les captures, l'àudio, la xarxa, el Bluetooth i els portals:

```bash
sudo pacman -S --needed \
  chezmoi git \
  hyprland xorg-xwayland hyprpaper hyprlock hypridle polkit hyprpolkitagent \
  waybar mako fuzzel kitty firefox thunar thunar-volman gvfs tumbler \
  udisks2 udiskie xdg-user-dirs \
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

`xorg-xwayland` és per a les aplicacions gràfiques que encara necessiten X11. `noto-fonts-emoji` proporciona les icones emoji que mostra el mòdul lunar de Waybar. `obs-studio` és opcional i només cal si vols enregistrar o transmetre pantalla:

```bash
sudo pacman -S --needed obs-studio
```

Activa els serveis de xarxa i Bluetooth una sola vegada:

```bash
sudo systemctl enable --now NetworkManager bluetooth
```

PipeWire i WirePlumber normalment s'inicien automàticament. Si no hi ha àudio després d'entrar a la sessió, activa'ls com a usuari:

```bash
systemctl --user enable --now pipewire.socket pipewire-pulse.socket wireplumber.service
```

Pacman utilitza `--needed`, així que els paquets que ja tens instal·lats no es tornen a instal·lar.

Neovim i les eines per als seus plugins no formen part de l'escriptori actiu en aquesta branca. Si també vols preparar aquest entorn de desenvolupament, consulta la [guia de Neovim](neovim.md) i instal·la `neovim`, `ripgrep`, `fd`, `nodejs` i `npm` segons les necessitats dels plugins.

El paquet antic `polkit-kde-agent` pot continuar instal·lat. Aquesta configuració utilitza `hyprpolkitagent`; si `plasma-polkit-agent.service` continua actiu després d'aplicar-la, atura aquell agent abans de tornar a entrar a Hyprland per evitar dos agents d'autenticació alhora:

```bash
systemctl --user stop plasma-polkit-agent.service
```

## 3. Preparar i revisar chezmoi

Clona la branca sense aplicar-la encara. L'URL HTTPS permet descarregar el repositori públic sense configurar una clau SSH:

```bash
chezmoi init --branch archlinux https://github.com/soler1212/dotfiles.git
```

Si ja havies inicialitzat aquest repositori amb chezmoi, no tornis a executar `init`; passa a la secció d'actualització al final d'aquesta guia.

Si prefereixes SSH, configura abans l'autenticació de GitHub amb la clau autoritzada per a aquest repositori i comprova amb `ssh -T git@github.com` que GitHub identifica el compte correcte. Després pots substituir l'URL HTTPS per `git@github.com:soler1212/dotfiles.git` a l'ordre d'inicialització.

Revisa els canvis que chezmoi proposa:

```bash
chezmoi diff
```

La configuració deixa fora Neovim, WezTerm i Oh My Posh. El `.bashrc` d'aquesta branca només afegeix l'ordre `update` per actualitzar Arch. Si ja tens fitxers propis als camins Hyprland, Waybar, Mako, Fuzzel o `.bashrc`, desa'n una còpia abans d'aplicar; el diff t'ensenyarà què es modificarà.

## 4. Aplicar només la configuració de l'escriptori

Aplica els camins de Hyprland i les utilitats que aquesta sessió necessita:

```bash
chezmoi apply ~/.config/hypr ~/.config/waybar ~/.config/mako ~/.config/fuzzel \
  ~/.bashrc ~/.local/bin/pm-moon ~/.local/bin/pm-power-menu ~/.local/bin/pm-screenshot-menu ~/.local/bin/pm-wallpaper
```

No facis un `chezmoi apply` sense camins durant la configuració inicial: aquesta branca manté la resta de dotfiles fora de l'aplicació per defecte i aquí volem activar l'escriptori i l'ordre mínima `update` de Bash.

## 5. Configurar la pantalla d'inici de sessió

Si ja tens GDM, SDDM o un altre gestor gràfic, conserva'l i selecciona **Hyprland** a la pantalla d'entrada.

Si no tens cap gestor gràfic, pots instal·lar SDDM:

```bash
sudo pacman -S --needed sddm
sudo systemctl enable --now sddm
```

També pots iniciar Hyprland des d'un terminal virtual: inicia sessió amb el teu usuari i executa `start-hyprland`.

## 6. Comprovar el primer inici

Entra a Hyprland. Waybar, Hyprpaper, Hypridle, Mako, els applets de xarxa i Bluetooth, l'agent Polkit i l'historial del porta-retalls s'inicien amb la sessió. No cal executar Waybar manualment.

Hypridle segueix els temps del teu perfil: bloqueja al cap de 5 minuts, apaga les pantalles als 15 i suspèn als 30. Si encara tens actiu l'antic agent KDE, atura'l amb `systemctl --user stop plasma-polkit-agent.service`; aquesta configuració inicia `hyprpolkitagent`.

Comprova l'estat inicial amb:

```bash
hyprctl configerrors
hyprctl monitors all
pgrep -a waybar
pgrep -a hypridle
wpctl status
systemctl --user --failed
```

La configuració està escrita per a Hyprland 0.55 o posterior. Si `hyprctl configerrors` mostra errors de sintaxi o opcions desconegudes, actualitza Arch amb `sudo pacman -Syu` i torna a iniciar la sessió.

Les dreceres d'ús habitual són `Super + D` per obrir Fuzzel, `Super + Return` per a Kitty, `Super + Shift + E` per al menú d'energia, `Super + Shift + C` per recarregar Hyprland, `Super + Print` per a les captures i `Super + Shift + N` per alternar No molestar. La llista completa és a [la guia d'Arch Linux + Hyprland](archlinux-hyprland.md).

## 7. Actualitzar més endavant

`chezmoi update` baixa canvis i els aplica immediatament per defecte ([manual oficial](https://www.chezmoi.io/reference/commands/update/)). Per revisar primer què ha canviat, actualitza només la font, inspecciona el diff i aplica després els mateixos camins explícits:

```bash
chezmoi git status -- --short --branch
chezmoi git pull -- --autostash --rebase origin archlinux
chezmoi diff
chezmoi apply ~/.config/hypr ~/.config/waybar ~/.config/mako ~/.config/fuzzel \
  ~/.bashrc ~/.local/bin/pm-moon ~/.local/bin/pm-power-menu ~/.local/bin/pm-screenshot-menu ~/.local/bin/pm-wallpaper
```

Si no vols aplicar una actualització, atura't després de `chezmoi diff`. `chezmoi apply` no publica ni puja canvis a GitHub.

## 8. Problemes habituals

- **Waybar no apareix:** comprova si s'ha iniciat amb `pgrep -a waybar`, si és instal·lat amb `command -v waybar` i si existeixen els fitxers amb `ls -l ~/.config/waybar/config ~/.config/waybar/style.css`. Si el procés no hi és, executa `waybar --log-level debug --config ~/.config/waybar/config --style ~/.config/waybar/style.css` des d'un terminal per veure l'error d'arrencada. Després de corregir-lo, tanca la sessió Hyprland i torna-hi a entrar.
- **Falta la icona de xarxa o Bluetooth:** comprova els serveis amb `systemctl status NetworkManager bluetooth`, els processos amb `pgrep -a nm-applet` i `pgrep -a blueman-applet`, i que Waybar tingui activat el mòdul `tray` amb `grep -n '"tray"' ~/.config/waybar/config`. La safata és necessària perquè les icones dels applets apareguin a la barra.
- **Àudio no funciona:** comprova `wpctl status` i, si cal, activa les unitats PipeWire del pas 2.
- **Hypridle no s'inicia:** comprova `pgrep -a hypridle` i revisa `~/.config/hypr/hypridle.conf`.
- **Compartició de pantalla no mostra cap selector:** comprova `systemctl --user status xdg-desktop-portal xdg-desktop-portal-hyprland xdg-desktop-portal-gtk` i els registres amb `journalctl --user -b -u xdg-desktop-portal -u xdg-desktop-portal-hyprland -u xdg-desktop-portal-gtk`. Els portals s'activen sota demanda; no cal matar ni reiniciar manualment els backends.
- **Wallpaper no canvia:** `hyprctl hyprpaper listactive` mostra el fons actiu i el script t'avisa si Hyprpaper no respon.

Per a més detalls de dreceres, paquets opcionals i funcions migrades des de Sway i AGS, consulta [la guia d'Arch Linux + Hyprland](archlinux-hyprland.md).
