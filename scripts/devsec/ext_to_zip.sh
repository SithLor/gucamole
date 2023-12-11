#!/bin/bash

# Check if the correct number of command-line arguments is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

directory="$1"

# Change to the specified directory
cd "$directory" || exit

# Rename all .crx files to .zip
for file in *.crx; do
  new_file="${file%.crx}.zip"
  mv "$file" "$new_file"
  echo "File $file renamed to $new_file successfully."
done