# @aashari/nodejs-geocoding

[![npm version](https://img.shields.io/npm/v/@aashari/nodejs-geocoding.svg)](https://www.npmjs.com/package/@aashari/nodejs-geocoding)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-21.x-green.svg)](https://nodejs.org/)

A lightweight Node.js library for geocoding and reverse geocoding operations. This library allows you to:

- **Geocode**: Convert a formatted address to latitude and longitude coordinates
- **Reverse Geocode**: Convert latitude and longitude coordinates to a formatted address

> ⚠️ **Disclaimer**: This library is not intended for commercial use. For production applications, please use the official [Google Maps API](https://developers.google.com/maps/documentation/geocoding/overview) instead.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Reverse Geocoding (Decode)](#reverse-geocoding-decode)
  - [Geocoding (Encode)](#geocoding-encode)
  - [Language Support](#language-support)
- [API Reference](#api-reference)
- [Requirements](#requirements)
- [License](#license)

## Installation

You can install the package using npm or yarn:

```bash
# Using npm
npm install @aashari/nodejs-geocoding

# Using yarn
yarn add @aashari/nodejs-geocoding
```

## Usage

### Reverse Geocoding (Decode)

Convert latitude and longitude coordinates to a formatted address:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Decode latitude and longitude to formatted address
geocoding.decode(-6.170131, 106.8241607).then(result => {
    console.log(result);
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

### Geocoding (Encode)

Convert a formatted address to latitude and longitude coordinates:

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode formatted address to latitude and longitude
geocoding.encode("jalan merdeka utara no.3 jakarta").then(result => {
    console.log(result);
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

### Language Support

You can specify the language for the geocoding results. The default language is English (`en`).

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Encode with Indonesian language
geocoding.encode("jalan merdeka utara no.3 jakarta", "id").then(result => {
    console.log(result);
});
```

#### Example Output with Indonesian Language

```javascript
[
    {
        latitude: -6.1704643,
        longitude: 106.82651399999999,
        formatted_address: 'Jalan Medan Merdeka Utara No.3, RT.3/RW.2, Gambir, Kota Jakarta Pusat, Jakarta'
    },
    {
        latitude: -6.1714815,
        longitude: 106.8269598,
        formatted_address: 'Jalan Medan Merdeka Utara, RT.3/RW.2, Gambir, Kota Jakarta Pusat, Jakarta'
    }
]
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

- Node.js 18.x or higher
- TypeScript 4.9 or higher (if using TypeScript)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [aashari](https://github.com/aashari)
