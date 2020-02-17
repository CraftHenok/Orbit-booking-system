import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberToBoolean} from './numberToBoolean';


@NgModule({
  declarations: [
    NumberToBoolean
  ],
  imports: [
    CommonModule
  ],
  exports: [NumberToBoolean]
})
export class NumberToBooleanModule {
}
