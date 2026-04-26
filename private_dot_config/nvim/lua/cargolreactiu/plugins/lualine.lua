-- A blazing fast and easy to configure Neovim statusline.
-- https://github.com/nvim-lualine/lualine.nvim
return {
    'nvim-lualine/lualine.nvim',
    commit = '74114f0df664f14d7c228945693ba68a3b70a794', -- Congelat al commit funcional
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    config = function()
        -- ATENCIÓ: Lualine a la teva config està dins de la subcarpeta 'ui'
        require("cargolreactiu.after.ui.lualine")
    end,
}
