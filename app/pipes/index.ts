import { NgModule } from '@angular/core';

import { CpfPipe } from './cpf';
import { PhonePipe } from './phone';

@NgModule({
  declarations: [
    PhonePipe,
    CpfPipe
  ],
  exports: [
    PhonePipe,
    CpfPipe
  ]
})
export class PipeModule { }