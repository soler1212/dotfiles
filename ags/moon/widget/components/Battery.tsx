import { Gtk } from "ags/gtk4"
import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"
import { ThemeSwitcher } from "./ThemeSwitcher"

export function Battery() {
  const battery = AstalBattery.get_default()

  const percent = createBinding(
    battery,
    "percentage",
  )((p) => `${Math.floor(p * 100)}%`)

  const stateLabel = createBinding(battery, "state").as(s => {
    switch(s) {
      case AstalBattery.State.CHARGING: return "Carregant"
      case AstalBattery.State.DISCHARGING: return "Descarregant"
      case AstalBattery.State.FULLY_CHARGED: return "Completament carregada"
      case AstalBattery.State.EMPTY: return "Buida"
      default: return "Desconegut"
    }
  })

  return (
    <menubutton class="battery" visible={createBinding(battery, "isPresent")}>
      <box spacing={4}>
        <image iconName={createBinding(battery, "iconName")} class="battery-icon" />
        <label label={percent} />
      </box>
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          {/* Theme Selection Section */}
          <ThemeSwitcher />

          {/* Battery Info Section */}
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Battery Status" halign={Gtk.Align.START} />
            <box spacing={16} valign={Gtk.Align.CENTER}>
              <image iconName={createBinding(battery, "iconName")} css="font-size: 32px; color: var(--green);" />
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label class="popup-value-large" label={percent} />
                <label class="popup-label-detail" label={stateLabel} />
                <levelbar value={createBinding(battery, "percentage")} css="margin-top: 6px; min-height: 4px;" />
              </box>
            </box>
          </box>

          {/* Power Details Section */}
          <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
            <label class="popup-title" label="Energy Details" halign={Gtk.Align.START} />
            <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
              <box class="popup-data-row">
                <label label="Consumption" class="popup-data-key" hexpand halign={Gtk.Align.START} />
                <label label={createBinding(battery, "energyRate").as(r => `${r.toFixed(2)} W`)} class="popup-data-value" />
              </box>
              <box class="popup-data-row">
                <label label="Health" class="popup-data-key" hexpand halign={Gtk.Align.START} />
                <label label={createBinding(battery, "capacity").as(c => `${Math.round(c * 100)}%`)} class="popup-data-value" />
              </box>
            </box>
          </box>
        </box>
      </popover>
    </menubutton>
  )
}
