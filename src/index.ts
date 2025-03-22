import { Location } from './location.interface';
import { get } from './request.handler';

// Package version - will be updated automatically by the release process
export const VERSION = '2.7.1';

// Define types for the JSON response
type GoogleMapsJsonResponse = Record<string, unknown>;

const tryParseJSON = (json: string): GoogleMapsJsonResponse | null => {
	try {
		return JSON.parse(json);
	} catch {
		// Ignore parsing errors and return null
		return null;
	}
};

export async function encode(
	formattedAddress: string,
	language: string = 'en',
): Promise<Location[]> {
	let locationList: (Location | null)[] = [];

	const googleResponse = await get(
		`https://www.google.com/s?gs_ri=maps&authuser=0&hl=${language}&pb=!2i15!4m12!1m3!1d39925620.84463408!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1015!2i939!4f13.1!7i20!10b1!12m8!1m1!18b1!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m3!1s_lJEYqe4D8_F4-EP4o-HoAM!3b1!7e81!23m2!4b1!10b1!24m65!1m21!13m8!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!18m11!3b1!4b1!5b1!6b1!9b1!12b1!13b1!14b1!15b1!17b1!20b1!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!43b1!52b1!54m1!1b1!55b1!56m2!1b1!3b1!65m5!3m4!1m3!1m2!1i224!2i298!71b1!72m4!1m2!3b1!5b1!4b1!89b1!26m4!2m3!1i80!2i92!4i8!34m17!2b1!3b1!4b1!6b1!8m5!1b1!3b1!4b1!5b1!6b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!37m1!1e81!47m0!49m5!3b1!6m1!1b1!7m1!1e3!67m2!7b1!10b1!69i596&q=${encodeURI(formattedAddress)}`,
	);

	const rawCleaningFiltered: GoogleMapsJsonResponse[] = googleResponse
		?.split('\n')
		.map((line) => tryParseJSON(line.trim()))
		.filter((json): json is GoogleMapsJsonResponse => json !== null);

	if (
		!rawCleaningFiltered[0] ||
		!Array.isArray(rawCleaningFiltered[0][0]) ||
		!Array.isArray(rawCleaningFiltered[0][0][1])
	) {
		return [];
	}

	// Type assertion for the specific structure we're working with
	type ItemDetailed = {
		0: Array<string>;
		11: Array<string>;
		[key: number]: unknown;
	};

	type MapItem = {
		22: ItemDetailed;
		[key: number]: unknown;
	};

	locationList = (rawCleaningFiltered[0][0][1] as unknown as MapItem[]).map(
		(item) => {
			const itemDetailed = item[22];
			if (!itemDetailed) return null;

			if (!itemDetailed[0] || !itemDetailed[0][0]) return null;
			if (
				!itemDetailed[11] ||
				!itemDetailed[11][2] ||
				!itemDetailed[11][3]
			)
				return null;

			const formattedAddress = itemDetailed[0][0].toString().trim();
			const latitude = itemDetailed[11][2].toString().trim();
			const longitude = itemDetailed[11][3].toString().trim();

			return {
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				formatted_address: formattedAddress,
			} as Location;
		},
	);

	return locationList.filter(
		(location): location is Location => location !== null,
	);
}

export async function decode(
	latitude: number,
	longitude: number,
	language: string = 'en',
): Promise<Location | null> {
	const location: Location = {
		latitude: latitude,
		longitude: longitude,
	};

	const googleResponse = await get(
		`https://www.google.com/maps/search/?api=1&hl=${language}&query=${location.latitude}%2C${location.longitude}`,
	);

	// Extract Google Plus Code and formatted address from the response
	const plusCodePattern = new RegExp(
		`([A-Z0-9]{4}\\+[A-Z0-9]{2,3}\\s[^"<>]+)`,
	);
	const plusCodeMatch = googleResponse.match(plusCodePattern);

	if (plusCodeMatch && plusCodeMatch[1]) {
		location.google_plus_code = plusCodeMatch[1].split('\\')[0]; // Remove any escape characters

		// Extract the location name from the Google Plus Code (e.g., "Gambir, Central Jakarta City, Jakarta")
		const locationParts = location.google_plus_code.split(' ');
		if (locationParts.length > 1) {
			locationParts.shift(); // Remove the actual plus code
			location.formatted_address = locationParts.join(' ');
		}
	}

	// If we couldn't extract the formatted address from the Google Plus Code,
	// try to extract it from meta tags
	if (!location.formatted_address) {
		const metaTagPattern =
			/<meta[^>]*content=['"]([^'"]*\d+°\d+&#39;\d+\.\d+"[^'"]*)['"]/;
		const metaTagMatch = googleResponse.match(metaTagPattern);

		if (metaTagMatch && metaTagMatch[1]) {
			location.formatted_address = metaTagMatch[1].replace(/&#39;/g, "'");
		}
	}

	// If we still don't have a formatted address, return null
	if (!location.formatted_address) {
		return null;
	}

	return location;
}
