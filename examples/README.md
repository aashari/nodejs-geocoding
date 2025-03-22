# Nodejs Geocoding Examples

This directory contains examples demonstrating how to use the `@aashari/nodejs-geocoding` package.

## Getting Started

To run these examples:

1. Navigate to this directory
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the examples:
    ```bash
    npm start
    ```

## Version Check

To verify that you're using the latest version of the package:

```bash
npm run test:version
```

This will show the installed package version and run a simple test to confirm functionality.

## Examples Included

1. **Basic Geocoding** - Converting an address to coordinates
2. **Geocoding with Language Parameter** - Getting results in a specific language
3. **Reverse Geocoding** - Converting coordinates to an address
4. **Reverse Geocoding with Language Parameter** - Getting results in a specific language

## Expected Output

The examples will output formatted JSON results showing:

- For geocoding: an array of locations with coordinates and formatted addresses
- For reverse geocoding: a location object with coordinates, formatted address, and Google Plus Code

## Additional Examples

Feel free to modify the examples or create new ones to experiment with different addresses or coordinates.
