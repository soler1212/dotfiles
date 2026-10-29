# Perfil de la instal·lació d'Arch existent

Aquesta pàgina recull el perfil que consta al registre de la instal·lació perquè les instruccions dels dotfiles no et facin repetir passos ni donar per fet coses que encara s'han de comprovar. El registre barreja ordres proposades, exemples de sortida i passos descrits com a completats; les dades que no tenen una sortida real associada s'indiquen com a pendents de verificació.

## Instal·lació base registrada

El relat acaba indicant que Arch arrenca des del SSD amb Btrfs i `systemd-boot`. El disseny descrit és UEFI amb taula GPT, una partició EFI FAT32 d'1 GiB muntada a `/boot` i la resta d'un NVMe d'uns 238 GiB en Btrfs. També especifica els subvolums `@`, `@home`, `@snapshots`, `@log` i `@cache`, amb `noatime` i compressió `zstd:3`. La sortida real de `findmnt` no forma part del text; comprova el muntatge actual abans de fer canvis.

Les ordres del registre configuren `Europe/Madrid`, `en_US.UTF-8` com a idioma principal, `ca_ES.UTF-8` com a idioma addicional i `es` com a teclat de consola. NetworkManager apareix marcat com a fet i habilitat, tot i que no hi ha una sortida de servei adjunta. El microcodi depèn del processador; el registre no confirma si és Intel o AMD.

Abans de seguir qualsevol pas de particionament o de Snapper, comprova el que hi ha realment muntat:

```bash
findmnt -no SOURCE,FSTYPE,OPTIONS / /home /.snapshots /var/log /var/cache /boot
```

No tornis a executar ordres de particionament o formatatge sobre aquesta instal·lació. Les dades del disc i els subvolums d'aquesta secció serveixen per identificar el sistema existent.

## Memòria, zram i snapshots

El registre esmenta primer 8 GB de RAM i més endavant 6 GB. No fixis la mida de zram a partir d'aquestes notes; comprova la memòria real i el dispositiu actiu:

```bash
free -h
swapon --show
zramctl
```

També hi apareix la instal·lació de `zram-generator` amb una mida proposada de la meitat de la RAM i compressió zstd. La sortida de `/dev/zram0` que hi surt està introduïda com a exemple del que s'hauria de veure, no com una comprovació concloent.

El text inclou una ordre per instal·lar Snapper, però acaba demanant que es comprovi `/.snapshots` abans de crear la configuració i activar els temporitzadors. No hi ha una sortida que confirmi que la configuració o els temporitzadors s'hagin completat. Per tant, no donis per fet que Snapper crea snapshots automàtics. Comprova-ho sense modificar el layout:

```bash
pacman -Q snapper
sudo snapper list-configs
systemctl is-enabled snapper-timeline.timer snapper-cleanup.timer
```

No executis `snapper create-config` ni eliminis cap subvolum fins a confirmar com està muntat `/.snapshots`.

## Paquets i serveis d'escriptori

El registre marca Hyprland, Kitty i NetworkManager com a instal·lats; altres paquets com Waybar, Mako, Fuzzel, Thunar, Hyprpaper, Hyprlock, Hypridle, portals i PipeWire apareixen en ordres posteriors d'instal·lació. També consta la selecció de `pipewire-jack` quan pacman va demanar el proveïdor JACK. Com que no hi ha un inventari final complet, comprova els paquets abans d'instal·lar-ne cap:

```bash
pacman -Q hyprland kitty networkmanager waybar mako fuzzel thunar \
  gvfs tumbler thunar-volman udisks2 udiskie hyprpaper hyprlock hypridle \
  xdg-desktop-portal-hyprland pipewire wireplumber pipewire-jack \
  noto-fonts-emoji qt5-wayland qt6-wayland zram-generator \
  polkit-kde-agent hyprpolkitagent snapper
```

Per a Thunar, el registre també inclou `gvfs`, `tumbler`, `thunar-volman`, `udisks2` i `udiskie`. Els dotfiles actuals inicien `udiskie --tray` amb la sessió perquè els dispositius extraïbles quedin accessibles des de la safata.

El registre també conté ordres d'instal·lació per a eines generals com `base-devel`, `curl`, `wget`, `htop`, `fastfetch` i `pciutils`, i per a les capes `qt5-wayland`/`qt6-wayland`. Són paquets que poden continuar instal·lats, però no són dependències de les dreceres ni de l'autostart d'aquests dotfiles.

La configuració anterior feia servir `polkit-kde-agent` i `plasma-polkit-agent.service`. La configuració actual d'Hyprland fa servir `hyprpolkitagent`; mantén un sol agent actiu. Si l'antic servei KDE continua corrent després de canviar de configuració, atura'l:

```bash
systemctl --user stop plasma-polkit-agent.service
```

NetworkManager i Bluetooth són serveis de sistema; PipeWire, WirePlumber, els portals i els applets gràfics s'executen en l'àmbit de la sessió d'usuari.

## Hypridle

La configuració d'inactivitat del registre és:

| Temps sense activitat | Acció |
| --- | --- |
| 5 minuts | Bloquejar amb `loginctl lock-session` |
| 15 minuts | Apagar les pantalles; tornar-les a encendre en reprendre l'activitat |
| 30 minuts | Suspendre amb `systemctl suspend` |

També bloqueja abans de qualsevol suspensió manual i torna a encendre les pantalles després de reprendre. El fitxer de chezmoi `private_dot_config/hypr/hypridle.conf` ara reflecteix aquests temps, i `hyprland.lua` inicia Hypridle automàticament. Després d'aplicar els dotfiles, surt i torna a entrar a Hyprland perquè l'autostart utilitzi la configuració actual.

Comprova el procés i, si hi ha cap dubte, revisa el fitxer aplicat:

```bash
pgrep -a hypridle
cat ~/.config/hypr/hypridle.conf
```

## Inici de sessió i maquinari pendents de confirmar

El registre proposava provar Hyprland des d'un TTY abans d'instal·lar SDDM. No hi ha confirmació clara d'un gestor gràfic instal·lat. Comprova l'estat actual amb `systemctl status display-manager`; si no n'hi ha cap, pots continuar iniciant amb `start-hyprland`.

El model de GPU i el processador no apareixen confirmats al text. No instal·lis controladors específics ni triïs microcodi basant-te en les opcions d'exemple; consulta `lspci -k | grep -A 4 -E 'VGA|3D|Display'` i `lscpu` a l'Arch real.

Per a la seqüència de chezmoi, les dreceres i la primera sessió, segueix el [manual de configuració pas a pas](setup-archlinux-hyprland.md).
