import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {Observable} from 'rxjs';
import {ICryptocurrency} from '../../models/cryptocurrency';
import {GetCryptocurrencyDetails} from '../../store/actions/cryptocurrency.actions';

@Component({
  selector: 'app-cryptocurrencies-details',
  templateUrl: './cryptocurrencies-details.component.html',
  styleUrls: ['./cryptocurrencies-details.component.css']
})
export class CryptocurrenciesDetailsComponent implements OnInit {

  symbol: string;

  @Select(CryptocurrencyState.getSelectedCryptocurrency)
  cryptocurrency$: Observable<ICryptocurrency>;

  @Select(CryptocurrencyState.getSelectedFiatCurrency)
  selectedFiatCurrency$: Observable<string>;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.symbol = params.get('symbol');
      this.store.dispatch(new GetCryptocurrencyDetails(this.symbol));
    });
  }

  ngOnInit(): void {
  }
}
