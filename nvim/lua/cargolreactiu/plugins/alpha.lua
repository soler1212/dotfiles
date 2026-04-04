-- A lua powered greeter UI for Neovim.
-- https://github.com/goolord/alpha-nvim
return {
    'goolord/alpha-nvim',
    commit = 'a9d8fb72213c8b461e791409e7feabb74eb6ce73', -- Congelat al commit funcional
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    config = function()
        require("cargolreactiu.after.plugins.alpha")
    end,
}
