import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import {GetCryptocurrencyDetails, LoadCryptocurrencies, SelectFiatCurrency} from '../actions/cryptocurrency.actions';
import {ICryptocurrency} from '../../models/cryptocurrency';
import {CryptocurrenciesService} from '../../cryptocurrencies/cryptocurrencies.service';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


export interface CryptocurrenciesStateModel {
  cryptocurrencies: ICryptocurrency[];
  cryptocurrency: ICryptocurrency;
  selectedFiatCurrency: string;
  selectedSymbol: string;
}

@State<CryptocurrenciesStateModel>({
  name: 'cryptocurrencies',
  defaults: {
    cryptocurrencies: [],
    cryptocurrency: null,
    selectedFiatCurrency: 'USD',
    selectedSymbol: null
  },
})
@Injectable()
export class CryptocurrencyState {

  constructor(private cryptocurrenciesService: CryptocurrenciesService) {}

  @Selector()
  static getSelectedFiatCurrency(state: CryptocurrenciesStateModel): string {
    return state.selectedFiatCurrency;
  }

  @Selector()
  static getSelectedSymbol(state: CryptocurrenciesStateModel): string {
    return state.selectedSymbol;
  }

  @Selector()
  static getSelectedCryptocurrency(state: CryptocurrenciesStateModel): ICryptocurrency {
    return state.cryptocurrency;
  }

  @Selector()
  static getCryptocurrenciesList(state: CryptocurrenciesStateModel): ICryptocurrency[] {
    return state.cryptocurrencies;
  }

  @Action(SelectFiatCurrency)
  selectFiatCurrency(
    ctx: StateContext<CryptocurrenciesStateModel>,
    { payload }: SelectFiatCurrency): Observable<void> {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedFiatCurrency: payload
    });
    if (state.selectedSymbol) {
      ctx.dispatch(new GetCryptocurrencyDetails(state.selectedSymbol));
    }
    return ctx.dispatch(new LoadCryptocurrencies());
  }

  @Action(LoadCryptocurrencies)
  loadCryptocurrencies(
    { getState, setState }: StateContext<CryptocurrenciesStateModel>): Observable<ICryptocurrency[]> {
    const state = getState();
    return this.cryptocurrenciesService.getAll(state.selectedFiatCurrency).pipe(
      tap(response => {
        setState({
          ...state,
          cryptocurrencies: response
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert('Something happened. Please try again.');
        return throwError(new Error(err.message));
      })
    );
  }

  @Action(GetCryptocurrencyDetails)
  getCryptocurrencyDetails(
    { getState, setState }: StateContext<CryptocurrenciesStateModel>,
    { symbol }: GetCryptocurrencyDetails): Observable<ICryptocurrency> {
    const state = getState();
    setState({
      ...state,
      selectedSymbol: symbol
    });
    return this.cryptocurrenciesService.getDetails(state.selectedFiatCurrency, symbol).pipe(
      tap(response => {
        setState({
          ...state,
          cryptocurrency: response,
        });
      }),
      catchError((err: HttpErrorResponse) => {
        alert('Something happened. Please try again.');
        return throwError(new Error(err.message));
      })
    );
  }

}
