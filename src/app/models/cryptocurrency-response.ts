import {ICryptocurrency} from './cryptocurrency';

export interface ICryptocurrencyResponse {
  data: ICryptocurrency[];
  status: any;
}

export interface ICryptocurrencyDetailsResponse {
  data: ICryptocurrency;
  status: any;
}
