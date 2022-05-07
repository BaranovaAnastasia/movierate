import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/shared/models/movie/review';
import { User } from 'src/shared/models/user/user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.less']
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
      avatar_path: this.review.avatar_path
    }
    this.rating = this.review.rating;
  }

}
