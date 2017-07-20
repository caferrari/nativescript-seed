import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule, NativeScriptHttpModule } from 'nativescript-angular';
import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-telerik-ui/sidedrawer/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components';
import { GuardsModule } from './guards';
import { PagesMoule } from './pages';
import { PipeModule } from './pipes';
import { ProvidersModule } from './providers';
import { ServicesModule } from './service';

registerElement("CardView", () => require('nativescript-cardview').CardView);
registerElement("Ripple", () => require('nativescript-ripple').Ripple);

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    NativeScriptUISideDrawerModule,
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    ProvidersModule,
    ServicesModule,
    PipeModule,
    PagesMoule,
    GuardsModule
  ],
  exports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    ProvidersModule,
    ServicesModule,
    PipeModule,
    PagesMoule,
    GuardsModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class AppModule { }
