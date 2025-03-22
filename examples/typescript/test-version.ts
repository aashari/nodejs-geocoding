import * as geocoding from '@aashari/nodejs-geocoding';
import { Location } from './types';
// We need to use require for package.json since it's not a module with types
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageInfo = require('@aashari/nodejs-geocoding/package.json');

// Print the currently used package version
console.log('Nodejs Geocoding Package Version Check (TypeScript)');
console.log('================================================\n');

console.log(`Using nodejs-geocoding version: ${packageInfo.version}`);

// Simple test to ensure the package is working
console.log('\nPerforming a simple test...');
geocoding
	.encode('Eiffel Tower, Paris')
	.then((locations: Location[]) => {
		console.log('Successfully connected and received results:');
		console.log(`Found ${locations.length} locations`);
		console.log('\nFirst result:');
		console.log(JSON.stringify(locations[0], null, 2));
	})
	.catch((error: Error) => {
		console.error('Error:', error);
	});
