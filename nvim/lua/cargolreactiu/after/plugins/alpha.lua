local alpha = require("alpha")
local dashboard = require("alpha.themes.dashboard")
local possession = require("possession")
local Path = require("plenary.path")

-- Header
dashboard.section.header.val = {
  "                                                     ",
  "  ███╗   ██╗███████╗ ██████╗ ██╗   ██╗██╗███╗   ███╗",
  "  ████╗  ██║██╔════╝██╔═══██╗██║   ██║██║████╗ ████║",
  "  ██╔██╗ ██║█████╗  ██║   ██║██║   ██║██║██╔████╔██║",
  "  ██║╚██╗██║██╔══╝  ██║   ██║╚██╗ ██╔╝██║██║╚██╔╝██║",
  "  ██║ ╚████║███████╗╚██████╔╝ ╚████╔╝ ██║██║ ╚═╝ ██║",
  "  ╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═══╝  ╚═╝╚═╝     ╚═╝",
  "                                                     ",
}

-- Set menu
dashboard.section.buttons.val = {
  dashboard.button("s", " " .. " Sessions", ":Telescope possession list<CR>"),
  dashboard.button("f", " " .. " Files", ":Telescope find_files<CR>"),
  dashboard.button("r", " " .. " Recent files", ":Telescope oldfiles<CR>"),
  dashboard.button("g", " " .. " Find text", ":Telescope live_grep<CR>"),
  dashboard.button("c", " " .. " Config", ":e $MYVIMRC<CR>"),
  dashboard.button("p", " " .. " Plugins", ":Lazy<CR>"),
  dashboard.button("q", " " .. " Quit", ":qa<CR>"),
}

-- Footer with session info
local function footer()
  -- Aquí està la correcció - cal accedir a possession.session
  local current_session = require('possession.session').get_session_name() or "No Session"
  return "Current Session: " .. current_session
end

dashboard.section.footer.val = footer()

-- Redefineix els colors (opcional, ajusta-ho segons el teu tema)
dashboard.section.header.opts.hl = "Title"
dashboard.section.buttons.opts.hl = "Function"
dashboard.section.footer.opts.hl = "Comment"

dashboard.config.layout = {
  { type = "padding", val = 2 },
  dashboard.section.header,
  { type = "padding", val = 2 },
  dashboard.section.buttons,
  { type = "padding", val = 2 },
  dashboard.section.footer,
}

dashboard.config.opts.noautocmd = true

alpha.setup(dashboard.config)

-- Carregar l'última sessió automàticament si s'obre Neovim sense arguments i no estem en un directori git
vim.api.nvim_create_autocmd("VimEnter", {
  callback = function()
    local stats = vim.loop.fs_stat(vim.fn.getcwd() .. "/.git")
    if vim.fn.argc() == 0 and not stats and not vim.fn.exists('$GIT_DIR') then
      require("alpha").start()
    end
  end,
})
