import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptocurrenciesListComponent } from './cryptocurrencies-list/cryptocurrencies-list.component';
import { CryptocurrenciesDetailsComponent } from './cryptocurrencies-details/cryptocurrencies-details.component';
import {CoreModule} from '../core/core.module';
import {NavbarComponent} from '../core/navbar/navbar.component';
import {CryptocurrenciesService} from './cryptocurrencies.service';
import {MaterialModule} from '../core/material/material.module';



@NgModule({
  declarations: [CryptocurrenciesListComponent, CryptocurrenciesDetailsComponent],
  imports: [CommonModule, CoreModule, MaterialModule],
  exports: [CryptocurrenciesListComponent, CryptocurrenciesDetailsComponent],
  entryComponents: [CryptocurrenciesDetailsComponent, NavbarComponent],
  providers: [CryptocurrenciesService],
})
export class CryptocurrenciesModule { }
