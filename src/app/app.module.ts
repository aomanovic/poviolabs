import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {CryptocurrenciesModule} from './cryptocurrencies/cryptocurrencies.module';
import {HttpClientModule} from '@angular/common/http';
import {CryptocurrenciesService} from './cryptocurrencies/cryptocurrencies.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {CryptocurrencyState} from './store/states/cryptocurrencies.state';
import {AppRoutingModule} from './app-routing/app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    CryptocurrenciesModule,
    NgxsModule.forRoot([CryptocurrencyState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [CryptocurrenciesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
