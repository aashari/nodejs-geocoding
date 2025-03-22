const geocoding = require('@aashari/nodejs-geocoding');

console.log('Nodejs Geocoding Examples');
console.log('=========================\n');

// Example 1: Geocoding - convert address to coordinates
console.log('Example 1: Geocoding (Address to Coordinates)');
console.log('---------------------------------------------');
geocoding
	.encode('Empire State Building, New York')
	.then((locations) => {
		console.log('Results:');
		console.log(JSON.stringify(locations, null, 2));
		console.log('\n');
	})
	.catch((error) => {
		console.error('Error:', error);
	});

// Example 2: Geocoding with language parameter
console.log('Example 2: Geocoding with Language Parameter');
console.log('-------------------------------------------');
geocoding
	.encode('Tour Eiffel, Paris', 'fr')
	.then((locations) => {
		console.log('Results (in French):');
		console.log(JSON.stringify(locations, null, 2));
		console.log('\n');
	})
	.catch((error) => {
		console.error('Error:', error);
	});

// Example 3: Reverse Geocoding - convert coordinates to address
console.log('Example 3: Reverse Geocoding (Coordinates to Address)');
console.log('----------------------------------------------------');
geocoding
	.decode(40.7484, -73.9857)
	.then((location) => {
		console.log('Result:');
		console.log(JSON.stringify(location, null, 2));
		console.log('\n');
	})
	.catch((error) => {
		console.error('Error:', error);
	});

// Example 4: Reverse Geocoding with language parameter
console.log('Example 4: Reverse Geocoding with Language Parameter');
console.log('---------------------------------------------------');
geocoding
	.decode(35.6895, 139.6917, 'ja')
	.then((location) => {
		console.log('Result (in Japanese):');
		console.log(JSON.stringify(location, null, 2));
	})
	.catch((error) => {
		console.error('Error:', error);
	});
