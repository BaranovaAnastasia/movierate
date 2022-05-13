import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSelectDialogComponent } from './list-select-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiCheckboxLabeledModule,
  TuiInputModule,
  TuiRadioBlockModule,
  TuiRadioModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiGroupModule,
  TuiModeModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { AddToListComponent } from './add-to-list/add-to-list.component';
import { CreateListComponent } from './create-list/create-list.component';

@NgModule({
  declarations: [
    ListSelectDialogComponent,
    AddToListComponent,
    CreateListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTabsModule,
    TuiButtonModule,
    TuiRadioModule,
    TuiRadioBlockModule,
    TuiModeModule,
    TuiGroupModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
  ],
  exports: [ListSelectDialogComponent],
})
export class ListSelectDialogModule {}
