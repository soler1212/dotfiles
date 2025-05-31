#!/bin/bash
# Enhanced Wallpaper Manager for Sway

# Configuration
WALLPAPER_DIR="${HOME}/.config/sway/wallpapers"
CONFIG_DIR="${HOME}/.config/sway"
STATE_FILE="${CONFIG_DIR}/.wallpaper_state"
MODE="sequential"  # Options: sequential, random, time-based

# Create directories if they don't exist
mkdir -p "$WALLPAPER_DIR"
mkdir -p "$CONFIG_DIR"

# Function to get wallpapers
get_wallpapers() {
    find "$WALLPAPER_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | sort
}

# Function to set wallpaper
set_wallpaper() {
    local wallpaper="$1"
    if [[ -f "$wallpaper" ]]; then
        swaymsg "output * bg '$wallpaper' fill"
        echo "$wallpaper" > "$STATE_FILE"
        notify-send -t 2000 "Wallpaper Changed" "$(basename "$wallpaper")" -i "$wallpaper"
    fi
}

# Function for sequential mode
sequential_mode() {
    local wallpapers=($(get_wallpapers))
    local count=${#wallpapers[@]}
    
    if [[ $count -eq 0 ]]; then
        echo "No wallpapers found in $WALLPAPER_DIR"
        exit 1
    fi
    
    local current_index=0
    if [[ -f "$STATE_FILE" ]]; then
        local current_wallpaper=$(cat "$STATE_FILE")
        for i in "${!wallpapers[@]}"; do
            if [[ "${wallpapers[$i]}" == "$current_wallpaper" ]]; then
                current_index=$i
                break
            fi
        done
    fi
    
    local next_index=$(( (current_index + 1) % count ))
    set_wallpaper "${wallpapers[$next_index]}"
}

# Function for random mode
random_mode() {
    local wallpapers=($(get_wallpapers))
    local count=${#wallpapers[@]}
    
    if [[ $count -eq 0 ]]; then
        echo "No wallpapers found in $WALLPAPER_DIR"
        exit 1
    fi
    
    local random_index=$((RANDOM % count))
    set_wallpaper "${wallpapers[$random_index]}"
}

# Function for time-based mode
time_based_mode() {
    local hour=$(date +%H)
    local wallpapers=($(get_wallpapers))
    
    # Define time periods (customize as needed)
    if (( hour >= 6 && hour < 12 )); then
        # Morning
        pattern="morning"
    elif (( hour >= 12 && hour < 18 )); then
        # Afternoon
        pattern="afternoon"
    elif (( hour >= 18 && hour < 22 )); then
        # Evening
        pattern="evening"
    else
        # Night
        pattern="night"
    fi
    
    # Find wallpapers matching the pattern
    local matched_wallpapers=()
    for wp in "${wallpapers[@]}"; do
        if [[ $(basename "$wp") == *"$pattern"* ]]; then
            matched_wallpapers+=("$wp")
        fi
    done
    
    # If no matches, use all wallpapers
    if [[ ${#matched_wallpapers[@]} -eq 0 ]]; then
        matched_wallpapers=("${wallpapers[@]}")
    fi
    
    # Select random from matched
    if [[ ${#matched_wallpapers[@]} -gt 0 ]]; then
        local random_index=$((RANDOM % ${#matched_wallpapers[@]}))
        set_wallpaper "${matched_wallpapers[$random_index]}"
    fi
}

# Main script logic
case "${1:-}" in
    "next")
        MODE="sequential"
        sequential_mode
        ;;
    "random")
        MODE="random"
        random_mode
        ;;
    "time")
        MODE="time-based"
        time_based_mode
        ;;
    "set")
        if [[ -n "$2" ]]; then
            set_wallpaper "$2"
        else
            echo "Usage: $0 set <wallpaper_path>"
            exit 1
        fi
        ;;
    "daemon")
        # Run as daemon, changing wallpaper every 30 minutes
        interval="${2:-1800}"
        while true; do
            case "$MODE" in
                "sequential") sequential_mode ;;
                "random") random_mode ;;
                "time-based") time_based_mode ;;
            esac
            sleep "$interval"
        done
        ;;
    *)
        # Default behavior
        sequential_mode
        ;;
esac
