#!/bin/bash

# Check if wget and unzip are installed
command -v wget >/dev/null 2>&1 || { echo >&2 "wget is required but not installed. Aborting."; exit 1; }
command -v unzip >/dev/null 2>&1 || { echo >&2 "unzip is required but not installed. Aborting."; exit 1; }

# Check if URL file is provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <url_file>"
    exit 1
fi

url_file=$1

# Create folders if they don't exist
mkdir -p crx_backup
mkdir -p crx_unpack

# Iterate through the URLs
while read -r url; do
    # Extract the filename from the URL
    filename=$(basename "$url")

    # Get the current UNIX time
    unixtime=$(date +%s)

    # Create backup folder structure
    backup_folder="crx_backup/$unixtime"
    mkdir -p "$backup_folder"

    # Download the CRX file
    wget "$url" -O "$backup_folder/$filename"

    # Generate hash
    sha256sum "$backup_folder/$filename" > "$backup_folder/$filename.hash"

    # Create unpack folder structure
    unpack_folder="crx_unpack/$unixtime"
    mkdir -p "$unpack_folder"

    # Unpack the CRX file
    unzip "$backup_folder/$filename" -d "$unpack_folder"

done < "$url_file"
