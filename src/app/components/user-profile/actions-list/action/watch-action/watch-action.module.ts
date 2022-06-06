import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchActionComponent } from './watch-action.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [WatchActionComponent],
  imports: [CommonModule, AppRoutingModule, StringifyPipesModule],
  exports: [WatchActionComponent],
})
export class WatchActionModule {}
