import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listStringify',
})
export class ListStringifyPipe implements PipeTransform {
  transform(list: string[] | undefined, sep: string): string | undefined {
    return list?.join(sep);
  }
}
