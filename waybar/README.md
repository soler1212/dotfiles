If GTK+ applications take 20 seconds to start, set this configuration in sway.conf
`exec dbus-update-activation-environment --systemd DISPLAY WAYLAND_DISPLAY SWAYSOCK`


More details here: github.com/swaywm/sway/issues/5732

> If some widget fails, the bar will dissapear, fix or disable the widgets that cause the problem


