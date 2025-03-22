/**
 * Represents a geographic location with coordinates and address information
 */
export interface Location {
	/** The latitude coordinate */
	latitude?: number;

	/** The longitude coordinate */
	longitude?: number;

	/** The Google Plus Code for the location */
	google_plus_code?: string;

	/** The formatted address */
	formatted_address?: string;
}
