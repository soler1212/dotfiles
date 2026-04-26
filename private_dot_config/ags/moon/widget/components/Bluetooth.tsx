import { Gtk } from "ags/gtk4"
import { createBinding, For } from "ags"
import AstalBluetooth from "gi://AstalBluetooth"
import { PopupContainer, PopupSection, PopupTitle } from "../atoms/Popup"
import { PopupScroll, PopupListItem } from "../atoms/Layout"
import { DataKey, DataValue } from "../atoms/Data"

export function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default()

  return (
    <menubutton visible={createBinding(bluetooth, "isPowered")}>
      <image iconName={createBinding(bluetooth, "isPowered").as(p => 
        p ? "bluetooth-active-symbolic" : "bluetooth-disabled-symbolic"
      )} />
      <popover class="network-popover">
        <PopupContainer width={300}>
          <PopupSection>
            <PopupTitle label="Bluetooth" />
            <PopupScroll height={200}>
              <For each={createBinding(bluetooth, "devices")}>
                {(device) => (
                  <PopupListItem onClicked={() => device.connect_device()}>
                    <box spacing={8}>
                      <image iconName={device.icon + "-symbolic"} />
                      <DataKey label={device.name || "Unknown Device"} hexpand />
                      <image 
                        iconName="object-select-symbolic" 
                        visible={createBinding(device, "connected")} 
                      />
                    </box>
                  </PopupListItem>
                )}
              </For>
            </PopupScroll>
          </PopupSection>
          
          <PopupListItem onClicked={() => bluetooth.adapter.powered = !bluetooth.adapter.powered}>
            <box spacing={8} halign={Gtk.Align.CENTER} hexpand>
              <DataValue label={createBinding(bluetooth, "isPowered").as(p => 
                p ? "Turn Off Bluetooth" : "Turn On Bluetooth"
              )} />
            </box>
          </PopupListItem>
        </PopupContainer>
      </popover>
    </menubutton>
  )
}
