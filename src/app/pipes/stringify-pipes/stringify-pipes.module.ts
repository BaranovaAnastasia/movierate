import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListStringifyPipe } from './list-stringify.pipe';
import { RuntimeStrigifyPipe } from './runtime-strigify.pipe';
import { DateStrigifyPipe } from './date-strigify.pipe';

@NgModule({
  declarations: [ListStringifyPipe, RuntimeStrigifyPipe, DateStrigifyPipe],
  imports: [CommonModule],
  exports: [ListStringifyPipe, RuntimeStrigifyPipe, DateStrigifyPipe],
})
export class StringifyPipesModule {}
