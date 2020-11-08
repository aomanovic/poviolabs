import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ICryptocurrency} from '../models/cryptocurrency';
import {ICryptocurrencyDetailsResponse, ICryptocurrencyResponse} from '../models/cryptocurrency-response';

@Injectable({
  providedIn: 'root'
})
export class CryptocurrenciesService {
  readonly baseUrl = 'http://localhost:4200/api';
  readonly sandboxApiKey = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c';

  constructor(private http: HttpClient) {
  }

  getAll(convert = 'USD'): Observable<ICryptocurrency[]> {
    return this.http.get<ICryptocurrencyResponse>(this.baseUrl + '/cryptocurrency/listings/latest',
      this.getRequestOptions(convert, null))
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(this.handleError<ICryptocurrency[]>('getAll', []))
      );
  }

  getDetails(convert: string, currency: string): Observable<ICryptocurrency> {
    return this.http.get<ICryptocurrencyDetailsResponse>(
      this.baseUrl + '/cryptocurrency/quotes/latest',
      this.getRequestOptions(convert, currency))
      .pipe(
        map(response => {
          return response.data[currency];
        }),
        catchError(this.handleError<ICryptocurrency>('getDetails', null))
      );
  }

  // tslint:disable-next-line:ban-types
  private getRequestOptions(currency: string, symbol: string): Object {
    return {
      params: !symbol ? new HttpParams().set('convert', 'BTC,' + currency) :
        new HttpParams().set('convert', 'BTC,' + currency).set('symbol', symbol),
      qs: {
        start: '1',
        limit: '100',
        convert: currency
      },
      headers: {
        'X-CMC_PRO_API_KEY': this.sandboxApiKey
      },
      json: true,
      gzip: true
    };
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console instead
      return of(result as T);
    };
  }
}
