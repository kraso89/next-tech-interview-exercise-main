import { SecurityChangeData, SecurityData } from "./types";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
const {
  API_URL,
  QUOTES_ENDPOINT
} = process.env

const defaultSymbols = ['FTSE:FSI', 'INX:IOM', 'EURUSD', 'GBPUSD', 'IB.1:IEU'];

export async function fetchSecuritiesData(
  securitySymbols: string[] = defaultSymbols,
  duration: '1Day' | '1Week' = '1Day'
): Promise<SecurityChangeData[]> {
  const symbols = !securitySymbols.length ? 
  defaultSymbols.join(',') : 
  securitySymbols.join(',')
  
  const url = `${API_URL}${QUOTES_ENDPOINT}`;
  const params = new URLSearchParams({ symbols });
  
  try {
    const response = await fetch(`${url}?${params}`);
    const { data } = await response.json();
    const items: SecurityData[] = data.items || [];
    return items.map((item: SecurityData) => ({
      name: item.basic.name,
      symbol: item.symbolInput,
      openPrice: parseNumbers(item.quote.openPrice),
      changePercent: duration === '1Day' ? 
      parseNumbers(item.quote.change1DayPercent) : 
      parseNumbers(item.quote.change1WeekPercent),
    }));
  } catch (error) {
    throw new Error('Error fetching securities data');
  }
}

const parseNumbers = (num: number): number => {
  return parseFloat(num.toFixed(2));
}
