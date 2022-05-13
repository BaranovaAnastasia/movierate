import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserPreviewModule } from '../user-preview/user-preview.module';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    AppRoutingModule,
    UserPreviewModule,
    TuiLetModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
