import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { User } from 'src/shared/models';

@Component({
  selector: 'app-user-dated-preview',
  templateUrl: './user-dated-preview.component.html',
  styleUrls: ['./user-dated-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDatedPreviewComponent {
  @Input() user!: User;
  @Input() date!: Date | string;
}
