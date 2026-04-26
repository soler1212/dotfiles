#!/bin/bash
# wallpaper_dir=$HOME/Pictures/Wallpapers
# wallpapers=($(ls -1 $wallpaper_dir))
# next_wall=$((0 + $RANDOM % ${#wallpapers[@]}))
# swaymsg "output * bg $wallpaper_dir/${wallpapers[$next_wall]} fill"



# Directory containing wallpapers
#wallpaper_dir="$HOME/Pictures/Wallpapers"
wallpaper_dir="$HOME/.config/sway/images"

# File to store the current wallpaper index
index_file="$HOME/.config/sway/images/.current_wallpaper_index"

# List all wallpapers in the directory
wallpapers=($(ls -1 "$wallpaper_dir"))

# Get the total number of wallpapers
num_wallpapers=${#wallpapers[@]}

# Check if index file exists, create it with initial index 0 if not
if [[ ! -f "$index_file" ]]; then
    echo 0 > "$index_file"
fi

# Read the current index
current_index=$(cat "$index_file")

# Increment the index and wrap around if necessary
next_index=$(( (current_index + 1) % num_wallpapers ))

# Save the new index
echo $next_index > "$index_file"

# Set the wallpaper using swaymsg
swaymsg "output * bg $wallpaper_dir/${wallpapers[$next_index]} fill"
