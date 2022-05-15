import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiDataListWrapperModule } from '@taiga-ui/kit';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchResultsModule } from './search-results/search-results.module';
import { StringifyPipesModule } from 'src/app/pipes';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    StringifyPipesModule,
    AppRoutingModule,
    SearchResultsModule,
    TuiButtonModule
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
