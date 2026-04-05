import { Gtk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { For, createBinding } from "ags"
import AstalWp from "gi://AstalWp"

export function AudioOutput() {
  const wp = AstalWp.get_default()!
  const speaker = wp.defaultSpeaker
  const microphone = wp.defaultMicrophone

  return (
    <menubutton>
      <image iconName={createBinding(speaker, "volumeIcon")} />
      <popover class="network-popover">
        <box orientation={Gtk.Orientation.VERTICAL} widthRequest={380}>
          <Gtk.ScrolledWindow heightRequest={450} vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC} class="popup-scroll">
            <box orientation={Gtk.Orientation.VERTICAL} spacing={16} class="popup-container">
              
              {/* Output Volume */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Speaker Volume" halign={Gtk.Align.START} />
                <box spacing={12} class="popup-data-row">
                  <button 
                    onClicked={() => speaker.mute = !speaker.mute}
                    class="popup-list-item"
                  >
                    <image iconName={createBinding(speaker, "mute").as(m => 
                      m ? "audio-volume-muted-symbolic" : "audio-volume-high-symbolic"
                    )} />
                  </button>
                  <slider
                    hexpand
                    value={createBinding(speaker, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(speaker.volume - self.value) > 0.01) {
                        speaker.volume = self.value
                      }
                    })}
                  />
                  <label 
                    label={createBinding(speaker, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    class="popup-data-value"
                    css="min-width: 35px;"
                  />
                </box>
                <label 
                  class="popup-label-detail" 
                  label={createBinding(speaker, "description").as(d => d || "Unknown Device")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </box>

              {/* Input Volume */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Microphone Volume" halign={Gtk.Align.START} />
                <box spacing={12} class="popup-data-row">
                  <button 
                    onClicked={() => microphone.mute = !microphone.mute}
                    class="popup-list-item"
                  >
                    <image iconName={createBinding(microphone, "mute").as(m => 
                      m ? "microphone-sensitivity-muted-symbolic" : "microphone-sensitivity-high-symbolic"
                    )} />
                  </button>
                  <slider
                    hexpand
                    value={createBinding(microphone, "volume")}
                    $={(self) => self.connect("value-changed", () => {
                      if (Math.abs(microphone.volume - self.value) > 0.01) {
                        microphone.volume = self.value
                      }
                    })}
                  />
                  <label 
                    label={createBinding(microphone, "volume").as(v => `${Math.round(v * 100)}%`)} 
                    class="popup-data-value"
                    css="min-width: 35px;"
                  />
                </box>
                <label 
                  class="popup-label-detail" 
                  label={createBinding(microphone, "description").as(d => d || "Unknown Mic")} 
                  maxWidthChars={30}
                  ellipsize={3}
                />
              </box>

              <Gtk.Separator class="module-separator" orientation={Gtk.Orientation.HORIZONTAL} />

              {/* Output Devices Selection */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Output Devices" halign={Gtk.Align.START} />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "speakers")}>
                    {(s) => (
                      <button 
                        class="popup-list-item"
                        onClicked={() => s.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(s, "volumeIcon")} />
                          <label 
                            label={createBinding(s, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            class="popup-data-key"
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultSpeaker").as(def => def === s)} 
                          />
                        </box>
                      </button>
                    )}
                  </For>
                </box>
              </box>

              {/* Input Devices Selection */}
              <box orientation={Gtk.Orientation.VERTICAL} class="popup-section">
                <label class="popup-title" label="Input Devices" halign={Gtk.Align.START} />
                <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
                  <For each={createBinding(wp.audio, "microphones")}>
                    {(m) => (
                      <button 
                        class="popup-list-item"
                        onClicked={() => m.is_default = true}
                      >
                        <box spacing={8}>
                          <image iconName={createBinding(m, "volumeIcon")} />
                          <label 
                            label={createBinding(m, "description")} 
                            hexpand 
                            halign={Gtk.Align.START} 
                            class="popup-data-key"
                            maxWidthChars={22}
                            ellipsize={3}
                          />
                          <image 
                            iconName="object-select-symbolic" 
                            visible={createBinding(wp, "defaultMicrophone").as(def => def === m)} 
                          />
                        </box>
                      </button>
                    )}
                  </For>
                </box>
              </box>

              <button 
                class="popup-list-item"
                onClicked={() => execAsync("pavucontrol")}
                css="margin-top: 8px; background-color: rgba(255,255,255,0.03);"
              >
                <box spacing={8} halign={Gtk.Align.CENTER} hexpand>
                  <image iconName="preferences-system-symbolic" />
                  <label label="Audio Settings" class="popup-data-value" />
                </box>
              </button>
            </box>
          </Gtk.ScrolledWindow>
        </box>
      </popover>
    </menubutton>
  )
}
