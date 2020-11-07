import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CryptocurrencyState} from './store/states/cryptocurrencies.state';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing/app-routing.module';
import {CoreModule} from './core/core.module';

describe('AppComponent', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule,
        NgxsModule.forRoot([CryptocurrencyState]),
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cryptotracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cryptotracker');
  });
});
