# @aashari/nodejs-geocoding

[![GitHub package.json version](https://img.shields.io/github/package-json/v/aashari/nodejs-geocoding)](https://github.com/aashari/nodejs-geocoding/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js->=22.0.0-green.svg)](https://nodejs.org/)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/aashari/nodejs-geocoding/publish.yml?label=build)](https://github.com/aashari/nodejs-geocoding/actions/workflows/publish.yml)

## Overview

A lightweight TypeScript/Node.js library for geocoding and reverse geocoding operations with multilingual support. This library provides a simple, dependency-free solution for converting between addresses and geographic coordinates.

> ⚠️ **Disclaimer**: This library is intended for non-commercial, low-volume applications. For production or commercial use, please use the official [Google Maps API](https://developers.google.com/maps/documentation/geocoding/overview).

## Features

- **Zero External Dependencies**: Lightweight implementation with no third-party dependencies
- **TypeScript Support**: Full TypeScript definitions included for type safety
- **Promise-based API**: Modern async/await compatible interface
- **Multilingual Support**: Get results in different languages (e.g., English, Indonesian, French, etc.)
- **Forward Geocoding**: Convert addresses to coordinates (latitude/longitude)
- **Reverse Geocoding**: Convert coordinates to formatted addresses
- **Google Plus Codes**: Get Google Plus Codes for locations
- **Simple Integration**: Easy to integrate with any Node.js project

## Requirements

- **Node.js**: 22.0.0 or higher
- **TypeScript**: 5.8 or higher (if using TypeScript)

## Installation

This package is distributed via GitHub Packages. To install it, follow these steps:

**Install the package** using npm:

```bash
npm install @aashari/nodejs-geocoding
```

## Usage

### Geocoding (Encode)

Convert a formatted address to latitude and longitude coordinates:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode formatted address to latitude and longitude
geocoding.encode("jalan merdeka utara no.3 jakarta")
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error during geocoding:', error);
  });
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

### Reverse Geocoding (Decode)

Convert latitude and longitude coordinates to a formatted address:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Decode latitude and longitude to formatted address
geocoding.decode(-6.170131, 106.8241607)
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error during reverse geocoding:', error);
  });
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

### Language Support

You can specify the language for the geocoding results. The default language is English (`en`).

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode with Indonesian language
geocoding.encode("jalan merdeka utara no.3 jakarta", "id")
  .then(result => {
    console.log(result);
  });

// Decode with Indonesian language
geocoding.decode(-6.170131, 106.8241607, "id")
  .then(result => {
    console.log(result);
  });
```

#### Supported Language Codes

The library supports all language codes that Google Maps supports. Some common examples:

| Code    | Language             |
| ------- | -------------------- |
| `en`    | English (default)    |
| `id`    | Indonesian           |
| `fr`    | French               |
| `de`    | German               |
| `ja`    | Japanese             |
| `zh-CN` | Chinese (Simplified) |
| `es`    | Spanish              |
| `pt`    | Portuguese           |
| `ru`    | Russian              |
| `ar`    | Arabic               |

### TypeScript Usage

The package includes TypeScript definitions for type safety:

```typescript
import { encode, decode, Location } from '@aashari/nodejs-geocoding';

async function getLocationData() {
  try {
    // Decode (reverse geocoding)
    const address: Location | null = await decode(-6.170131, 106.8241607);

    // Encode (forward geocoding)
    const coordinates: Location[] = await encode("jalan merdeka utara no.3 jakarta");

    // With language parameter
    const localizedAddress: Location | null = await decode(-6.170131, 106.8241607, "id");

    console.log({ address, coordinates, localizedAddress });
  } catch (error) {
    console.error('Error:', error);
  }
}

getLocationData();
```

## API Reference

### encode()

Converts a formatted address to latitude and longitude coordinates.

```typescript
function encode(formattedAddress: string, language?: string): Promise<Location[]>
```

**Parameters**:

- `formattedAddress` (string): The address to geocode
- `language` (string, optional): The language code (default: 'en')

**Returns**: Promise<Location[]> - An array of Location objects containing the geocoding results

**Example**:

```javascript
const results = await geocoding.encode("jalan merdeka utara no.3 jakarta");
```

### decode()

Converts latitude and longitude coordinates to a formatted address.

```typescript
function decode(latitude: number, longitude: number, language?: string): Promise<Location | null>
```

**Parameters**:

- `latitude` (number): The latitude coordinate
- `longitude` (number): The longitude coordinate
- `language` (string, optional): The language code (default: 'en')

**Returns**: Promise<Location | null> - A Location object containing the reverse geocoding result, or null if no result is found

**Example**:

```javascript
const result = await geocoding.decode(-6.170131, 106.8241607);
```

### Location Interface

The Location interface defines the structure of location data returned by the library:

```typescript
interface Location {
    latitude?: number;       // The latitude coordinate
    longitude?: number;      // The longitude coordinate
    google_plus_code?: string; // The Google Plus Code for the location
    formatted_address?: string; // The formatted address
}
```

## How It Works

This library works by making requests to Google Maps and parsing the response to extract the geocoding information. It doesn't use the official Google Maps API, which makes it suitable for non-commercial, low-volume applications.

The process flow is as follows:

1. **Geocoding (encode)**:

   - Constructs a URL to Google Maps with the provided address
   - Makes an HTTP request to that URL
   - Parses the response to extract the geocoding information
   - Returns the structured data in a consistent format

2. **Reverse Geocoding (decode)**:
   - Constructs a URL to Google Maps with the provided coordinates
   - Makes an HTTP request to that URL
   - Extracts the Google Plus Code and formatted address from the response
   - Returns the structured data in a consistent format

## Examples

### Basic Usage

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Geocoding
geocoding.encode("Empire State Building, New York")
  .then(results => {
    console.log('Geocoding results:', results);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Reverse Geocoding
geocoding.decode(40.7484, -73.9857)
  .then(result => {
    console.log('Reverse geocoding result:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### With Language Parameter

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Geocoding in French
geocoding.encode("Tour Eiffel, Paris", "fr")
  .then(results => {
    console.log('Résultats de géocodage:', results);
  })
  .catch(error => {
    console.error('Erreur:', error);
  });

// Reverse Geocoding in Japanese
geocoding.decode(35.6895, 139.6917, "ja")
  .then(result => {
    console.log('リバースジオコーディング結果:', result);
  })
  .catch(error => {
    console.error('エラー:', error);
  });
```

### Using Async/Await

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

async function getLocationInfo() {
  try {
    // Geocoding
    const coordinates = await geocoding.encode("Colosseum, Rome");
    console.log('Coordinates:', coordinates);

    // Reverse Geocoding
    if (coordinates && coordinates.length > 0) {
      const { latitude, longitude } = coordinates[0];
      const address = await geocoding.decode(latitude, longitude);
      console.log('Address:', address);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

getLocationInfo();
```

### Error Handling

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

async function safeGeocode(address) {
  try {
    const results = await geocoding.encode(address);

    if (!results || results.length === 0) {
      console.log(`No results found for address: ${address}`);
      return null;
    }

    return results;
  } catch (error) {
    console.error(`Error geocoding address "${address}":`, error);
    return null;
  }
}

// Usage
safeGeocode("Invalid Address $%^&*")
  .then(results => {
    if (results) {
      console.log('Geocoding successful:', results);
    }
  });
```

## Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

Please make sure to update tests as appropriate and ensure all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

For a detailed changelog, please see the [CHANGELOG.md](CHANGELOG.md) file.

Recent updates:

- **v2.2.2** (2025-03-11): Improved package description, created separate CHANGELOG.md file
- **v2.2.1** (2025-03-11): Updated dependencies, Node.js requirement to 22.x, changed license to MIT
- **v2.2.0** (2025-03-11): Improved geocoding functionality, updated target to ES2022, added GitHub Packages deployment

---

Made with ❤️ by [aashari](https://github.com/aashari)
