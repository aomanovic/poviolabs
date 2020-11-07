import {Component, OnInit} from '@angular/core';
import {ICryptocurrency} from '../../models/cryptocurrency';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {GetCryptocurrencyDetails, LoadCryptocurrencies} from '../../store/actions/cryptocurrency.actions';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cryptocurrencies-list',
  templateUrl: './cryptocurrencies-list.component.html',
  styleUrls: ['./cryptocurrencies-list.component.css']
})
export class CryptocurrenciesListComponent implements OnInit {
  displayedColumns = ['rank', 'symbol', 'price', 'change'];

  @Select(CryptocurrencyState.getCryptocurrenciesList)
  cryptocurrencies$: Observable<ICryptocurrency[]>;

  @Select(CryptocurrencyState.getSelectedFiatCurrency)
  selectedFiatCurrency$: Observable<string>;

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new LoadCryptocurrencies());
  }

  ngOnInit(): void {
  }

  rowClicked(row: ICryptocurrency): void {
    this.store.dispatch(new GetCryptocurrencyDetails(row.symbol));
    this.router.navigate(['details', {symbol: row.symbol}]);
  }

}
