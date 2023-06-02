export interface BasicData {
    symbol: string;
    name: string;
    exchange: string;
    exchangeCode: string;
    bridgeExchangeCode: string;
    currency: string;
}
  
export interface QuoteData {
    lastPrice: number;
    openPrice: number;
    high: number;
    low: number;
    previousClosePrice: number;
    change1Day: number;
    change1DayPercent: number;
    change1Week: number;
    change1WeekPercent: number;
    timeStamp: string;
    volume: number;
}
  
export interface SecurityData {
    symbolInput: string;
    basic: BasicData;
    quote: QuoteData;
}
  
export interface SecurityChangeData {
    name: string;
    symbol: string;
    openPrice: number;
    changePercent: number;
}