#!/bin/bash

# Get scratchpad windows count
scratchpad_windows=$(swaymsg -t get_tree | jq '.nodes[].nodes[] | select(.name=="__i3_scratch") | .nodes | length')

if [ "$scratchpad_windows" -eq 0 ]; then
    echo '{"text": "", "class": "none", "tooltip": "No windows in scratchpad"}'
elif [ "$scratchpad_windows" -eq 1 ]; then
    echo '{"text": "", "class": "one", "tooltip": "1 window in scratchpad"}'
else
    echo '{"text": "", "class": "many", "tooltip": "'$scratchpad_windows' windows in scratchpad"}'
fi
