lvim.colorscheme = "neosolarized"
require("colorbuddy").colorscheme("neosolarized")
local n = require("neosolarized").setup(
  {
    comment_italics = true,
    background_set = false
  }
)

n.Color.new("black", "#000000")

n.Group.new("CursorLine", n.colors.none, n.colors.base03, n.styles.NONE, n.colors.base03)
n.Group.new("CursorLineNr", n.colors.yellow, n.colors.black, n.styles.NONE, n.colors.base1)
n.Group.new("Visual", n.colors.none, n.colors.base03, n.styles.reverse)

-- Customize LSP-related groups
local cError = n.groups.Error.fg
local cInfo = n.groups.Information.fg
local cWarn = n.groups.Warning.fg
local cHint = n.groups.Hint.fg

n.Group.new("DiagnosticVirtualTextError", cError, cError:dark():dark():dark():dark(), n.styles.NONE)
n.Group.new("DiagnosticVirtualTextInfo", cInfo, cInfo:dark():dark():dark(), n.styles.NONE)
n.Group.new("DiagnosticVirtualTextWarn", cWarn, cWarn:dark():dark():dark(), n.styles.NONE)
n.Group.new("DiagnosticVirtualTextHint", cHint, cHint:dark():dark():dark(), n.styles.NONE)
n.Group.new("DiagnosticUnderlineError", n.colors.none, n.colors.none, n.styles.undercurl, cError)
n.Group.new("DiagnosticUnderlineWarn", n.colors.none, n.colors.none, n.styles.undercurl, cWarn)
n.Group.new("DiagnosticUnderlineInfo", n.colors.none, n.colors.none, n.styles.undercurl, cInfo)
n.Group.new("DiagnosticUnderlineHint", n.colors.none, n.colors.none, n.styles.undercurl, cHint)


-- Change theme settings
-- local themes = {
--   gruvbox = "gruvbox",
--   rose_pine = "rose-pine",
--   lunar = "lunar",
--   gruvbox_material = "gruvbox-material",
--   onedarker = "onedarker",
--   onedark = "onedark",
--   horizon = "horizon",
--   tokyonight = "tokyonight",
--   tokyonight_night = "tokyonight-night",
--   tokyonight_day = "tokyonight-day",
--   tokyonight_moon = "tokyonight-moon",
--   desert = "desert",
--   morning = "morning",
--   sonokai = "sonokai",
--   edge = "edge",
--   ayu = "ayu",
--   molokai = "molokai",
-- }

-- lvim.transparent_window = false
-- lvim.colorscheme = themes.molokai;

-- local extra_opts = {
--   sonokai = {
--     styles = {
--       espresso = "espresso",
--       shusia = "shusia",
--       default = "default",
--     },
--   },
--   ayu = {
--     styles = {
--       mirage = "mirage",
--       light = "light",
--       dark = "dark",
--     },
--   },
--   edge = {
--     styles = {
--       aura = "aura",
--       neon = "neon",
--     },
--     airline_theme = "edge",
--     lualine_theme = "edge",
--   },
-- }
