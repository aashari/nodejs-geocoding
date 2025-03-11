# @aashari/nodejs-geocoding

[![GitHub package.json version](https://img.shields.io/github/package-json/v/aashari/nodejs-geocoding)](https://github.com/aashari/nodejs-geocoding/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js->=22.0.0-green.svg)](https://nodejs.org/)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/aashari/nodejs-geocoding/publish.yml?label=build)](https://github.com/aashari/nodejs-geocoding/actions/workflows/publish.yml)

A lightweight TypeScript/Node.js library for geocoding and reverse geocoding operations. This library allows you to:

- **Geocode**: Convert a formatted address to latitude and longitude coordinates
- **Reverse Geocode**: Convert latitude and longitude coordinates to a formatted address
- **Language Support**: Get results in different languages (e.g., English, Indonesian, etc.)

> ⚠️ **Disclaimer**: This library is not intended for commercial use. For production applications, please use the official [Google Maps API](https://developers.google.com/maps/documentation/geocoding/overview) instead.

## Features

- **Zero External Dependencies**: Lightweight and minimalist
- **TypeScript Support**: Full TypeScript definitions included
- **Promise-based API**: Modern async/await compatible
- **Multilingual**: Support for different languages in results
- **Reverse Geocoding**: Convert coordinates to addresses
- **Forward Geocoding**: Convert addresses to coordinates
- **Google Plus Codes**: Get Google Plus Codes for locations

## Installation

### From GitHub Packages

This package is distributed via GitHub Packages. To install it, create a `.npmrc` file in your project with:

```
@aashari:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with a GitHub Personal Access Token that has the `read:packages` scope.

Then install the package:

```bash
npm install @aashari/nodejs-geocoding
```

For more information on creating a Personal Access Token, see [GitHub's documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

## Usage

### Reverse Geocoding (Decode)

Convert latitude and longitude coordinates to a formatted address:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Decode latitude and longitude to formatted address
geocoding.decode(-6.170131, 106.8241607).then(result => {
    console.log(result);
});

// Using async/await
async function getAddress() {
    const result = await geocoding.decode(-6.170131, 106.8241607);
    console.log(result);
}
```

#### Example Output

```javascript
{
    latitude: -6.170131,
    longitude: 106.8241607,
    formatted_address: 'Gambir, Central Jakarta City, Jakarta',
    google_plus_code: 'RRHF+WMV Gambir, Central Jakarta City, Jakarta'
}
```

### Geocoding (Encode)

Convert a formatted address to latitude and longitude coordinates:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode formatted address to latitude and longitude
geocoding.encode("jalan merdeka utara no.3 jakarta").then(result => {
    console.log(result);
});

// Using async/await
async function getCoordinates() {
    const result = await geocoding.encode("jalan merdeka utara no.3 jakarta");
    console.log(result);
}
```

#### Example Output

```javascript
[
    {
        formatted_address: 'Jalan Medan Merdeka Utara No.3, RT.3/RW.2, Gambir, Central Jakarta City, Jakarta',
        latitude: -6.1715111,
        longitude: 106.8269598
    },
    {
        formatted_address: 'Jalan Medan Merdeka Utara, RT.3/RW.2, Gambir, Central Jakarta City, Jakarta',
        latitude: -6.1715111,
        longitude: 106.8269598
    }
]
```

### Language Support

You can specify the language for the geocoding results. The default language is English (`en`).

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode with Indonesian language
geocoding.encode("jalan merdeka utara no.3 jakarta", "id").then(result => {
    console.log(result);
});

// Decode with Indonesian language
geocoding.decode(-6.170131, 106.8241607, "id").then(result => {
    console.log(result);
});
```

#### Supported Language Codes

The library supports all language codes that Google Maps supports. Some examples:

- `en` - English (default)
- `id` - Indonesian
- `fr` - French
- `de` - German
- `ja` - Japanese
- `zh-CN` - Chinese (Simplified)

### TypeScript Usage

The package includes TypeScript definitions:

```typescript
import { encode, decode, Location } from '@aashari/nodejs-geocoding';

async function getLocationData() {
    // Decode (reverse geocoding)
    const address: Location | null = await decode(-6.170131, 106.8241607);
    
    // Encode (forward geocoding)
    const coordinates: Location[] = await encode("jalan merdeka utara no.3 jakarta");
    
    // With language parameter
    const localizedAddress: Location | null = await decode(-6.170131, 106.8241607, "id");
}
```

## API Reference

### `decode(latitude, longitude, language?)`

Converts latitude and longitude coordinates to a formatted address.

- **Parameters**:
  - `latitude` (number): The latitude coordinate
  - `longitude` (number): The longitude coordinate
  - `language` (string, optional): The language code (default: 'en')
- **Returns**: Promise<Location | null>

### `encode(formattedAddress, language?)`

Converts a formatted address to latitude and longitude coordinates.

- **Parameters**:
  - `formattedAddress` (string): The address to geocode
  - `language` (string, optional): The language code (default: 'en')
- **Returns**: Promise<Location[]>

### Location Interface

```typescript
interface Location {
    latitude?: number;
    longitude?: number;
    google_plus_code?: string;
    formatted_address?: string;
}
```

## Requirements

- **Node.js**: 22.x or higher
- **TypeScript**: 5.8 or higher (if using TypeScript)

## How It Works

This library works by making requests to Google Maps and parsing the response to extract the geocoding information. It doesn't use the official Google Maps API, which makes it suitable for non-commercial, low-volume applications.

The library:
1. Constructs a URL to Google Maps with the provided coordinates or address
2. Makes an HTTP request to that URL
3. Parses the response to extract the relevant geocoding information
4. Returns the structured data in a consistent format

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v2.2.0 (Latest)
- Updated all dependencies to their latest versions
- Improved geocoding functionality to handle changes in Google Maps response structure
- Updated target to ES2022 for better performance
- Added MIT license file and updated license references
- Configured for GitHub Packages deployment
- Added GitHub Actions workflow for automated publishing

### v2.1.0
- Bumped devDependencies versions

### v2.0.0
- Upgraded NodeJS version to 18.15.0

### v1.2.1
- Updated version on package.json

### v1.2.0
- Enabled support for language customization

### v1.1.0
- Fixed decode failed validation

### v1.0.0
- Initial Release

---

Made with ❤️ by [aashari](https://github.com/aashari)
