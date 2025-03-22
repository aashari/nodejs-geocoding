# Nodejs Geocoding TypeScript Examples

This directory contains examples demonstrating how to use the `@aashari/nodejs-geocoding` package with TypeScript.

## Getting Started

To run these examples:

1. Navigate to this directory
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build and run the examples:
    ```bash
    npm start
    ```

## TypeScript Configuration

The examples use a basic TypeScript configuration defined in `tsconfig.json`. The configuration includes:

- Target: ES2020
- Module: CommonJS
- Strict type checking
- Output directory: `dist`

## Type Definitions

The package includes TypeScript type definitions, allowing you to use it seamlessly in TypeScript projects. These examples show how to import and use the types:

```typescript
import * as geocoding from '@aashari/nodejs-geocoding';
import { Location } from './types';

// With type annotations
geocoding.encode('Address').then((locations: Location[]) => {
	// ...
});
```

## Version Check

To verify that you're using the latest version of the package:

```bash
npm run test:version
```

## Examples Included

1. **Basic Geocoding** - Converting an address to coordinates
2. **Geocoding with Language Parameter** - Getting results in a specific language
3. **Reverse Geocoding** - Converting coordinates to an address
4. **Reverse Geocoding with Language Parameter** - Getting results in a specific language

All examples include proper TypeScript type annotations.

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Geocoding README](../../README.md)
