#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <dev|release>"
  exit 1
fi

# Set the crate variable
crate="app::main"

# Create a directory named "asms" if it doesn't exist
mkdir -p asms

# Check the value of the first argument
if [ "$1" == "dev" ]; then
  # If the argument is "dev," run the cargo build and cargo asm commands
  cargo build
  cargo asm "$crate" > asms/"$crate"_dev.asm
elif [ "$1" == "release" ]; then
  # If the argument is "release," run the cargo build --release and cargo asm commands
  cargo build --release
  cargo asm "$crate" > asms/"$crate"_release.asm
else
  echo "Invalid argument. Use 'dev' or 'release'."
  exit 1
fi
