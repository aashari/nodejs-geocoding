# @aashari/nodejs-geocoding

[![npm version](https://img.shields.io/npm/v/@aashari/nodejs-geocoding.svg)](https://www.npmjs.com/package/@aashari/nodejs-geocoding)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js->=22.0.0-green.svg)](https://nodejs.org/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/aashari/nodejs-geocoding/ci-semantic-release.yml?label=build)](https://github.com/aashari/nodejs-geocoding/actions/workflows/ci-semantic-release.yml)

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

## Installation

```bash
npm install @aashari/nodejs-geocoding
```

## Quick Start

### Geocoding (Address to Coordinates)

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Convert address to coordinates
geocoding
	.encode('Empire State Building, New York')
	.then((locations) => console.log(locations))
	.catch((error) => console.error(error));
```

### Reverse Geocoding (Coordinates to Address)

```javascript
const geocoding = require('@aashari/nodejs-geocoding');

// Convert coordinates to address
geocoding
	.decode(40.7484, -73.9857)
	.then((location) => console.log(location))
	.catch((error) => console.error(error));
```

## API Reference

### encode(address, language?)

Converts an address string to geographic coordinates.

```typescript
function encode(
	formattedAddress: string,
	language?: string = 'en',
): Promise<Location[]>;
```

**Returns**: Array of location objects with coordinates and formatted address.

### decode(latitude, longitude, language?)

Converts geographic coordinates to an address.

```typescript
function decode(
	latitude: number,
	longitude: number,
	language?: string = 'en',
): Promise<Location | null>;
```

**Returns**: Location object with formatted address and Google Plus Code, or null if not found.

### Location Interface

```typescript
interface Location {
	latitude?: number;
	longitude?: number;
	google_plus_code?: string;
	formatted_address?: string;
}
```

## Language Support

Specify a language code as the last parameter to get results in different languages:

```javascript
// Get results in French
geocoding
	.encode('Tour Eiffel, Paris', 'fr')
	.then((locations) => console.log(locations));

// Get results in Japanese
geocoding
	.decode(35.6895, 139.6917, 'ja')
	.then((location) => console.log(location));
```

Supports all language codes that Google Maps supports (e.g., `en`, `fr`, `de`, `ja`, `zh-CN`, `es`, etc.)

## Example Output

### Geocoding Result

```javascript
[
	{
		formatted_address:
			'Empire State Building, 20 W 34th St, New York, NY 10001, United States',
		latitude: 40.7484405,
		longitude: -73.9856644,
	},
];
```

### Reverse Geocoding Result

```javascript
{
	latitude: 40.7484,
	longitude: -73.9857,
	formatted_address: 'Empire State Building, 20 W 34th St, New York, NY 10001, United States',
	google_plus_code: '87G8Q2M4+96'
}
```

## Using with TypeScript

```typescript
import { encode, decode, Location } from '@aashari/nodejs-geocoding';

async function getLocationData(): Promise<void> {
	try {
		// Forward geocoding
		const locations: Location[] = await encode('Tokyo Tower, Japan');

		// Reverse geocoding
		if (locations.length > 0) {
			const { latitude, longitude } = locations[0];
			const address: Location | null = await decode(latitude, longitude);
			console.log(address);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
```

## Advanced Usage Examples

### With Async/Await

```javascript
async function getLocationInfo() {
	try {
		// Geocoding
		const coordinates = await geocoding.encode('Colosseum, Rome');
		console.log('Coordinates:', coordinates);

		// Reverse Geocoding using the first result
		if (coordinates && coordinates.length > 0) {
			const { latitude, longitude } = coordinates[0];
			const address = await geocoding.decode(latitude, longitude);
			console.log('Address:', address);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
```

### Error Handling

```javascript
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
```

## License

This project is licensed under the MIT License.

---

Made with ❤️ by [aashari](https://github.com/aashari)
