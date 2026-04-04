-- Configuración estable de nvim-treesitter (Estilo Vanilla)
-- Compatible con Neovim 0.12

require('nvim-treesitter.configs').setup({
  -- Lista de parsers que SIEMPRE queremos instalados
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

  -- Instalación automática (no-op si ya existen)
  auto_install = true,

  -- Resaltado Nativo
  highlight = {
    enable = true,
    -- Protección para archivos grandes
    disable = function(lang, buf)
      local max_filesize = vim.g.big_file.size or (100 * 1024) -- 100 KB
      local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(buf))
      if ok and stats and stats.size > max_filesize then
        return true
      end
    end,
  },

  -- Indentación Inteligente
  indent = {
    enable = true,
  },
})

-- [[ Funcionalidades Vanilla (Neovim 0.12 Core) ]]

-- Plegado (Folding) Nativo con Treesitter
vim.api.nvim_create_autocmd('FileType', {
  desc = 'Activar plegado nativo por Treesitter',
  callback = function(args)
    -- Si el archivo es grande, no activamos plegados pesados
    local max_filesize = vim.g.big_file.size or (100 * 1024)
    local ok, stats = pcall(vim.uv.fs_stat, vim.api.nvim_buf_get_name(args.buf))
    if ok and stats and stats.size > max_filesize then return end

    if pcall(vim.treesitter.get_parser, args.buf) then
      vim.wo.foldmethod = 'expr'
      vim.wo.foldexpr = 'v:lua.vim.treesitter.foldexpr()'
    end
  end,
})
