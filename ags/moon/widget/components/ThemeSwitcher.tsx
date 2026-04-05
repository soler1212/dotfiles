import { Gtk } from "ags/gtk4"
import { For } from "ags"
import { themeService, themesState } from "../../ThemeService"

export function ThemeSwitcher() {
  return (
    <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
      <label class="popup-title" label="System Themes" halign={Gtk.Align.START} />
      <Gtk.ScrolledWindow heightRequest={120} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
        <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
          <For each={themesState}>
            {(theme) => (
              <button 
                class="popup-list-item"
                onClicked={() => themeService.setTheme(theme.name)}
              >
                <box spacing={8}>
                  <label label={theme.name} hexpand halign={Gtk.Align.START} class="popup-data-key" />
                  <image 
                    iconName="object-select-symbolic" 
                    visible={themeService.currentTheme.as((t) => t.name === theme.name)} 
                  />
                </box>
              </button>
            )}
          </For>
        </box>
      </Gtk.ScrolledWindow>
    </box>
  )
}
