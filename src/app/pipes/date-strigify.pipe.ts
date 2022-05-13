import { Pipe, PipeTransform } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

const monthsNames: string[] = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

@Pipe({
  name: 'dateStrigify',
})
export class DateStrigifyPipe implements PipeTransform {
  transform(value: Date | undefined, onlyYear: boolean = false): string {
    if (!value) return '';

    const { year, month, day } = TuiDay.fromLocalNativeDate(new Date(value));
    return onlyYear ? `${year}` : `${day} ${monthsNames[month]} ${year}`;
  }
}
