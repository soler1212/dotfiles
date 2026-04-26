-- Theme 2: Light with Low Contrast
require("flow").setup {
  theme = {
    name = "light_low_contrast",  -- Name for this theme
    style = "light",              -- "dark" | "light"
    contrast = "default",         -- "default" | "high"
    transparent = false,          -- true | false
  },
  colors = {
    mode = "light",               -- "default" | "dark" | "light"
    fluo = "yellow",              -- "pink" | "cyan" | "yellow" | "orange" | "green"
  },
  ui = {
    borders = "none",             -- "theme" | "inverse" | "fluo" | "none"
    aggressive_spell = false,     -- true | false
  },
}

-- Theme 3: Dark with Transparent Background
require("flow").setup {
  theme = {
    name = "dark_transparent",    -- Name for this theme
    style = "dark",               -- "dark" | "light"
    contrast = "default",         -- "default" | "high"
    transparent = true,           -- true | false
  },
  colors = {
    mode = "dark",                -- "default" | "dark" | "light"
    fluo = "green",               -- "pink" | "cyan" | "yellow" | "orange" | "green"
  },
  ui = {
    borders = "theme",            -- "theme" | "inverse" | "fluo" | "none"
    aggressive_spell = true,      -- true | false
  },
}
