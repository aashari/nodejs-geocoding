import { encode, decode } from '../src/index';

describe('testing index.ts', () => {
	test('encode should return attributes: latitude, longitude, and formatted_address', async () => {
		expect(
			await encode('Jalan Medan Merdeka Utara No.3, RT.3/RW.2'),
		).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					latitude: expect.any(Number),
					longitude: expect.any(Number),
					formatted_address: expect.any(String),
				}),
			]),
		);
	});

	test('decode should return attributes: latitude, longitude, and formatted_address', async () => {
		expect(await decode(-6.170131, 106.8241607)).toEqual(
			expect.objectContaining({
				latitude: expect.any(Number),
				longitude: expect.any(Number),
				formatted_address: expect.any(String),
			}),
		);
	});
});
