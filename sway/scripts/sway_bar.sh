#!/bin/bash

# Improved waybar script with proper error handling and optimization

################
# Configuration
################
KEYBOARD_INPUT="1:1:AT_Translated_Set_2_keyboard"
PING_HOST="8.8.8.8"  # More reliable than www.google.es

################
# Helper functions
################
get_active_sink() {
    pactl list sinks short | awk '/RUNNING/ {print $1; exit}'
}

safe_command() {
    local cmd="$1"
    local fallback="${2:-N/A}"
    eval "$cmd" 2>/dev/null || echo "$fallback"
}

################
# Data collection
################
# Date/time - most reliable, do first
date_and_week=$(date "+%Y/%m/%d (w%-V)")
current_time=$(date "+%H:%M")

# Battery info (cache upower output)
battery_info=$(upower --show-info $(upower --enumerate | grep 'BAT') 2>/dev/null)
if [[ -n "$battery_info" ]]; then
    battery_charge=$(echo "$battery_info" | awk '/percentage/ {print $2}')
    battery_status=$(echo "$battery_info" | awk '/state/ {print $2}')
    battery_pluggedin=$([[ "$battery_status" == "discharging" ]] && echo '⚠' || echo '⚡')
else
    battery_charge="N/A"
    battery_pluggedin='🔌'
fi

# Audio (cache sink info)
active_sink=$(get_active_sink)
if [[ -n "$active_sink" ]]; then
    audio_volume=$(safe_command "pamixer --sink $active_sink --get-volume" "0")
    audio_is_muted=$(safe_command "pamixer --sink $active_sink --get-mute" "false")
    audio_active=$([[ "$audio_is_muted" == "true" ]] && echo '🔇' || echo '🔊')
else
    audio_volume="N/A"
    audio_active='🔇'
fi

# Media
media_artist=$(safe_command "playerctl metadata artist" "")
media_song=$(safe_command "playerctl metadata title" "")
player_status=$(safe_command "playerctl status" "Stopped")

case "$player_status" in
    "Playing") song_status='▶' ;;
    "Paused") song_status='⏸' ;;
    *) song_status='⏹' ;;
esac

# Network
network=$(ip route get 1.1.1.1 2>/dev/null | grep -oP '(?<=dev\s)\w+' | head -1)
if [[ -n "$network" ]]; then
    # Simplified interface name detection
    interface_display=$(ip link show "$network" 2>/dev/null | head -1 | cut -d: -f2 | tr -d ' ' || echo "$network")
    ping_time=$(safe_command "ping -c 1 -W 2 $PING_HOST | tail -1 | awk '{print \$4}' | cut -d '/' -f 2 | cut -d '.' -f 1" "∞")
    network_active="⇆"
else
    interface_display="disconnected"
    ping_time="∞"
    network_active="⛔"
fi

# System load
loadavg_5min=$(awk '{print $2}' /proc/loadavg)

# Keyboard layout (simplified)
language=$(safe_command "swaymsg -rt get_inputs | jq -r '.[] | select(.identifier==\"$KEYBOARD_INPUT\") | .xkb_active_layout_name'" "EN")

################
# Output
################
echo "🎧 $song_status $media_artist - $media_song | ⌨ $language | $network_active $interface_display ($ping_time ms) | 🏋 $loadavg_5min | $audio_active $audio_volume% | $battery_pluggedin $battery_charge | $date_and_week 🕘 $current_time"
