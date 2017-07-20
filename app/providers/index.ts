import { Connectivity } from './connectivity';
import { NgModule } from '@angular/core';

import { ApiHttp } from './api-http';
import { Http } from './http';
import { Router } from './router';
import { Settings } from './settings';
import { Storage } from './storage';

@NgModule({
  providers: [Router, Storage, ApiHttp, Settings, Http, Connectivity]
})
export class ProvidersModule { }
