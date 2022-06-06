import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleModule } from '../../common';
import { ActionstComponent } from './actions-list.component';
import { ActionModule } from './action/action.module';
import { StringifyPipesModule } from 'src/app/pipes';
import { UserDatedPreviewModule } from '../../common/user-dated-preview/user-dated-preview.module';

@NgModule({
  declarations: [ActionstComponent],
  imports: [
    CommonModule,
    SectionTitleModule,
    ActionModule,
    StringifyPipesModule,
    UserDatedPreviewModule,
  ],
  exports: [ActionstComponent],
})
export class ActionsListModule {}
