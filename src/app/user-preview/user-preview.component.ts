import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/shared/models/user/user';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.less']
})
export class UserPreviewComponent{
  @Input() user!: User;

}
