import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStrigify',
})
export class TimeStrigifyPipe implements PipeTransform {
  transform(value: Date | string | undefined): string {
    if (!value) return '';

    const date = new Date(value);

    return `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  }
}
