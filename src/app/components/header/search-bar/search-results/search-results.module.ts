import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TuiDataListModule } from '@taiga-ui/core';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    StringifyPipesModule,
    AppRoutingModule,
    TuiDataListModule,
  ],
  exports: [SearchResultsComponent],
})
export class SearchResultsModule {}
