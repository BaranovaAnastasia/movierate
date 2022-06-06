import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStringifyPipe } from './list-stringify.pipe';
import { RuntimeStrigifyPipe } from './runtime-strigify.pipe';
import { DateStrigifyPipe } from './date-strigify.pipe';
import { TimeStrigifyPipe } from './time-stringify.pipe';

@NgModule({
  declarations: [
    ListStringifyPipe,
    RuntimeStrigifyPipe,
    DateStrigifyPipe,
    TimeStrigifyPipe,
  ],
  imports: [CommonModule],
  exports: [
    ListStringifyPipe,
    RuntimeStrigifyPipe,
    DateStrigifyPipe,
    TimeStrigifyPipe,
  ],
})
export class StringifyPipesModule {}
