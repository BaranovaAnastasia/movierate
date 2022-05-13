import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class PageNotFoundModule {}
