import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CryptocurrenciesDetailsComponent} from './cryptocurrencies-details.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing/app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../core/material/material.module';

describe('CryptocurrenciesDetailsComponent', () => {
  let component: CryptocurrenciesDetailsComponent;
  let fixture: ComponentFixture<CryptocurrenciesDetailsComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule,
        NgxsModule.forRoot([CryptocurrencyState]),
        RouterModule.forRoot(routes)
      ],
      declarations: [CryptocurrenciesDetailsComponent]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrenciesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').innerText).toContain('Cryptocurrency Details');
  });

});
