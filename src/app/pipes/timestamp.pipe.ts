import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: Timestamp): string {
    if(!(value.toDate)){
      value = new Timestamp(value.seconds, value.nanoseconds)
    }
    const data = value.toDate();
    const dia = data.getDate() <= 9 ? `0${data.getDate()}` : `${data.getDate()}`;
    const mes = data.getMonth() < 9 ? `0${data.getMonth() + 1}` : `${data.getMonth() + 1}`;
    return `${dia}/${mes}/${data.getFullYear()}`;
  }
}