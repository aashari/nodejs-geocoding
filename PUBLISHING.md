# Publishing to GitHub Packages

This guide explains how to publish this package to GitHub Packages.

## Prerequisites

1. You need a GitHub Personal Access Token (PAT) with the following scopes:
   - `read:packages`
   - `write:packages`
   - `delete:packages`
   - `repo`

## Setup

1. Create a `.npmrc` file in your home directory:

```bash
echo "@aashari:registry=https://npm.pkg.github.com" > ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT" >> ~/.npmrc
```

Replace `YOUR_GITHUB_PAT` with your GitHub Personal Access Token.

2. Create a `.npmrc` file in the project directory:

```bash
echo "@aashari:registry=https://npm.pkg.github.com" > .npmrc
```

## Publishing

Once you have set up authentication, you can publish the package:

```bash
npm publish
```

## Consuming the Package

To use this package in another project, add the following to your project's `.npmrc` file:

```
@aashari:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Then install the package:

```bash
npm install @aashari/nodejs-geocoding
``` 