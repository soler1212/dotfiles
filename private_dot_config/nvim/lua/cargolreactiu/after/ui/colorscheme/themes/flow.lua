require("flow").setup {
    theme = {
      style = "dark",         --  "dark" | "light"
      contrast = "high",   -- "default" | "high"
      transparent = false,    -- true | false
    },
    colors = {
      mode = "default",   -- "default" | "dark" | "light"
      fluo = "yellow",      -- "pink" | "cyan" | "yellow" | "orange" | "green"
    },
    ui = {
      borders = "fluo",        -- "theme" | "inverse" | "fluo" | "none"
      aggressive_spell = true,   -- true | false
    },
}
