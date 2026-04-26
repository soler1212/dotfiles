return {
    'nvim-telescope/telescope.nvim', 
    tag = '0.1.8', -- Fixem la versió estable 0.1.x per a Neovim 0.11
    dependencies = { 
        'nvim-lua/plenary.nvim',
        { 'nvim-telescope/telescope-ui-select.nvim', commit = '6e51d7da30bd139a6950adf2a47fda6df9fa06d2' },
    },
    config = function()
        require("cargolreactiu.after.plugins.telescope")
    end
}
