import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { ComponentsModule } from '../components';
import { LoginComponent } from './login/login';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    LoginComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PagesMoule { }
