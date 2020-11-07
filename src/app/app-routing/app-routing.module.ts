import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CryptocurrenciesListComponent} from '../cryptocurrencies/cryptocurrencies-list/cryptocurrencies-list.component';
import {CryptocurrenciesDetailsComponent} from '../cryptocurrencies/cryptocurrencies-details/cryptocurrencies-details.component';
import {SettingsComponent} from '../core/settings/settings.component';

export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    data: {reload: false}
  },
  {
    path: 'details',
    component: CryptocurrenciesDetailsComponent,
    data: {reload: true}
  },
  {
    path: '',
    component: CryptocurrenciesListComponent,
    data: {reload: true}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
