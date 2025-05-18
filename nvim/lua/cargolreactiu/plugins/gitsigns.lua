-- Git integration for buffers
-- https://github.com/lewis6991/gitsigns.nvim
return {
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  opts = {
    -- La configuració es mou aquí des del fitxer d'after
    on_attach = function(bufnr)
      -- Afegeix aquí la lògica d'on_attach
    end
  }
}
