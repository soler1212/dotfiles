import { Gtk } from "ags/gtk4"
import { For, createComputed } from "ags"
import { themeService, themesState, presetsState } from "../../ThemeService"
import { PopupSection, PopupTitle } from "../atoms/Popup"
import { DataKey } from "../atoms/Data"
import { PopupScroll, PopupListItem, ModuleSeparator } from "../atoms/Layout"

export function ThemeSwitcher() {
  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
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
                    visible={createComputed(() => themeService.theme().name === theme.name)} 
                  />
                </box>
              </PopupListItem>
            )}
          </For>
        </PopupScroll>
      </PopupSection>

      <ModuleSeparator orientation={Gtk.Orientation.HORIZONTAL} css="margin: 8px 0;" />

      <PopupSection>
        <PopupTitle label="Bar Style Presets" />
        <PopupScroll height={120}>
          <For each={presetsState}>
            {(preset) => (
              <PopupListItem 
                onClicked={() => themeService.setPreset(preset.name)}
              >
                <box spacing={8}>
                  <DataKey label={preset.name} hexpand />
                  <image 
                    iconName="object-select-symbolic" 
                    visible={createComputed(() => themeService.preset().name === preset.name)} 
                  />
                </box>
              </PopupListItem>
            )}
          </For>
        </PopupScroll>
      </PopupSection>
    </box>
  )
}
