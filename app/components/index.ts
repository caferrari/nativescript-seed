import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule, NativeScriptHttpModule } from 'nativescript-angular';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-telerik-ui/sidedrawer/angular';

import { IconComponent } from './icon';
import { SideDrawerComponent } from './side-drawer';

@NgModule({
  declarations: [
    SideDrawerComponent,
    IconComponent
  ],
  exports: [
    SideDrawerComponent,
    IconComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    ReactiveFormsModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule { }
