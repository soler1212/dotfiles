--- [[ Neovim 0.12+ Compatibility Layer ]]
--- Aquest fitxer conté pegats per a connectors externs que encara no s'han
--- adaptat a les APIs de Neovim 0.12.0.
--- Un cop els connectors (com Telescope) s'actualitzin, aquest fitxer es podrà eliminar.

local M = {}

function M.setup()
  -- Fix per a Telescope i altres connectors que encara busquen 'vim.treesitter.ft_to_lang'
  -- A la v0.12, aquesta funció s'ha mogut a 'vim.treesitter.language.get_lang'
  
  -- Usep rawset per saltar qualsevol protecció de metataula que Neovim 0.12 pugui tenir
  if vim.treesitter then
    rawset(vim.treesitter, "ft_to_lang", function(ft)
      local ok, lang = pcall(function() return vim.treesitter.language.get_lang(ft) end)
      return ok and lang or ft
    end)
  end

  -- Alguns plugins busquen directament a la taula global treesitter (molt antics)
  if _G.treesitter == nil then
    _G.treesitter = vim.treesitter
  end
end

return M
