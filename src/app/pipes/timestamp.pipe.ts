import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: string): string {
    const data = new Date(value);
    const dia =
      data.getDate() <= 9 ? `0${data.getDate()}` : `${data.getDate()}`;
    const mes =
      data.getMonth() < 9
        ? `0${data.getMonth() + 1}`
        : `${data.getMonth() + 1}`;
    return `${dia}/${mes}/${data.getFullYear()}`;
  }
}
