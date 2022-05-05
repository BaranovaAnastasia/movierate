import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { StringifyPipesModule } from 'src/app/pipes/stringify-pipes.module';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiSvgModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiLetModule,
    StringifyPipesModule,
    AppRoutingModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
