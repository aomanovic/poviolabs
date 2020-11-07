import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsComponent} from './settings.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing/app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../material/material.module';
import {SelectFiatCurrency} from '../../store/actions/cryptocurrency.actions';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule,
        NgxsModule.forRoot([CryptocurrencyState]),
        RouterModule.forRoot(routes)],
      declarations: [SettingsComponent]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render settings button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#settingsHeader').innerText).toContain('Settings');
  });

  it(`should have initial selectedFiat set to USD'`, () => {
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.selectedFiat).toEqual('USD');
  });

  it(`should change selectedFiat to EUR'`, () => {
    const componentInstance = fixture.componentInstance;
    componentInstance.selectMenuItem('EUR');
    fixture.detectChanges();
    expect(componentInstance.selectedFiat).toEqual('EUR');
  });

  it('it sets selectedFiatCurrency in state', () => {
    store.dispatch(new SelectFiatCurrency('CNY'));
    const selectedFiat = store.selectSnapshot(CryptocurrencyState.getSelectedFiatCurrency);
    expect(selectedFiat).toBe('CNY');
  });

  it('it sets selectedFiat after selectMenuItem call', () => {
    const componentInstance = fixture.componentInstance;
    componentInstance.selectMenuItem('EUR');
    fixture.detectChanges();
    const selectedFiat = store.selectSnapshot(CryptocurrencyState.getSelectedFiatCurrency);
    expect(selectedFiat).toBe('EUR');
  });
});
