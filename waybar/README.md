If GTK+ applications take 20 seconds to start, add this to the sway conf:
`exec dbus-update-activation-environment --systemd DISPLAY WAYLAND_DISPLAY SWAYSOCK


More datils in: github.com/swaywm/sway/issues/5732
