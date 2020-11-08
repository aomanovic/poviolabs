import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GetCryptocurrencyDetails, LoadCryptocurrencies} from '../../store/actions/cryptocurrency.actions';
import {filter, map, mergeMap} from 'rxjs/operators';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showReload = true;

  constructor(private store: Store, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        this.showReload = event.reload;
      });
  }

  goToSettings(): void {
    this.router.navigate(['settings']);
  }

  reload(): void {
    const selectedSymbol = this.store.selectSnapshot(CryptocurrencyState.getSelectedSymbol);
    this.store.dispatch([new LoadCryptocurrencies(), new GetCryptocurrencyDetails(selectedSymbol)]);
    console.log('Reloaded data from API');
  }
}
