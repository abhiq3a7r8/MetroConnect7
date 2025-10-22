#!/bin/bash
# Script to run tree while ignoring common folders/files

IGNORE_PATTERN="node_modules|.expo|dist|web-build|expo-env.d.ts|.kotlin|*.orig.*|*.jks|*.p8|*.p12|*.key|*.mobileprovision|.metro-health-check*|npm-debug.*|yarn-debug.*|yarn-error.*|.DS_Store|*.pem|.env*.local|*.tsbuildinfo|app-example|android"

DIR="${1:-.}"

tree -I "$IGNORE_PATTERN" "$DIR"
