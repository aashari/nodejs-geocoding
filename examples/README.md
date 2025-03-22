# Nodejs Geocoding Examples

This directory contains examples demonstrating how to use the `@aashari/nodejs-geocoding` package with both JavaScript and TypeScript.

## Examples Structure

The examples are organized into language-specific folders:

- [JavaScript Examples](./javascript/) - Examples using plain JavaScript
- [TypeScript Examples](./typescript/) - Examples using TypeScript with type definitions

## Getting Started

Each language subdirectory contains its own setup instructions and examples. Choose the example that matches your preferred language:

### For JavaScript Users

Navigate to the `javascript` directory and follow the README instructions there.

```bash
cd javascript
npm install
node index.js
```

### For TypeScript Users

Navigate to the `typescript` directory and follow the README instructions there.

```bash
cd typescript
npm install
npm start
```

## Examples Included

All examples demonstrate the same core functionality in their respective language:

1. **Basic Geocoding** - Converting an address to coordinates
2. **Geocoding with Language Parameter** - Getting results in a specific language
3. **Reverse Geocoding** - Converting coordinates to an address
4. **Reverse Geocoding with Language Parameter** - Getting results in a specific language

## Version Check

Each example directory includes a version check script to verify the installed package version and test basic functionality.

## Notes for TypeScript Users

The TypeScript examples demonstrate how to use the package with proper type annotations. The package includes TypeScript declarations, so no additional type definition packages are needed.

## Expected Output

The examples will output formatted JSON results showing:

- For geocoding: an array of locations with coordinates and formatted addresses
- For reverse geocoding: a location object with coordinates, formatted address, and Google Plus Code

## Additional Examples

Feel free to modify the examples or create new ones to experiment with different addresses or coordinates.
