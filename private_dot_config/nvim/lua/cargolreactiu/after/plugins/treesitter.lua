-- Configuración estable de nvim-treesitter (Vanilla Style)
-- Totalment optimitzat per a Neovim 0.11.x

require('nvim-treesitter.configs').setup({
  -- Parsers que volem assegurar-nos que estiguin instal·lats
  ensure_installed = {
    "javascript",
    "typescript",
    "python",
    "lua",
    "vim",
    "vimdoc",
    "query",
    "markdown",
    "markdown_inline"
  },

  -- Instal·lació automàtica silenciosa
  auto_install = true,

  -- Resaltat natiu (Estable en 0.11)
  highlight = {
    enable = true,
    -- Desactivem resaltat Regex addicional per a velocitat
    additional_vim_regex_highlighting = false,
    -- Protecció per a fitxers grans
    disable = function(lang, buf)
      local max_filesize = vim.g.big_file.size or (100 * 1024) -- 100 KB
      local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(buf))
      if ok and stats and stats.size > max_filesize then
        return true
      end
    end,
  },

  -- Indentació intel·ligent
  indent = {
    enable = true,
  },
})

-- [[ Funcionalitats Natives (Optimitzades) ]]

-- Plegat (Folding) amb Treesitter per a la v0.11
vim.api.nvim_create_autocmd('FileType', {
  desc = 'Activar plegat per Treesitter (v0.11)',
  callback = function(args)
    -- Si el fitxer és gran, no activem plegats pesats
    local max_filesize = vim.g.big_file.size or (100 * 1024)
    local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(args.buf))
    if ok and stats and stats.size > max_filesize then return end

    if pcall(vim.treesitter.get_parser, args.buf) then
      vim.wo.foldmethod = 'expr'
      vim.wo.foldexpr = 'v:lua.vim.treesitter.foldexpr()'
    end
  end,
})
