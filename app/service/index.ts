import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { FCMService } from './fcm.service';

@NgModule({
  providers: [AuthService, FCMService]
})
export class ServicesModule { }
