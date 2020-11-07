import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrenciesListComponent } from './cryptocurrencies-list.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing/app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../core/material/material.module';
import {ICryptocurrency} from '../../models/cryptocurrency';

describe('CryptocurrenciesListComponent', () => {
  let component: CryptocurrenciesListComponent;
  let fixture: ComponentFixture<CryptocurrenciesListComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule,
        NgxsModule.forRoot([CryptocurrencyState]),
        RouterModule.forRoot(routes)],
      declarations: [ CryptocurrenciesListComponent ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cryptocurrenciesTable')).toBeDefined();
  });

  it('it sets selected cryptocurrency', () => {
    const componentInstance = fixture.componentInstance;
    const mockRow = {symbol: 'BTC'} as ICryptocurrency;
    fixture.ngZone.run(() => componentInstance.rowClicked(mockRow));
    fixture.detectChanges();
    const state = store.selectSnapshot(CryptocurrencyState);
    expect(state.selectedSymbol).toBe('BTC');
  });
});
