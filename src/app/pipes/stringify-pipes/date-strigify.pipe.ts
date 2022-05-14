import { Pipe, PipeTransform } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { MONTHS } from './constants';

@Pipe({
  name: 'dateStrigify',
})
export class DateStrigifyPipe implements PipeTransform {
  transform(value: Date | undefined, onlyYear: boolean = false): string {
    if (!value) return '';

    const { year, month, day } = TuiDay.fromLocalNativeDate(new Date(value));
    return onlyYear ? `${year}` : `${day} ${MONTHS[month]} ${year}`;
  }
}
