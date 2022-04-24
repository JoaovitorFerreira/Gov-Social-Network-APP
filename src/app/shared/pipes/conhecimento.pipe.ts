import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conhecimento',
})
export class ConhecimentoPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('_').join(' ');
  }
}