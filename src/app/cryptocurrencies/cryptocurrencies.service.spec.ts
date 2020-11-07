import { TestBed } from '@angular/core/testing';

import { CryptocurrenciesService } from './cryptocurrencies.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgxsModule} from '@ngxs/store';
import {CryptocurrencyState} from '../store/states/cryptocurrencies.state';
import {RouterModule} from '@angular/router';
import {routes} from '../app-routing/app-routing.module';

describe('CryptocurrenciesService', () => {
  let service: CryptocurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CryptocurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
