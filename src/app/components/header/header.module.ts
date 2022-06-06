import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SearchBarModule } from './search-bar/search-bar.module';
import { TuiLetModule } from '@taiga-ui/cdk';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserPreviewModule } from '../common';

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
