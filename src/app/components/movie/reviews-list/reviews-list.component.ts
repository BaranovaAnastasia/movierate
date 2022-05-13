import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Review, User } from 'src/shared/models';
import { ReviewsService, AuthService } from 'src/shared/services';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsListComponent implements OnChanges {
  @Input() movieId!: string;

  reviews$?: Observable<Review[]>;

  expanded = false;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService,
  ) { }

  ngOnChanges(): void {
    this.expanded = false;
    this.reviews$ = this.reviewsService.getMovieReviews(this.movieId);
  }

  getAuthor(review: Review): User {
    return {
      id: review.user_id,
      name: review.user_name,
      avatar_path: review.avatar_path,
      isCurrentUser: false,
    }
  }

  toggle(): void {
    if (!this.authService.toSignInIfNotAuthorized()) return;

    this.expanded = !this.expanded;
  }

  postReview(review: Review): void {
    this.expanded = false;
    this.reviews$ = this.reviewsService.postReview(this.movieId!, review);
  }
}
