#!/bin/bash
# Script to ensure xdg-desktop-portal-wlr is the primary portal for Sway screen sharing

# Wait a moment for Sway to be fully ready
sleep 1

# Stop all portal services to start fresh
systemctl --user stop xdg-desktop-portal-wlr
systemctl --user stop xdg-desktop-portal-gtk
systemctl --user stop xdg-desktop-portal-gnome
systemctl --user stop xdg-desktop-portal

# Start xdg-desktop-portal-wlr first so it has priority for wlroots-based interfaces
systemctl --user start xdg-desktop-portal-wlr

# Wait for wlr portal to be ready
sleep 1

# Start the main portal
systemctl --user start xdg-desktop-portal
