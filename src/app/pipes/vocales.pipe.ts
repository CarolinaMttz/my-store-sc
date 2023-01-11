import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocales'
})
export class VocalesPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/a|A/gi, '1')
                .replace(/e|E/gi, '2')
                .replace(/i|I/gi, '3')
                .replace(/o|O/gi, '4')
                .replace(/u|U/gi, '5');
  }

}
