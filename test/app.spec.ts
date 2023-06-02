import * as fetchLib from '../lib/fetch';
import request from 'supertest';
import app from "../app";
import { getSecurityParsedItem } from './mocks/fetchMock';

describe('GET /', () => {
	it('should render the home template with securities data', async () => {
		//Mocking
		jest.spyOn(fetchLib, 'fetchSecuritiesData').mockResolvedValue([
			getSecurityParsedItem(1, "1Day")
		]);

		const response = await request(app)
		.get('/')
		.expect("Content-type",/html/)
		.expect(200);
		expect(response.text).toMatch(/test-1/)
	});
	it('should return 500 Internal Server Error if fetching securities data fails', async () => {
		//Mocking
		jest.spyOn(fetchLib, 'fetchSecuritiesData').mockImplementation(() => {
			throw new Error("Some Error");
		});
		console.error = jest.fn();

		const response = await request(app)
		.get('/')
		.expect("Content-type",/html/)
		.expect(500)
		.expect('Internal Server Error');
		expect(console.error).toBeCalled();

	  });
});