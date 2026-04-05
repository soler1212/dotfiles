import { Gtk } from "ags/gtk4"
import { For, createBinding, With } from "ags"
import AstalNetwork from "gi://AstalNetwork"
import { useNetwork } from "../../hooks/useNetwork"
import { CurrentNetworkInfo } from "./current-network-info"
import { IPsInfo } from "./ips-info"
import { NetworkAccessPointListItem } from "./network-access-points-list-item"

export function Wireless() {
  const { getNetworkBindings, getActiveNetworkData, sortedAccessPoints } = useNetwork();
  const network = AstalNetwork.get_default()
  const wifi = createBinding(network, "wifi")
  const activeNetwork = getActiveNetworkData();
  const { privateIps, publicIp } = getNetworkBindings();

  return (
    <box visible={wifi(Boolean)}>
      <With value={wifi}>
        {(wifi) =>
          wifi && (
            <menubutton>
              <image
                iconName={activeNetwork.as((data) => {
                  if (typeof data === "string") return "network-wireless-signal-none-symbolic";
                  return data.icon.iconName;
                })}
                class={activeNetwork.as((data) => {
                  if (typeof data === "string") return "";
                  return data.icon.className;
                })}
              />
              <popover class="network-popover">
                <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
                  {/* Status Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                    <label class="popup-title" label="Current Network" halign={Gtk.Align.START} />
                    <CurrentNetworkInfo networkData={activeNetwork} />
                    
                    <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} css="margin: 12px 0;" />
                    
                    <label class="popup-title" label="IP Information" halign={Gtk.Align.START} />
                    <IPsInfo
                      privateIps={privateIps}
                      publicIp={publicIp}
                    />
                  </box>

                  {/* AP List Section */}
                  <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                    <label class="popup-title" label="Available Networks" halign={Gtk.Align.START} />
                    <Gtk.ScrolledWindow heightRequest={200} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
                      <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                        <For each={createBinding(wifi, "accessPoints")(sortedAccessPoints)}>
                          {(ap: AstalNetwork.AccessPoint) => (
                            <NetworkAccessPointListItem accessPoint={ap} wifi={wifi} />
                          )}
                        </For>
                      </box>
                    </Gtk.ScrolledWindow>
                  </box>
                </box>
              </popover>
            </menubutton>
          )
        }
      </With>
    </box>
  )
}
