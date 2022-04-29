import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtimeStrigify'
})
export class RuntimeStrigifyPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (!value) {
      return "";
    }
    return `${Math.floor(value / 60)}h ${value % 60}min`;
  }

}
