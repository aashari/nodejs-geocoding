const geocoding = require('@aashari/nodejs-geocoding');

// Print the currently used package version
console.log('Nodejs Geocoding Package Version Check');
console.log('====================================\n');

// Try to access the package version if available
const packageInfo = require('@aashari/nodejs-geocoding/package.json');
console.log(`Using nodejs-geocoding version: ${packageInfo.version}`);

// Simple test to ensure the package is working
console.log('\nPerforming a simple test...');
geocoding
	.encode('Eiffel Tower, Paris')
	.then((locations) => {
		console.log('Successfully connected and received results:');
		console.log(`Found ${locations.length} locations`);
		console.log('\nFirst result:');
		console.log(JSON.stringify(locations[0], null, 2));
	})
	.catch((error) => {
		console.error('Error:', error);
	});
