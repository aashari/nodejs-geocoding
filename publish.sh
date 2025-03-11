#!/bin/bash

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI is not installed. Please install it first:"
    echo "https://cli.github.com/manual/installation"
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "You are not logged in to GitHub. Please login first:"
    gh auth login
fi

# Create temporary .npmrc file with GitHub token
echo "@aashari:registry=https://npm.pkg.github.com" > .npmrc
echo "//npm.pkg.github.com/:_authToken=$(gh auth token)" >> .npmrc

# Publish the package
echo "Publishing package to GitHub Packages..."
npm publish

# Clean up - remove token from .npmrc
echo "@aashari:registry=https://npm.pkg.github.com" > .npmrc

echo "Package published successfully!" 