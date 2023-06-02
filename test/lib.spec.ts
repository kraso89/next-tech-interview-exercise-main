jest.mock('node-fetch');
import { fetchSecuritiesData } from '../lib/fetch';
import fetch from "node-fetch";
import { getMockData, getSecurityParsedItem } from './mocks/fetchMock';

describe('fetchSecuritiesData', () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it('should fetch securities data for 1Day duration by default', async () => {
    fetch.mockResolvedValueOnce({ json: () => getMockData(5) });
    const securitiesData = await fetchSecuritiesData();
    expect(securitiesData).toBeDefined();
    expect(securitiesData.length).toBe(5);
    expect(securitiesData[0]).toEqual(getSecurityParsedItem(1, "1Day"));
  });

  it('should fetch securities data for 1Day duration by default with empty array passed', async () => {
    fetch.mockResolvedValueOnce({ json: () => getMockData(5) });
    const securitiesData = await fetchSecuritiesData([]);
    expect(securitiesData).toBeDefined();
    expect(securitiesData.length).toBe(5);
    expect(securitiesData[1]).toEqual(getSecurityParsedItem(2, "1Day"));
  });
  
  it('should fetch securities data for 1Week duration with empty array passed', async () => {
    fetch.mockResolvedValueOnce({ json: () => getMockData(5) });
    const securitiesData = await fetchSecuritiesData([], '1Week');
    expect(securitiesData).toBeDefined();
    expect(securitiesData.length).toBe(5);
    expect(securitiesData[0]).toEqual(getSecurityParsedItem(1, "1Week"));
  });

  it('should fetch securities data for custom symbols and duration', async () => {
    fetch.mockResolvedValueOnce({ json: () => getMockData(2) });
    const symbols = ['test-1', 'test-2'];
    const duration = '1Week';
    const securitiesData = await fetchSecuritiesData(symbols, duration);
    expect(securitiesData).toBeDefined();
    expect(securitiesData.length).toBe(2);
    expect(securitiesData[1]).toEqual(getSecurityParsedItem(2, "1Week"));
  });

  it('should throw an error if response from api is invalid', async () => {
    fetch.mockResolvedValueOnce({ json: () => [{name: 'test-1', symbol: 999},{name: 'test-2', symbol: 'test-2'}] });
    const symbols = ['test-1', 'test-2'];
    await expect(fetchSecuritiesData()).rejects.toThrow('Error fetching securities data');
  })
  
  it('should throw an error if fetching securities data fails', async () => {
    fetch.mockImplementation(() => {
      throw new Error("Some Error");
    });
    await expect(fetchSecuritiesData()).rejects.toThrow('Error fetching securities data');
  });

});
