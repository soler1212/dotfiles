import { Gtk } from "ags/gtk4"
import { For, createBinding, With } from "ags"
import AstalNetwork from "gi://AstalNetwork"
import { useNetwork } from "../../hooks/useNetwork"
import { CurrentNetworkInfo } from "./current-network-info"
import { IPsInfo } from "./ips-info"
import { NetworkAccessPointListItem } from "./network-access-points-list-item"
import { PopupContainer, PopupSection, PopupTitle } from "../atoms/Popup"
import { PopupScroll } from "../atoms/Layout"

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
                pixelSize={14}
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
                <PopupContainer>
                  {/* Status Section */}
                  <PopupSection>
                    <PopupTitle label="Current Network" />
                    <CurrentNetworkInfo networkData={activeNetwork} />
                    
                    <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} css="margin: 12px 0;" />
                    
                    <PopupTitle label="IP Information" />
                    <IPsInfo
                      privateIps={privateIps}
                      publicIp={publicIp}
                    />
                  </PopupSection>

                  {/* AP List Section */}
                  <PopupSection>
                    <PopupTitle label="Available Networks" />
                    <PopupScroll height={200}>
                      <For each={createBinding(wifi, "accessPoints")(sortedAccessPoints)}>
                        {(ap: AstalNetwork.AccessPoint) => (
                          <NetworkAccessPointListItem accessPoint={ap} wifi={wifi} />
                        )}
                      </For>
                    </PopupScroll>
                  </PopupSection>
                </PopupContainer>
              </popover>
            </menubutton>
          )
        }
      </With>
    </box>
  )
}
