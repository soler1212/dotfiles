#!/usr/bin/env python3
"""System monitoring script using psutil."""

import psutil
import time
import argparse
from datetime import datetime


def format_bytes(bytes_val):
    """Convert bytes to human readable format."""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes_val < 1024.0:
            return f"{bytes_val:.1f} {unit}"
        bytes_val /= 1024.0
    return f"{bytes_val:.1f} PB"


def get_cpu_info():
    """Get CPU usage information."""
    return {
        'percent': psutil.cpu_percent(interval=1),
        'count': psutil.cpu_count(),
        'per_cpu': psutil.cpu_percent(interval=0, percpu=True),
    }


def get_memory_info():
    """Get memory usage information."""
    mem = psutil.virtual_memory()
    return {
        'total': format_bytes(mem.total),
        'available': format_bytes(mem.available),
        'used': format_bytes(mem.used),
        'percent': mem.percent,
    }


def get_disk_info():
    """Get disk usage information."""
    partitions = []
    for partition in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(partition.mountpoint)
            partitions.append({
                'device': partition.device,
                'mountpoint': partition.mountpoint,
                'fstype': partition.fstype,
                'total': format_bytes(usage.total),
                'used': format_bytes(usage.used),
                'free': format_bytes(usage.free),
                'percent': usage.percent,
            })
        except PermissionError:
            continue
    return partitions


def get_network_info():
    """Get network I/O information."""
    net = psutil.net_io_counters()
    return {
        'bytes_sent': format_bytes(net.bytes_sent),
        'bytes_recv': format_bytes(net.bytes_recv),
        'packets_sent': net.packets_sent,
        'packets_recv': net.packets_recv,
    }


def main():
    parser = argparse.ArgumentParser(description='System monitoring tool')
    parser.add_argument('-c', '--continuous', action='store_true', help='Run continuously')
    parser.add_argument('-i', '--interval', type=int, default=2, help='Update interval in seconds')
    args = parser.parse_args()

    print(f"System Monitor - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    while True:
        print(f"\nCPU: {get_cpu_info()['percent']}%")
        print(f"Memory: {get_memory_info()['used']} / {get_memory_info()['total']} ({get_memory_info()['percent']}%)")

        print("\nDisk Usage:")
        for disk in get_disk_info():
            print(f"  {disk['mountpoint']}: {disk['used']} / {disk['total']} ({disk['percent']}%)")

        print(f"\nNetwork: Sent={get_network_info()['bytes_sent']}, Recv={get_network_info()['bytes_recv']}")

        if not args.continuous:
            break
        time.sleep(args.interval)


if __name__ == '__main__':
    main()
