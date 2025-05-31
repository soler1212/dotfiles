#!/bin/bash
# Automatic Display Configuration for Sway

# Get connected displays
get_displays() {
    swaymsg -t get_outputs | jq -r '.[] | select(.active) | .name'
}

# Check if external display is connected
has_external_display() {
    local displays=($(get_displays))
    [[ ${#displays[@]} -gt 1 ]]
}

# Apply display configuration based on connected displays
apply_config() {
    local laptop="eDP-1"
    local displays=($(get_displays))
    
    echo "Detected displays: ${displays[*]}"
    
    # Single display (laptop only)
    if [[ ${#displays[@]} -eq 1 ]]; then
        echo "Laptop only mode"
        swaymsg output "$laptop" enable
        swaymsg output "$laptop" scale 1
        notify-send "Display Configuration" "Laptop display only"
        
    # Dual display
    elif [[ ${#displays[@]} -eq 2 ]]; then
        local external=""
        for display in "${displays[@]}"; do
            if [[ "$display" != "$laptop" ]]; then
                external="$display"
                break
            fi
        done
        
        echo "Dual display mode with $external"
        
        # Detect resolution of external display
        local external_res=$(swaymsg -t get_outputs | jq -r ".[] | select(.name==\"$external\") | .modes[0] | \"\(.width)x\(.height)\"")
        
        # Configure based on external display type
        case "$external" in
            HDMI*)
                # Home setup - external on right
                swaymsg output "$laptop" pos 0 0 res 1366x768
                swaymsg output "$external" pos 1366 0 res "$external_res"
                notify-send "Display Configuration" "Home setup: External display on right"
                ;;
            DP*)
                # Office setup - external as primary
                swaymsg output "$external" pos 0 0 res "$external_res"
                swaymsg output "$laptop" pos "${external_res%x*}" 0 res 1366x768
                notify-send "Display Configuration" "Office setup: External display as primary"
                ;;
            *)
                # Default - extend right
                swaymsg output "$laptop" pos 0 0
                swaymsg output "$external" pos 1366 0
                notify-send "Display Configuration" "Extended display setup"
                ;;
        esac
        
    # More than 2 displays
    else
        echo "Multiple display mode"
        notify-send "Display Configuration" "Multiple displays detected - manual configuration may be needed"
    fi
    
    # Restart waybar to adjust to new display configuration
    pkill waybar
    waybar &
}

# Monitor for display changes
monitor_displays() {
    local last_state=$(get_displays | sort | md5sum)
    
    while true; do
        sleep 2
        local current_state=$(get_displays | sort | md5sum)
        
        if [[ "$current_state" != "$last_state" ]]; then
            echo "Display configuration changed"
            sleep 1  # Wait for display to stabilize
            apply_config
            last_state="$current_state"
        fi
    done
}

# Main
case "${1:-}" in
    "apply")
        apply_config
        ;;
    "monitor")
        echo "Monitoring display changes..."
        apply_config  # Apply initial configuration
        monitor_displays
        ;;
    *)
        echo "Usage: $0 {apply|monitor}"
        echo "  apply   - Apply display configuration once"
        echo "  monitor - Monitor and auto-configure display changes"
        exit 1
        ;;
esac
