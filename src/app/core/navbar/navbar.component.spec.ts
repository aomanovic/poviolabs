import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {NgxsModule, Store} from '@ngxs/store';
import {CryptocurrencyState} from '../../store/states/cryptocurrencies.state';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing/app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../material/material.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule,
        NgxsModule.forRoot([CryptocurrencyState]),
        RouterModule.forRoot(routes)],
      declarations: [ NavbarComponent ]
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#appName').innerText).toContain('CryptoTracker');
  });

  it('should render settings button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#settingsButton')).toBeDefined();
  });
});
