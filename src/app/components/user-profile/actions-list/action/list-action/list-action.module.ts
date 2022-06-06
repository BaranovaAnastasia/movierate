import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListActionComponent } from './list-action.component';
import { StringifyPipesModule } from 'src/app/pipes';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [ListActionComponent],
  imports: [CommonModule, StringifyPipesModule, AppRoutingModule],
  exports: [ListActionComponent],
})
export class ListActionModule {}
