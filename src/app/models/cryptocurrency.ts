export interface ICryptocurrency {
  id: string;
  name: string;
  symbol: string;
  cmc_rank: number;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  quote: Map<string, IQuote>;
}

export interface IQuote {
    price: number;
    volume_24h: number;
    volume_24h_reported: number;
    volume_7d: number;
    volume_7d_reported: number;
    volume_30d: number;
    volume_30d_reported: number;
    market_cap: number;
    percent_change_1h: string;
    percent_change_24h: string;
    percent_change_7d: string;
    last_updated: number;
}
