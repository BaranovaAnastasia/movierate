import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Review, User } from 'src/shared/models';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  @Input() review!: Review;
}
