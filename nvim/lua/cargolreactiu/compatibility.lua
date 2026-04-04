local M = {}

function M.setup()
  -- Fix per a Telescope i Neovim 0.12.0
  -- Neovim 0.12 ha eliminat 'ft_to_lang' i protegeix la taula 'vim.treesitter'.
  
  if vim.treesitter then
    -- Usep rawset per forçar la injecció de la funció saltant-nos la protecció de la taula
    if not vim.treesitter.ft_to_lang then
      rawset(vim.treesitter, "ft_to_lang", function(ft)
        local ok, lang = pcall(function() 
          return vim.treesitter.language.get_lang(ft) 
        end)
        return ok and lang or ft
      end)
    end
  end

  -- També ho posem a nvim-treesitter.parsers per si de cas
  local ok_parsers, parsers = pcall(require, "nvim-treesitter.parsers")
  if ok_parsers and parsers then
    if not parsers.ft_to_lang then
      rawset(parsers, "ft_to_lang", function(ft)
        local ok, lang = pcall(function() 
          return vim.treesitter.language.get_lang(ft) 
        end)
        return ok and lang or ft
      end)
    end
  end

  -- Shim per a 'is_enabled' que Telescope 0.1.8 també busca
  local ok_configs, configs = pcall(require, "nvim-treesitter.configs")
  if ok_configs and configs then
    if not configs.is_enabled then
      rawset(configs, "is_enabled", function() return true end)
    end
  end
end

return M
