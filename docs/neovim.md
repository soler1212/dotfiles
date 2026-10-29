# Instal·lar i preparar Neovim

Aquesta guia instal·la la configuració de Neovim que hi ha al repositori, amb Lazy.nvim, LSP, Treesitter, Telescope, Neo-tree, sessions i integració Git. La configuració s'aplica només a `~/.config/nvim`; no activa Oh My Posh ni WezTerm.

## 1. Instal·lar Neovim i les eines

Instal·la Neovim i les eines que necessiten els cercadors, els servidors de llenguatge i els parsers de Treesitter:

<!-- Arch Linux packages required by the Neovim configuration -->
```bash
sudo pacman -S --needed neovim git curl unzip tar tree-sitter-cli base-devel ripgrep fd nodejs npm python wl-clipboard
```

- `git`, `curl`, `unzip` i `tar` permeten a Lazy.nvim i Mason descarregar plugins i eines.
- `nodejs`, `npm` i `python` són necessaris per a diversos servidors LSP instal·lats amb Mason.
- `tree-sitter-cli` i `base-devel` permeten descarregar i compilar els parsers de Treesitter.
- `ripgrep` i `fd` alimenten les cerques de Telescope; `wl-clipboard` connecta el porta-retalls de Neovim amb Wayland.

La configuració actual utilitza Neovim 0.12 i la branca nova de nvim-treesitter, que requereix Tree-sitter CLI i un compilador C. [Requisits de nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter#requirements) · [Paquet Neovim d'Arch](https://archlinux.org/packages/extra/x86_64/neovim/)

## 2. Revisar i aplicar la configuració

Si ja tens una configuració a `~/.config/nvim`, revisa què canviaria chezmoi abans d'aplicar res:

```bash
chezmoi diff ~/.config/nvim
```

Si vols utilitzar la configuració d'aquest repositori, aplica-la:

```bash
chezmoi apply ~/.config/nvim
```

## 3. Primera arrencada

Obre Neovim:

```bash
nvim
```

La primera arrencada baixa Lazy.nvim i els plugins. Mason instal·la els servidors LSP configurats —Lua, JavaScript/TypeScript, CSS i Python— i Treesitter prepara els parsers de JavaScript, TypeScript, Python, Lua, Vim i Markdown. Deixa acabar les descàrregues; pot trigar una mica. S'han de fer amb connexió a Internet.

Dins de Neovim, aquestes ordres mostren l'estat i els possibles problemes:

```vim
:Lazy
:Mason
:checkhealth
```

Tanca i torna a obrir Neovim després de la primera instal·lació. Per actualitzar el sistema i els paquets AUR, fes servir l'ordre `update` que proporciona el `.bashrc`; per actualitzar plugins, obre `:Lazy` i utilitza `U`.

## Dreceres principals

El líder és la barra espaiadora (`Space`).

- `Space ff`: cercar fitxers; `Space fw`: cercar text als fitxers.
- `Space e`: obrir/tancar l'explorador de fitxers.
- `Space gs`: preparar un canvi Git; `Space gb`: mostrar-ne l'autor.
- `Tab` / `Shift + Tab`: canviar de buffer.
- `Space l l`: obrir el panell de desenvolupament amb LSP, diagnòstics i eines.
- `Ctrl + h/j/k/l`: canviar entre finestres.
- `K`: ajuda LSP; `gd`: anar a la definició; `gr`: veure referències; `F2`: reanomenar.

La configuració completa és a `private_dot_config/nvim/`. `lazy-lock.json` fixa les versions dels plugins perquè la instal·lació sigui repetible.
