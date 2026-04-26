import { Gtk } from "ags/gtk4"
import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { PopupContainer, PopupSection, PopupTitle, PopupValueLarge, PopupDetail } from "../atoms/Popup"
import { DataRow, DataKey, DataValue } from "../atoms/Data"

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
        <PopupContainer>
          {/* Theme Selection Section */}
          <ThemeSwitcher />

          {/* Battery Info Section */}
          <PopupSection>
            <PopupTitle label="Battery Status" />
            <box spacing={16} valign={Gtk.Align.CENTER}>
              <image iconName={createBinding(battery, "iconName")} css="font-size: 32px; color: var(--green);" />
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <PopupValueLarge label={percent} />
                <PopupDetail label={stateLabel} />
                <levelbar value={createBinding(battery, "percentage")} css="margin-top: 6px; min-height: 4px;" />
              </box>
            </box>
          </PopupSection>

          {/* Power Details Section */}
          <PopupSection>
            <PopupTitle label="Energy Details" />
            <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
              <DataRow>
                <DataKey label="Consumption" hexpand />
                <DataValue label={createBinding(battery, "energyRate").as(r => `${r.toFixed(2)} W`)} />
              </DataRow>
              <DataRow>
                <DataKey label="Health" hexpand />
                <DataValue label={createBinding(battery, "capacity").as(c => `${Math.round(c * 100)}%`)} />
              </DataRow>
            </box>
          </PopupSection>
        </PopupContainer>
      </popover>
    </menubutton>
  )
}
