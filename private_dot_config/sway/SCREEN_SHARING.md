# Screen Sharing on Sway: Troubleshooting & Manual

This guide explains how screen sharing works in this Sway configuration and how the `portal-setup.sh` script fixes common issues where "Full Screen" or "Monitor" sharing is missing in apps like Teams, Google Meet, or Telegram.

## 1. How it Works (The Architecture)

Screen sharing on Wayland doesn't work like on X11. It uses a secure "Portal" system:

1.  **The App** (e.g., Zen Browser, Telegram) asks for a screen via the **DBus** interface `org.freedesktop.portal.ScreenCast`.
2.  **xdg-desktop-portal** (the main "router") receives the request.
3.  **The Backend** (`xdg-desktop-portal-wlr`) is selected by the router based on your `XDG_CURRENT_DESKTOP=sway` environment variable.
4.  **PipeWire** handles the actual video stream between the Sway compositor and the application.

### Why it fails (The "Full Screen" problem)
On Ubuntu-based systems, multiple backends (GNOME, GTK, WLR) often compete. If the GNOME backend starts first, it tries to handle the request but fails because it can't "talk" to the Sway compositor. This results in missing options or a blank screen.

---

## 2. The Solution: `portal-setup.sh`

This script is located in `~/.config/sway/scripts/portal-setup.sh` and is called automatically when Sway starts.

### What the script does:
```bash
#!/bin/bash
sleep 1 # Wait for Sway to be ready

# 1. Clear the environment
systemctl --user stop xdg-desktop-portal-wlr
systemctl --user stop xdg-desktop-portal-gtk
systemctl --user stop xdg-desktop-portal-gnome
systemctl --user stop xdg-desktop-portal

# 2. Force Priority
systemctl --user start xdg-desktop-portal-wlr # Start the Sway-compatible backend first
sleep 1
systemctl --user start xdg-desktop-portal     # Start the main router
```

**Why we do this:** By stopping all portals and starting the `wlr` (wlroots) one first, we ensure it "registers" itself as the primary provider for screen casting before the other (incompatible) backends can interfere.

---

## 3. Application Setup

### Zen Browser / Firefox
1.  Open `about:config` in the address bar.
2.  Search for `media.webrtc.pipewire.enabled` and set it to **true**.
3.  Search for `widget.wayland.enabled` and set it to **true**.

### Telegram / Teams (Flatpak)
If you use Flatpak versions, ensure they have permission to access the portal:
```bash
flatpak override --user --talk-name=org.freedesktop.portal.Desktop <app-id>
```

---

## 4. Troubleshooting

### "I click share and nothing happens"
Check if the portal is running:
```bash
systemctl --user status xdg-desktop-portal-wlr
```
If it's not active, run the setup script manually:
```bash
~/.config/sway/scripts/portal-setup.sh
```

### "Compositor doesn't support zwlr_screencopy_manager_v1"
This usually means the `WAYLAND_DISPLAY` variable wasn't passed to the portal. The `sway/config` now handles this with:
```sway
exec dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP=sway
```
This command must run **before** the portals start.

### Selecting a screen
When you share your "Full Screen", Sway might use `slurp` (a selection tool). 
- Your screen will dim.
- **Click** on the monitor you want to share.
- The sharing will then begin in your browser/app.
