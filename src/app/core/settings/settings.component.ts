import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {SelectFiatCurrency} from '../../store/actions/cryptocurrency.actions';
import {ActivatedRoute} from '@angular/router';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedFiat = 'USD';
  menuItems = ['USD', 'EUR', 'CNY'];

  constructor(private store: Store, public route: ActivatedRoute) {
    this.selectedFiat = this.store.selectSnapshot(CryptocurrencyState.getSelectedFiatCurrency);
  }

  ngOnInit(): void {
  }

  selectMenuItem(item: string): void {
    this.selectedFiat = item;
    this.store.dispatch(new SelectFiatCurrency(this.selectedFiat));
  }
}
