import {Pipe, PipeTransform} from '@angular/core';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | toBoolean
 * Example:
 *   {{ 2 | toBoolean }}
 *   formats to: 1024
*/
@Pipe({name: 'toBoolean'})
export class NumberToBoolean implements PipeTransform {
  transform(value: number): string {
    let result = 'NO';
    if (value !== 0) {
      result = 'YES';
    }
    return result;
  }
}
