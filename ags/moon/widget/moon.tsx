import { Astal, Gtk } from "ags/gtk4"
import { moonService } from "../services/moon"
import { themeService } from "../ThemeService"

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            name={`moon-${monitor}`}
            class="MoonWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | RIGHT}
            css={themeService.cssVars}>
            <box class="moon-container" orientation={Gtk.Orientation.VERTICAL}>
                <label 
                    class="moon-phase"
                    label={moonService.as(m => m.phase_emoji)} 
                />
                <box orientation={Gtk.Orientation.VERTICAL}>
                  <label 
                      class="moon-title-cat"
                      label={moonService.as(m => m.phase_name_cat)}
                  />
                  <label 
                      class="moon-title-en"
                      label={moonService.as(m => `(${m.phase_name})`)}
                  />
                </box>
                
                <box class="moon-divider" />
                
                <box orientation={Gtk.Orientation.VERTICAL} spacing={4} class="moon-details">
                    <box spacing={8}>
                        <label 
                            class="moon-info-accent" 
                            label={moonService.as(m => `${m.illumination}%`)} 
                        />
                        <label 
                            class="moon-info" 
                            label={moonService.as(m => m.is_waxing ? "Creixent" : "Minvant")} 
                        />
                    </box>
                    
                    <label 
                        class="moon-info-small" 
                        label={moonService.as(m => `Proper estat: ${m.next_phase}`)} 
                    />

                    <box spacing={12} class="moon-times">
                        <label 
                            class="moon-info-tiny" 
                            label={moonService.as(m => `Sortida: ${m.moonrise}`)} 
                        />
                        <label 
                            class="moon-info-tiny" 
                            label={moonService.as(m => `Posta: ${m.moonset}`)} 
                        />
                    </box>
                </box>
            </box>
        </window>
    )
}
