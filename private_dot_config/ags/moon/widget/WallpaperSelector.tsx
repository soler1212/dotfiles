import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createState } from "ags"
import { execAsync } from "ags/process"
import GLib from "gi://GLib"
import { themeService } from "../ThemeService"

const HOME = GLib.getenv("HOME") || ""
const WALLPAPER_DIR = `${HOME}/.config/sway/images`
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]

function runCmd(cmd: string[]): void {
    execAsync(cmd).catch(console.error)
}

function applyWallpaper(path: string): void {
    runCmd(["swaymsg", "output", "*", "bg", path, "fill"])
    runCmd(["bash", "-c", `echo '${path}' > "${HOME}/.config/sway/.wallpaper_state"`])
    runCmd(["notify-send", "-t", "2000", "Wallpaper Changed", path.split("/").pop() || "", "-i", path])
}

function loadWallpapersAsync(): Promise<string[]> {
    return execAsync(`bash -c "ls -1 '${WALLPAPER_DIR}' 2>/dev/null"`).then(out => {
        const files = out.trim().split("\n")
        const wallpapers: string[] = []
        for (const name of files) {
            if (!name) continue
            const ext = name.toLowerCase().slice(name.lastIndexOf("."))
            if (IMAGE_EXTENSIONS.includes(ext)) {
                wallpapers.push(`${WALLPAPER_DIR}/${name}`)
            }
        }
        return wallpapers.sort()
    })
}

export function WallpaperSelector(monitor: Gdk.Monitor) {
    const [wallpapers, setWallpapers] = createState<string[]>([])
    const [currentWallpaper, setCurrentWallpaper] = createState<string | null>(null)
    const [currentIndex, setCurrentIndex] = createState(0)

    if (wallpapers.get().length === 0) {
        loadWallpapersAsync().then(list => {
            setWallpapers(list)
            if (list.length > 0) {
                setCurrentWallpaper(list[0])
            }
        })
    }

    const goToWallpaper = (index: number) => {
        const wp = wallpapers.get()
        setCurrentIndex(index)
        setCurrentWallpaper(wp[index])
    }

    const next = () => {
        const wp = wallpapers.get()
        const i = currentIndex.get()
        if (i < wp.length - 1) {
            goToWallpaper(i + 1)
        }
    }

    const prev = () => {
        const i = currentIndex.get()
        if (i > 0) {
            goToWallpaper(i - 1)
        }
    }

    const previewCss = currentWallpaper.as(wp => wp
        ? `background-image: url('file://${wp.replace(/'/g, "\\'")}'); background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 8px; background-color: black;`
        : ""
    )

    return (
        <window
            visible={false}
            name="wallpaper-selector"
            class="WallpaperSelectorWindow"
            gdkmonitor={monitor}
            anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
            layer={Astal.Layer.OVERLAY}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            application={app}
            css={themeService.cssVars}
            heightRequest={300}>
            <box class="wallpaper-selector" spacing={8} orientation={Gtk.Orientation.VERTICAL} css="background-color: alpha(black, 0.9); padding: 12px; border-radius: 12px;">
                <box halign={Gtk.Align.CENTER} spacing={8}>
                    <label class="wallpaper-selector-title" label="Wallpaper Selector" />
                    <button class="wallpaper-selector-close" onClicked={() => app.get_window("wallpaper-selector")?.hide()}>
                        <label label="✕" />
                    </button>
                </box>
                <box hexpand vexpand>
                    <button
                        class="wallpaper-preview"
                        hexpand
                        vexpand
                        onClicked={() => {
                            const wp = currentWallpaper.get()
                            if (wp) applyWallpaper(wp)
                        }}
                        css={previewCss}
                    />
                </box>
                <box halign={Gtk.Align.CENTER} spacing={16}>
                    <button class="wallpaper-nav-btn" onClicked={prev}>
                        <label label="◀" />
                    </button>
                    <button class="wallpaper-nav-btn" onClicked={next}>
                        <label label="▶" />
                    </button>
                </box>
                <button class="wallpaper-apply-btn" onClicked={() => {
                    const wp = currentWallpaper.get()
                    if (wp) applyWallpaper(wp)
                }}>
                    <label label="Apply" />
                </button>
            </box>
        </window>
    )
}
