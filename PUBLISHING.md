# Publishing to GitHub Packages

This package is automatically published to GitHub Packages using GitHub Actions.

## Automatic Publishing with GitHub Actions

The package is automatically published to GitHub Packages whenever a new GitHub Release is created. The workflow is defined in `.github/workflows/publish.yml`.

### How to Publish a New Version

1. Update the version in `package.json`
2. Commit and push your changes
3. Create a new tag:
   ```bash
   git tag -a vX.Y.Z -m "Version X.Y.Z"
   git push origin vX.Y.Z
   ```
4. Create a new release on GitHub:
   ```bash
   gh release create vX.Y.Z --title "Version X.Y.Z" --notes "Release notes for version X.Y.Z"
   ```

The GitHub Actions workflow will automatically build, test, and publish the package to GitHub Packages.

## Consuming the Package

To use this package in another project:

1. Create a `.npmrc` file in your project with:
   ```
   @aashari:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

2. Install the package:
   ```bash
   npm install @aashari/nodejs-geocoding
   ```

Replace `YOUR_GITHUB_TOKEN` with a GitHub Personal Access Token that has the `read:packages` scope. 