# Instal·lar aplicacions a Arch Linux

Tria el mètode segons d'on vingui l'aplicació. Comença pels repositoris oficials; fes servir l'AUR si el paquet només hi és, i Flatpak si prefereixes la versió publicada a Flathub.

## 1. Repositoris oficials: `pacman`

És l'opció recomanada quan el paquet és als repositoris d'Arch. Els paquets són preparats i mantinguts per Arch Linux.

```bash
sudo pacman -S --needed nom-del-paquet
```

Per exemple:

```bash
sudo pacman -S --needed cliphist
```

Actualitza tot el sistema amb:

```bash
sudo pacman -Syu
```

Fes una actualització completa; no actualitzis només les bases de dades amb `pacman -Sy` i després instal·lis un paquet, perquè Arch no admet les actualitzacions parcials.

## 2. AUR: `yay`

L'AUR és un repositori comunitari de receptes per construir paquets que no són als repositoris oficials; Arch no revisa ni publica aquests paquets. `yay` simplifica la cerca, construcció i instal·lació. Revisa les receptes que presenta abans de confirmar.

Si encara no tens `yay`, instal·la'l una vegada així:

```bash
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

Executa `makepkg` sense `sudo`. Aquestes ordres construeixen i instal·len `yay`; després podràs instal·lar-hi aplicacions amb `yay -S`.

```bash
yay -Ss paraula
yay -S nom-del-paquet
```

Per exemple, Zen Browser s'instal·la amb:

```bash
yay -S zen-browser-bin
```

Actualitza els paquets oficials i els de l'AUR amb:

```bash
yay -Syu
```

## 3. Construir manualment un paquet de l'AUR: `makepkg`

Fes-ho si no tens un ajudant com `yay` o si vols revisar i construir una recepta manualment. Instal·la les eines necessàries, clona la recepta concreta i executa `makepkg` dins de la carpeta clonada:

```bash
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/nom-del-paquet.git
cd nom-del-paquet
less PKGBUILD
makepkg -si
```

Executa `makepkg` com a usuari normal, sense `sudo`. La recepta de la carpeta actual determina quin paquet es construirà: per exemple, `makepkg -si` dins de `~/yay` instal·la `yay`, no Zen. Després d'instal·lar el paquet, pots esborrar la carpeta clonada.

## 4. Flatpak: Flathub

Flatpak va bé quan vols la versió distribuïda per l'aplicació a Flathub o quan no trobes un paquet adequat als repositoris ni a l'AUR. Les aplicacions s'actualitzen amb Flatpak, separadament de `pacman` i `yay`.

Instal·la Flatpak i afegeix Flathub una sola vegada:

```bash
sudo pacman -S --needed flatpak
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Després instal·la l'aplicació pel seu ID de Flathub. Per exemple, Zen Browser:

```bash
flatpak install flathub app.zen_browser.zen
```

Actualitza les aplicacions Flatpak amb:

```bash
flatpak update
```

## 5. AppImage

Fes-la servir si el projecte ofereix oficialment una AppImage i no hi ha una opció millor per a tu. Descarrega-la del lloc oficial, dona-li permís d'execució i obre-la:

```bash
chmod +x aplicacio.AppImage
./aplicacio.AppImage
```

Les AppImage normalment no es gestionen amb `pacman` ni `yay`; comprova al lloc del projecte com s'actualitzen.

## Quin mètode trio?

- **`pacman`**: primera opció per als paquets dels repositoris oficials.
- **`yay`**: per a paquets de l'AUR, com Zen Browser instal·lat amb `zen-browser-bin`, i per actualitzar oficials i AUR junts.
- **Flatpak**: quan vols la versió de Flathub o l'aplicació no és fàcil de trobar empaquetada per Arch.
- **AppImage**: quan el mateix projecte la distribueix i vols una aplicació portable.
- **`makepkg` manual**: només si no fas servir `yay` o vols construir directament una recepta de l'AUR.

Més informació: [ArchWiki: pacman](https://wiki.archlinux.org/title/Pacman), [ArchWiki: AUR](https://wiki.archlinux.org/title/Arch_User_Repository), [guia oficial de yay](https://github.com/Jguer/yay#installation), [guia de Flatpak](https://flatpak.org/setup/Arch) i [instal·lació de Zen per a Linux](https://docs.zen-browser.app/guides/install-linux).
