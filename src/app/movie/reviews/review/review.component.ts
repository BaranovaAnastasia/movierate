import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Review, User } from 'src/shared/models';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  @Input() review!: Review;
  author!: User;
  rating = 0;

  constructor() { }

  ngOnInit(): void {
    this.author = {
      id: this.review.user_id,
      name: this.review.user_name,
      avatar_path: this.review.avatar_path,
      isCurrentUser: false
    }
    this.rating = this.review.rating;
  }

}
