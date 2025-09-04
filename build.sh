#!/usr/bin/env bash
# exit on error
set -o errexit

# Install system dependencies
apt-get update
apt-get install -y python3-opencv

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt 