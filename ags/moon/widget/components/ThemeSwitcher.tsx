import { Gtk } from "ags/gtk4"
import { For } from "ags"
import { themeService, themesState } from "../../ThemeService"
import { PopupSection, PopupTitle } from "../atoms/Popup"
import { DataKey } from "../atoms/Data"
import { PopupScroll, PopupListItem } from "../atoms/Layout"

export function ThemeSwitcher() {
  return (
    <PopupSection>
      <PopupTitle label="System Themes" />
      <PopupScroll height={120}>
        <For each={themesState}>
          {(theme) => (
            <PopupListItem 
              onClicked={() => themeService.setTheme(theme.name)}
            >
              <box spacing={8}>
                <DataKey label={theme.name} hexpand />
                <image 
                  iconName="object-select-symbolic" 
                  visible={themeService.currentTheme.as((t) => t.name === theme.name)} 
                />
              </box>
            </PopupListItem>
          )}
        </For>
      </PopupScroll>
    </PopupSection>
  )
}
