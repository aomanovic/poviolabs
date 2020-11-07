
export class LoadCryptocurrencies {
  static readonly type = '[Cryptocurrency] Load';

}

export class GetCryptocurrencyDetails {
  static readonly type = '[Cryptocurrency] Details';

  constructor(public symbol: string) {}
}

export class SelectFiatCurrency {
  static readonly type = '[Fiat] Select';

  constructor(public payload: string) {}
}
