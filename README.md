# Dotfiles: Arch Linux + Hyprland

Repositori personal gestionat amb [chezmoi](https://www.chezmoi.io/), adaptat perquè Arch Linux + Hyprland sigui l'entorn principal. La configuració anterior de Sway, AGS i swaylock s'ha retirat; les parts útils s'han traslladat a Hyprland, Waybar, Mako i eines natives de Wayland.

<!-- Hyprland, Waybar, Neovim, Bash, launcher, notification, wallpaper, and helper configuration tracked by chezmoi -->

- Hyprland: `private_dot_config/hypr/` (configuració Lua, Hyprlock, Hyprpaper i galeria de fons).
- Fuzzel: launcher i menús d'energia/clipboard/fons amb colors Catppuccin.
- Waybar: `private_dot_config/waybar/`, amb estil Catppuccin, fase lunar, MPRIS i safata.
- Mako: notificacions amb estil Catppuccin.
- Neovim: configuració Lua i plugins; consulta la [guia per instal·lar-la](docs/neovim.md).
- Bash: historial ampliat, cerca amb fletxes, integració opcional amb FZF/Zoxide i l'ordre `update`.
- Eines: `pm-moon`, `pm-power-menu`, `pm-screenshot-menu` i `pm-wallpaper` a `~/.local/bin`.
- Paquets, instal·lació inicial i mapa de dreceres: [guia Arch + Hyprland](docs/archlinux-hyprland.md).

Neovim també està gestionat per chezmoi; consulta la [guia d'instal·lació de Neovim](docs/neovim.md) per instal·lar les seves dependències i aplicar-lo. Oh My Posh i WezTerm continuen exclosos de l'aplicació. Bash recupera la cerca de l'historial, les integracions opcionals de FZF i Zoxide, àlies per a Eza/Bat quan són instal·lats i l'ordre `update`, que actualitza els paquets oficials i els de l'AUR amb `yay` (o només els oficials amb `pacman` si `yay` no està instal·lat). `.chezmoiignore` exclou `README.md`, `docs/` i la fixture `nvim-test` perquè no es copiïn a la carpeta personal. Kitty continua sent el terminal de les dreceres.

## Instal·lació a l'Arch

Per instal·lar altres aplicacions amb `pacman`, `yay`/AUR, Flatpak o AppImage, consulta el [manual d'instal·lació de paquets](docs/installar-paquets-arch.md).

Després que publiquis la branca `archlinux`, instal·la chezmoi i clona-la així:

```bash
sudo pacman -S --needed chezmoi git
chezmoi init --branch archlinux https://github.com/soler1212/dotfiles.git
```

Instal·la les dependències d'escriptori descrites a la guia i revisa els canvis que chezmoi proposa:

```bash
chezmoi diff
```

Aplica la configuració i els scripts d'escriptori:

```bash
chezmoi apply ~/.config/hypr ~/.config/waybar ~/.config/mako ~/.config/fuzzel \
  ~/.bashrc ~/.local/bin/pm-moon ~/.local/bin/pm-power-menu ~/.local/bin/pm-screenshot-menu ~/.local/bin/pm-wallpaper
```

Després, tria Hyprland al gestor gràfic d'inici de sessió (la guia explica SDDM si encara no en tens cap) i entra. Waybar, Hypridle, notificacions, paper de paret, safates de xarxa/Bluetooth i historial del porta-retalls s'inicien amb la sessió. En suspendre, Hypridle bloqueja la pantalla abans que l'ordinador dormi. Els dimonis de PipeWire, NetworkManager i Bluetooth s'han d'activar com indica la guia.

Si chezmoi mostra conflictes, no sobreescriguis cegament els teus fitxers locals: mira `chezmoi diff` i resol-los abans d'aplicar. Per actualitzar més endavant, baixa primer els canvis amb `chezmoi git pull -- --autostash --rebase origin archlinux`, revisa `chezmoi diff` i aplica només els camins d'escriptori amb l'ordre de dalt. `chezmoi update` aplica els canvis automàticament.

## Dreceres noves d'escriptori

- `Super + Shift + E`: menú gràfic per bloquejar, suspendre, reiniciar o apagar. Reiniciar i apagar demanen confirmació; no hi ha opció de logout.
- `Super + L`: manté el focus cap a la dreta; no bloqueja ni tanca la sessió.
- `Super + Alt + W`: següent fons de pantalla.
- `Super + Alt + Shift + W`: selector de fons amb Fuzzel.
- `Super + Shift + C`: recarrega la configuració Hyprland.

La resta de dreceres i equivalències respecte de Sway són a la [guia](docs/archlinux-hyprland.md).
