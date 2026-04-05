import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { For, createBinding } from "ags"
import AstalWp from "gi://AstalWp"
import { PopupSection, PopupTitle, PopupDetail } from "../atoms/Popup"
import { DataRow, DataValue } from "../atoms/Data"
import { PopupScroll, PopupListItem } from "../atoms/Layout"

export function AudioOutput() {
  const wp = AstalWp.get_default()!
  const speaker = wp.defaultSpeaker
  const microphone = wp.defaultMicrophone

  return (
    <menubutton>
      <image iconName={createBinding(speaker, "volumeIcon")} />
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <PopupScroll height={450} spacing={16}>
            <box orientation={Gtk.Orientation.VERTICAL} spacing={16} class="popup-container">
              
              {/* Output Volume */}
              <PopupSection>
                <PopupTitle label="Speaker Volume" />
                <DataRow spacing={12}>
                  <PopupListItem 
                    onClicked={() => speaker.mute = !speaker.mute}
                  >
                    <image iconName={createBinding(speaker, "mute").as(m => 
                      m ? "audio-volume-muted-symbolic" : "audio-volume-high-symbolic"
                    )} />
                  </PopupListItem>
                  <slider
                    hexpand
                    value={createBinding(speaker, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(speaker.volume - self.value) > 0.01) {
                        speaker.volume = self.value
                      }
                    })}
                  />
                  <DataValue 
                    label={createBinding(speaker, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    css="min-width: 35px;"
                  />
                </DataRow>
                <PopupDetail 
                  label={createBinding(speaker, "description").as(d => d || "Unknown Device")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </PopupSection>

              {/* Input Volume */}
              <PopupSection>
                <PopupTitle label="Microphone Volume" />
                <DataRow spacing={12}>
                  <PopupListItem 
                    onClicked={() => microphone.mute = !microphone.mute}
                  >
                    <image iconName={createBinding(microphone, "mute").as(m => 
                      m ? "microphone-sensitivity-muted-symbolic" : "microphone-sensitivity-high-symbolic"
                    )} />
                  </PopupListItem>
                  <slider
                    hexpand
                    value={createBinding(microphone, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(microphone.volume - self.value) > 0.01) {
                        microphone.volume = self.value
                      }
                    })}
                  />
                  <DataValue 
                    label={createBinding(microphone, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    css="min-width: 35px;"
                  />
                </DataRow>
                <PopupDetail 
                  label={createBinding(microphone, "description").as(d => d || "Unknown Mic")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </PopupSection>

              <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} />

              {/* Output Devices Selection */}
              <PopupSection>
                <PopupTitle label="Output Devices" />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "speakers")}>
                    {(s) => (
                      <PopupListItem 
                        onClicked={() => s.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(s, "volumeIcon")} />
                          <DataValue 
                            label={createBinding(s, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            css="font-size: 12px; font-weight: 500; color: var(--subtext0);" // popup-data-key style
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultSpeaker").as(def => def === s)} 
                          />
                        </box>
                      </PopupListItem>
                    )}
                  </For>
                </box>
              </PopupSection>

              {/* Input Devices Selection */}
              <PopupSection>
                <PopupTitle label="Input Devices" />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "microphones")}>
                    {(m) => (
                      <PopupListItem 
                        onClicked={() => m.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(m, "volumeIcon")} />
                          <DataValue 
                            label={createBinding(m, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            css="font-size: 12px; font-weight: 500; color: var(--subtext0);"
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultMicrophone").as(def => def === m)} 
                          />
                        </box>
                      </PopupListItem>
                    )}
                  </For>
                </box>
              </PopupSection>

              <PopupListItem 
                onClicked={() => execAsync("pavucontrol")}
                css="margin-top: 8px; background-color: rgba(255,255,255,0.03);"
              >
                <box spacing={8} halign={Gtk.Align.CENTER} hexpand>
                  <image iconName="preferences-system-symbolic" />
                  <DataValue label="Audio Settings" />
                </box>
              </PopupListItem>
            </box>
          </PopupScroll>
        </box>
      </popover>
    </menubutton>
  )
}
