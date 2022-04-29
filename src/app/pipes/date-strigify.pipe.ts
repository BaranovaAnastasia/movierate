import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateStrigify'
})
export class DateStrigifyPipe implements PipeTransform {

  transform(value: Date): string {
    const date = new Date(value);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${date.getDay()} ${month} ${date.getFullYear()}`;
  }

}
