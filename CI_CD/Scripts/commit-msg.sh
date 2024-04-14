#!/bin/bash
#Bash Script to make sure users commit in format : "#[A-Z][A-Z]-[0-9][0-9]+"
#Makes all commits in clean order that follows story count
#To be implemented in Jenkins. Can also be python script

# Get the proposed commit message file
message_file="$1"

# Read the message content
message=$(cat "$message_file")

# Regex pattern for the desired format
pattern="^#[A-Z][A-Z]-[0-9][0-9]+$"

# Check if the message matches the pattern
if [[ ! $message =~ $pattern ]]; then
  echo "Error: Invalid commit message format."
  echo "The message must start with '#', followed by two uppercase letters, a hyphen, and two or more digits (e.g., #AA-11)."
  exit 1  # Exit with non-zero to abort commit
fi

exit 0  # Exit with zero to allow commit