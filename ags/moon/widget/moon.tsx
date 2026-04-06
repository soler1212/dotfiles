import { Astal, Gtk } from "ags/gtk4"
import { moonService } from "../services/moon"
import { themeService } from "../ThemeService"
import { createPoll } from "ags/time"

const HackerRow = ({ label, value, colorClass }: { label: string, value: any, colorClass?: any }) => (
    <box class="hacker-row" spacing={8}>
        <label class="hacker-label" label={`${label}:`} />
        <label 
            class={colorClass ? colorClass.as((c: string) => `hacker-value ${c}`) : "hacker-value"} 
            label={value} 
            hexpand 
            halign={Gtk.Align.END} 
        />
    </box>
)

export default function MoonWidget(monitor = 0) {
    const { BOTTOM, RIGHT } = Astal.WindowAnchor
    const time = createPoll("", 1000, 'date +"%H:%M:%S"')

    return (
        <window
            visible
            name={`moon-${monitor}`}
            class="MoonWindow"
            gdkmonitor={monitor}
            layer={Astal.Layer.BOTTOM}
            anchor={BOTTOM | RIGHT}
            css={themeService.cssVars}>
            
            <box class="hacker-terminal" orientation={Gtk.Orientation.VERTICAL}>
                {/* Header Terminal Style */}
                <box class="terminal-header" spacing={8}>
                    <label class="terminal-prompt" label="> " />
                    <label class="terminal-title" label="MOON_MONITOR_v2.1" />
                    <box hexpand />
                    <label class="terminal-status" label="[THEMED_SESSION]" />
                </box>

                <box class="terminal-body" orientation={Gtk.Orientation.VERTICAL} spacing={16}>
                    {/* Header: Emoji i Noms (CAT/EN) */}
                    <box spacing={16} valign={Gtk.Align.CENTER}>
                        <label 
                            class="hacker-hero-emoji"
                            label={moonService.as(m => m.phase_emoji)} 
                        />
                        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
                            <label 
                                class="hacker-phase-name"
                                label={moonService.as(m => m.phase_name_cat)}
                            />
                            <label 
                                class="hacker-phase-en"
                                label={moonService.as(m => `(${m.phase_name})`)}
                            />
                        </box>
                    </box>

                    {/* Progress Bar (Illumination) */}
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
                        <box spacing={8}>
                            <label class="hacker-label-small" label="LLUMINOSITAT" />
                            <label class="hacker-value-small accent" label={moonService.as(m => `${m.illumination}%`)} hexpand halign={Gtk.Align.END} />
                        </box>
                        <levelbar 
                            class="hacker-bar"
                            value={moonService.as(m => (parseInt(m.illumination) || 0) / 100)} 
                        />
                    </box>

                    {/* Data Grid */}
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={4} class="hacker-data-grid">
                        <HackerRow 
                            label="ESTAT ACTUAL" 
                            value={moonService.as(m => m.is_waxing ? "Creixent" : "Minvant")} 
                            colorClass={moonService.as(m => m.is_waxing ? "green" : "red")} 
                        />
                        <HackerRow 
                            label="PROPERA FASE" 
                            value={moonService.as(m => m.next_phase)} 
                            colorClass={moonService.as(() => "yellow")} 
                        />
                    </box>

                    <label class="terminal-divider" label="[ DADES ASTRONÒMIQUES ]" />

                    {/* Timings Grid */}
                    <box orientation={Gtk.Orientation.VERTICAL} spacing={6} class="hacker-astro-grid">
                        <box spacing={12}>
                            <label class="hacker-mini-label" label="LLUNA (S/P):" />
                            <label class="hacker-mini-value" label={moonService.as(m => `${m.moonrise} / ${m.moonset}`)} />
                        </box>
                        <box spacing={12}>
                            <label class="hacker-mini-label" label="SOL   (S/P):" />
                            <label class="hacker-mini-value" label={moonService.as(m => `${m.sunrise} / ${m.sunset}`)} />
                        </box>
                    </box>
                </box>

                <box class="terminal-footer">
                    <label class="terminal-timestamp" label={time.as(t => String(t))} />
                    <box hexpand />
                    <label class="terminal-user" label="ROOT@DESKTOP" />
                </box>
            </box>
        </window>
    )
}
