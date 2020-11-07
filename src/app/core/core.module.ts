import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from './material/material.module';
import {SettingsComponent} from './settings/settings.component';



@NgModule({
  declarations: [NavbarComponent, SettingsComponent],
  exports: [NavbarComponent, SettingsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CoreModule { }
